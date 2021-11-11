const bcrypt = require('bcryptjs');

const Gov = require('../../models/government');
const Tender = require('../../models/tender');
const File = require('../../models/file');

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
      .populate('committee', ['name', 'email'])
    return res.json(tender)
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.makeTender = async (req, res, next) => {
  try {
    let { title, category, description, closingAt, rep, committee } = req.body

    // if(req.params.id != String(req.body.rep)) return res.json({ message: 'This tender is not related to the named Entity' })

    // let tender = await Tender.findOne({ 'title': req.body.title })
    // if(tender) return res.json({ message: 'This tender already exists' })

    let newTender = await new Tender({
      title: req.body.title, 
      category: req.body.category, 
      description: req.body.description, 
      closingAt: req.body.closingAt, 
      rep: req.params.id, 
      committee: req.body.committee,
      filename: req.file.filename 
    })
    newTender.save()
      .then((result) => res.status(201).json(result))
      .catch(err => console.error(err))
  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  UPLOAD TENDER DOCUMENT BY ID
*/

// exports.uploadTender = async (req, res, next) => {
//   try {

//     let file = await File.findOne({ 'entity': req.params.id })
//     if(file) return res.json({ message: 'A tender document already exists in the database' })

//     await File.create({ filename: req.file.filename, entity: req.params.id })
//       .then((result) => res.status(201).json(result))
//       .catch(err => console.error(err))

//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }
