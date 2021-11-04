const bcrypt = require('bcryptjs');

const Vendor = require('../../models/vendor');

/* 
  REGISTER VENDOR 
*/

exports.getVendor = async (req, res, next) => {
  try {
    await Vendor.find()
      .then((result) => res.json(result))
      .catch((err) => console.error(err))
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.postVendor = async (req, res, next) => {
  try {
    let { 
      company,
      telephone,
      address,
      DOR,
      representative:{
        name,
        email,
        password
      }
    } = req.body;

    let data = await Vendor.findOne({ company })
    if(data) return res.json({ message: 'Vendor already exists' })
    
    let newVendor = new Vendor(req.body)
    newVendor.save()
      .then((result) => res.status(201).json({result}))
      .catch((err) => console.error(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/* 
  LOGIN VENDOR 
*/

exports.loginVendor = async (req, res, next) => {
  try {
    let { email, password }= req.body

    let data = await Vendor.findOne({ 'representative.email': req.body.email })
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

// /* 
//   GET/MAKE TENDER BY ID SETUP
// */

// exports.getTender = async (req, res, next) => {
//   try {
//     let tender = await Tender.find({'rep': req.params.id })
//       .populate('rep', ['representative.name', 'representative.email'])
//     return res.json(tender)
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

// exports.makeTender = async (req, res, next) => {
//   try {
//     let { title, category, description, closingAt, rep } = req.body
//     if(req.params.id != String(req.body.rep)) return res.json({ message: 'This tender is not related to the named Entity' })

//     let tender = await Tender.findOne({ 'title': req.body.title })
//     if(tender) return res.json({ message: 'This tender already exists' })

//     let newTender = await new Tender(req.body)
//     newTender.save()
//       .then((result) => res.status(201).json(result))
//       .catch(err => console.error(err))
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }