const bcrypt = require('bcryptjs');

const Gov = require('../../models/government');
const Tender = require('../../models/tender');

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
  GET || MAKE || CLOSE AND TENDER BY ID SETUP
*/

exports.getTender = async (req, res, next) => {
  try {
    let tender = await Tender.find({'rep': req.params.id })
      .populate('rep', ['representative.name', 'representative.email'])
      .populate('committee', ['name', 'email', 'telephone'])
    return res.json(tender)
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.makeTender = async (req, res, next) => {
  try {

    if(req.params.id != String(req.body.rep)) return res.json({ message: 'This tender is not related to the named Entity' })

    await Tender.findOne({ 'title': req.body.title })
      .then((tender) => {
      if(tender) return res.json({ message: 'This tender already exists' });

      let newTender = new Tender({
        filename: req.file.filename,
        title:req.body.title,
        category:req.body.category,
        description:req.body.description,
        closingAt:req.body.closingAt,
        rep:req.params.id,

      })
      newTender.save()
        .then((result) => res.status(201).json(result))
        .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.closeTender = async (req, res, next) => {
  try {

    await Tender.updateOne({ rep: req.params.id },{ $set: { status: true } })
      .then(result => {
        if(!result) return res.json({ message: 'This Tender is not related to the Government Entity' })
        return res.status(200).json(result)
      })
      .catch(err => res.json(err))
      
  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  ASSIGN COMMITTEE MEMBERS TO TENDER BY ID
*/

exports.patchCommittee = async (req, res, next) => {
  try {
    
    await Tender.updateOne({ _id: req.params.id },{ $set: {
      'committee': req.body.committee,
    } })
      .then(result => {
        if(!result) return res.json({ message: 'Tender does not exist' })
        return res.status(200).json(result)
      })
      .catch(err => res.json(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}
