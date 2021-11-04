const bcrypt = require('bcryptjs');

const Gov = require('../../models/government');
const Tender = require('../../models/tender');
const Committee = require('../../models/committee');

/* 
  REGISTER GOVERNMENT ENTITY 
*/

exports.getEntity = async (req, res, next) => {
  try {
    
    await Gov.find()
      .then((result) => res.json(result))
      .catch((err) => console.error(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.postEntity = async (req, res, next) => {
  try {
    let { 
      entity,
      telephone,
      county,
      address,
      website,
      representative:{
        name,
        email,
        password
      }
    } = req.body;

    let data = await Gov.findOne({ entity })
    if(data) return res.json({ message: 'Government Entity already exists' })
    
    let newEntity = new Gov(req.body)
    newEntity.save()
      .then((result) => res.status(201).json({result}))
      .catch((err) => console.error(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/* 
  LOGIN GOVERNMENT ENTITY 
*/

exports.loginEntity = async (req, res, next) => {
  try {
    let { email, password }= req.body

    let data = await Gov.findOne({ 'representative.email': req.body.email })
    if(!data) return res.json({ message: 'Kindly register first' })

    let matchPassword = await bcrypt.compare(password, data.representative.password)
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
  GET/MAKE TENDER BY ID SETUP
*/

exports.getTender = async (req, res, next) => {
  try {
    let tender = await Tender.find({'rep': req.params.id })
      .populate('rep', ['representative.name', 'representative.email'])
    return res.json(tender)
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.makeTender = async (req, res, next) => {
  try {
    let { title, category, description, closingAt, rep } = req.body
    if(req.params.id != String(req.body.rep)) return res.json({ message: 'This tender is not related to the named Entity' })

    let tender = await Tender.findOne({ 'title': req.body.title })
    if(tender) return res.json({ message: 'This tender already exists' })

    let newTender = await new Tender(req.body)
    newTender.save()
      .then((result) => res.status(201).json(result))
      .catch(err => console.error(err))
  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  GET MEMBERS NOT ASSIGNED TO EVALUATION COMMITTEE
*/

exports.getCommittee = async (req, res, next) => {
  try {
    
    await Committee.find({ selected: false, tender: null })
      .then((result) => res.json(result))
      .catch((err) => console.error(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  GET/ ADD MEMBERS TO EVALUATION COMMITTEE BY ID
*/

exports.addedCommittee = async (req, res, next) => {
  try {
    
    await Committee.findOne({ _id: req.params.id, selected: true })
      .populate('tender', ['title', 'category', 'description', 'status', 'rep'])
      .then((result) => {
        if(!result) return res.json({ message: 'This member has not been added to an evaluation committee' })
        return res.status(200).json(result)
      })
      .catch(err => console.error(err))
    
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.addCommittee = async (req, res, next) => {
  try {
    let { tenderId } = req.body;

    await Tender.findOne({ _id: req.body.tenderId })
      .then((result) => {
        if(!result) return res.json({ message: 'This tender does not exist' })
      })
      .catch(err => console.error(err))
    await Committee.updateOne({ _id: req.params.id , selected: false, tender: null},{ $set: { selected: true, tender: req.body.tenderId } }, { new: true })
      .then(result => res.json(result)).catch(err => res.json(err))
      .catch(err => console.error(err));

  } catch (error) {
    console.error(error);
    next(error);
  }
}