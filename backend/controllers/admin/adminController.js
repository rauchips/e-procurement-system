const bcrypt = require('bcryptjs');

const Admin = require('../../models/admin');
const Gov = require('../../models/government');
const Vendor = require('../../models/vendor');
const Committee = require('../../models/committee');
const Tender = require('../../models/tender');

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

// exports.patchEntity = async (req, res, next) => {
//   try {
    
//     await Gov.updateOne({ _id: req.params.id },req.body, { new: true })
//       .then(result => {
//         if(String(result._id) !== req.params.id) return res.json({ message: 'Entity does not exist' })
//         return res.status(200).json(result)
//       })
//       .catch(err => res.json(err))

//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

// exports.deleteEntity = async (req, res, next) => {
//   try {
    
//     await Gov.deleteOne({ '_id': req.params.id } , { new: true })
//       .then((result) => {
//         return res.status(200).json(result)
//       })

//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }



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


/*
  TENDOR SETUP
*/

exports.getAllTenders = async (req, res, next) => {
  try {
    
    await Tender.find()
      .populate('rep', ['representative.name', 'representative.email'])
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
        if(!result) return res.json({ message: 'Entity does not exist' })
        res.status(200).json(result)
      })
      .catch(error => console.error(error))
    
  } catch (error) {
    console.error(error);
    next(error);
  }
}
