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

    let data = await Vendor.findOne({ 'representative.name': req.body.representative.name })
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
  GET AND MAKE BID BY ID SETUP
*/

exports.getBid = async (req, res, next) => {
  try {
    let bid = await Bid.find({'vendor': req.params.id })
      .populate('vendor tenders')
    return res.json(bid)

  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.makeBid = async (req, res, next) => {
  try {

    await Bid.findOne({ 'vendor': req.params.id })
      .then((bid) => {
        if(bid !== null) return res.json({ message: 'A bid for this tender already exists in the database' })

        let newFile = new Bid({
          filename: req.file.filename,
          vendor: req.params.id,
          tenders:req.body.tenders
          
        })
        
        newFile.save()
          .then((result) => res.status(201).json(result))
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/* 
  GET APPROVED BID BY ID SETUP
*/

exports.approvedBid = async (req, res, next) => {
  try {
    let bid = await Bid.find({ _id: req.params.id, status: true })
      .populate('vendor', ['company', 'representative.name', 'representative.email'])
      .populate('tenders', ["title", "rep", "committee"])
    return res.json(bid)

  } catch (error) {
    console.error(error);
    next(error);
  }
}