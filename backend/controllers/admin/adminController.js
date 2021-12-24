const bcrypt = require('bcryptjs');

const Admin = require('../../models/admin');
const Gov = require('../../models/government');
const Vendor = require('../../models/vendor');
const Committee = require('../../models/committee');
const Tender = require('../../models/tender');
const Bid = require('../../models/bid');


/*
  REGISTER SETUP
*/

exports.getLogin = async (req, res, next) => {
  try {
    
    await Admin.find()
    .then((result) => res.json(result))
    .catch((err) => console.error(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.postAdmin =async (req, res, next) => {
  try {
    
    let data = await Admin.findOne({ 'email': req.body.email })
    if(data) return res.json({ message: 'Admin already exists' })
    
    let newAdmin = new Admin(req.body)
    newAdmin.save()
      .then((result) => res.status(201).json({result}))
      .catch((err) => console.error(err))


  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  LOGIN SETUP
*/

exports.loginAdmin = async (req, res, next) => {
  try {
    let { email, password } = req.body
    let admin = await Admin.findOne({ email })
    if(!admin) return res.json({ message: 'Admin does not exist' })

    let matchPassword = await bcrypt.compare(password, admin.password)
    if(!matchPassword) return res.json({ message: 'Wrong Password' })

    res.status(200).json(admin)
  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  GOVERNMENT ENTITY SETUP
*/

exports.getAllEntities = async (req, res, next) => {
  try {
    
    await Gov.find()
      .then((result) => res.status(200).json({
        count: result.length,
        body: result
      }))
      .catch(error => console.error(error))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  GOVERNMENT ENTITY BY ID SETUP
*/

exports.getEntity = async (req, res, next) => {
  try {

    await Gov.findOne({ _id: req.params.id })
      .then((result) => {
        if(!result) res.json({ message: 'Entity does not exist' })
        return res.status(200).json(result)
      })
      .catch(error => console.error(error))
    
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.patchEntity = async (req, res, next) => {
  try {
    
    await Gov.updateOne({ _id: req.params.id },{ $set: {
      'entity': req.body.entity,
      'telephone': req.body.telephone,
      'county': req.body.county,
      'address': req.body.address,
      'website': req.body.website,
      'representative.name': req.body.representative.name,
      'representative.email': req.body.representative.email,
    } })
      .then(result => {
        if(!result) return res.json({ message: 'Entity does not exist' })
        return res.status(200).json(result)
      })
      .catch(err => res.json(err))
      console.log(req.body.representative.name);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.deleteEntity = async (req, res, next) => {
  try {
    
    await Gov.deleteOne({ _id: req.params.id })
      .then((result) => {
        if(!result) return res.json({ message: 'Government Entity does not exist' })
        return res.status(200).json({ message: 'Government Entity has been deleted' })
      })

  } catch (error) {
    console.error(error);
    next(error);
  }
}



/*
  VENDOR SETUP
*/

exports.getAllVendors = async (req, res, next) => {
  try {
    
    await Vendor.find()
      .then((result) => res.status(200).json({
        count: result.length,
        body: result
      }))
      .catch(error => console.error(error))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  VENDOR BY ID SETUP
*/

exports.getVendor = async (req, res, next) => {
  try {

    await Vendor.findOne({ _id: req.params.id })
      .then((result) => {
        if(!result) return res.json({ message: 'Entity does not exist' })
        res.status(200).json(result)
      })
      .catch(error => console.error(error))
    
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.patchVendor = async (req, res, next) => {
  try {
    
    await Vendor.updateOne({ _id: req.params.id },{ $set: {
      'company': req.body.company,
      'telephone': req.body.telephone,
      'address': req.body.address,
      'representative.name': req.body.representative.name,
      'representative.email': req.body.representative.email,
    } })
      .then(result => {
        if(!result) return res.json({ message: 'Vendor does not exist' })
        return res.status(200).json(result)
      })
      .catch(err => res.json(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.deleteVendor = async (req, res, next) => {
  try {
    
    await Vendor.deleteOne({ _id: req.params.id })
      .then((result) => {
        if(!result) return res.json({ message: 'Vendor does not exist' })
        return res.status(200).json({ message: 'Vendor has been deleted' })
      })

  } catch (error) {
    console.error(error);
    next(error);
  }
}


/*
  TENDOR SETUP
*/

exports.getAllTenders = async (req, res, next) => {
  try {
    
    await Tender.find()
      .populate('rep', ['representative.name', 'representative.email','entity'])
      .populate('committee', ['name', 'email', 'telephone'])
      .then((result) => res.status(200).json({
        count: result.length,
        body: result
      }))
      .catch(error => console.error(error))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  TENDOR BY ID SETUP
*/

exports.getTender = async (req, res, next) => {
  try {

    await Tender.findOne({ _id: req.params.id })
      .populate('rep', ['representative.name', 'representative.email'])
      .populate('committee', ['name', 'email', 'telephone'])
      .then((result) => {
        if(!result) return res.json({ message: 'Entity does not exist' })
        res.status(200).json(result)
      })
      .catch(error => console.error(error))
    
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.patchTender = async (req, res, next) => {
  try {

    await Tender.updateOne({ _id: req.params.id },{ $set: {
      'title': req.body.title,
      'filename': req.file.filename,
      'closingAt': req.body.closingAt,
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

exports.deleteTender = async (req, res, next) => {
  try {

    await Tender.deleteOne({ _id: req.params.id })
    .then((result) => {
      if(!result) return res.json({ message: 'Tender does not exist' })
      return res.status(200).json({ message: 'Tender has been deleted' })
    })
    
  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  COMMITTEE SETUP
*/

exports.getAllCommittees = async (req, res, next) => {
  try {
    
    await Committee.find()
      .then((result) => res.status(200).json({
        count: result.length,
        body: result
      }))
      .catch(error => console.error(error))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  COMMITTEE BY ID SETUP
*/

exports.getCommittee = async (req, res, next) => {
  try {

    await Committee.findOne({ _id: req.params.id })
      .then((result) => {
        if(!result) return res.json({ message: 'Committee does not exist' })
        res.status(200).json(result)
      })
      .catch(error => console.error(error))
    
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.patchCommittee = async (req, res, next) => {
  try {
    
    await Committee.updateOne({ _id: req.params.id },{ $set: {
      'name': req.body.name,
      'telephone': req.body.telephone,
      'email': req.body.email
    } })
      .then(result => {
        if(!result) return res.json({ message: 'Committee does not exist' })
        return res.status(200).json(result)
      })
      .catch(err => res.json(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.deleteCommittee = async (req, res, next) => {
  try {
    
    await Committee.deleteOne({ _id: req.params.id })
      .then((result) => {
        if(!result) return res.json({ message: 'Committee does not exist' })
        return res.status(200).json({ message: 'Committee has been deleted' })
      })

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  BID SETUP
*/

exports.getAllBids = async (req, res, next) => {
  try {
    
    await Bid.find()
    .populate('tenders vendor')
      .then((result) => res.status(200).json({
        count: result.length,
        body: result
      }))
      .catch(error => console.error(error))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

/*
  BID BY ID SETUP
*/

exports.getBid = async (req, res, next) => {
  try {

    await Bid.findOne({ _id: req.params.id })
      .then((result) => {
        if(!result) return res.json({ message: 'Bid does not exist' })
        res.status(200).json(result)
      })
      .catch(error => console.error(error))
    
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.patchBid = async (req, res, next) => {
  try {
    
    await Bid.updateOne({ _id: req.params.id },{ $set: {
      'filename': req.file.filename,
    } })
      .then(result => {
        if(!result) return res.json({ message: 'Bid does not exist' })
        return res.status(200).json(result)
      })
      .catch(err => res.json(err))

  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.deleteBid = async (req, res, next) => {
  try {
    
    await Bid.deleteOne({ _id: req.params.id })
      .then((result) => {
        if(!result) return res.json({ message: 'Bid does not exist' })
        return res.status(200).json({ message: 'Bid has been deleted' })
      })

  } catch (error) {
    console.error(error);
    next(error);
  }
}