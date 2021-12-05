const bcrypt = require('bcryptjs');

const Committee = require('../../models/committee');
const Tender = require('../../models/tender');
const Bid = require('../../models/bid');

/* 
  REGISTER COMMITTEE MEMBER 
*/

exports.getCommittee = async (req, res, next) => {
  try {
    await Committee.find()
      .then((result) => res.json(result))
      .catch((err) => console.error(err))
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.postCommittee = async (req, res, next) => {
  try {
    let {
        name,
        telephone,
        email,
        password
    } = req.body;

    let data = await Committee.findOne({ email })
    if(data) return res.json({ message: 'Committee member already exists' })
    
    let newCommittee = new Committee(req.body)
    newCommittee.save()
      .then((result) => res.status(201).json({result}))
      .catch((err) => console.error(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/* 
  LOGIN COMMITTEE MEMBER 
*/

exports.loginCommittee = async (req, res, next) => {
  try {
    let { email, password }= req.body

    let data = await Committee.findOne({ 'email': req.body.email })
    if(!data) return res.json({ message: 'Kindly register first' })

    let matchPassword = await bcrypt.compare(password, data.password)
    if(!matchPassword) return res.json({ message: 'Wrong Password' })

    return res.json({
      result:data
    })

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/* 
  GET TENDER BY ID SETUP
*/

exports.getTender = async (req, res, next) => {
  try {
    
    let tender = await Tender.find({'committee': req.params.id })
      .populate('rep', ['representative.name', 'representative.email'])
      .populate('committee', ['name', 'email'])
    return res.json({tender})

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/* 
  GET AND APPROVE BID BY ID SETUP
*/

exports.getBid = async (req, res, next) => {
  try {
   
    let bids = await Bid.find({ _id: req.params.id })
    .populate('vendor', ['company', 'representative.name', 'representative.email'])
    return res.send(bids)
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.approveBid = async (req, res, next) => {
  try {
    
    await Bid.updateOne({ _id: req.params.id , status: false},{ $set: { status: true } }, { new: true })
      .then(result => {
        if(!result) return res.json({ message: 'This bid request does not exist' })
        return res.status(200).json(result)
      })
      .catch(err => res.json(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}
