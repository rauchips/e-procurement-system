const bcrypt = require('bcryptjs');

const Vendor = require('../../models/vendor');
const Tender = require('../../models/tender');
const Bid = require('../../models/bid');

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

/*
  GET TENDER BY ID SETUP
*/

exports.getTender = async (req, res, next) => {
  try {
    await Tender.find()
      .populate('rep', ['representative.name', 'representative.email'])
      .then((result) => res.json(result))
      .catch((error) => console.error(error))

    } catch (error) {
    console.error(error);
    next(error);
  }
}

/* 
  GET/MAKE BID BY ID SETUP
*/

exports.getBid = async (req, res, next) => {
  try {
    let bid = await Bid.find({'vendor': req.params.id })
      .populate('tender', ['title', 'category', 'rep'])
    return res.json(bid)

  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.makeBid = async (req, res, next) => {
  try {

    if(req.params.id != String(req.body.vendor)) return res.json({ message: 'This bid is not related to the named Vendor' })

    await Bid.findOne({ 'vendor': req.body.vendor })
      .then((bid) => {
      if(bid) return res.json({ message: 'This bid already exists' });

      let newBid = new Bid(req.body)
      newBid.save()
        .then((result) => res.status(201).json(result))
        .catch(err => console.error(err))
      })
      .catch(err => console.error(err))

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