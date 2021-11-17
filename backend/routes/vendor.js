const express = require('express');
const router = express.Router();

const vendorController = require('../controllers/vendor/vendorController')


/* 
  REGISTER VENDOR SETUP
*/

router.route('/register')
  .get(vendorController.getVendor)
  .post(vendorController.postVendor)

/* 
  LOGIN VENDOR SETUP
*/

router.route('/login')
  .post(vendorController.loginVendor)

/* 
  GET TENDER BY ID SETUP
*/

router.route('/tender/:id')
  .get(vendorController.getTender)

// /* 
//   GET/MAKE BID BY ID SETUP
// */

// router.route('/bid/:id')
//   // .get(vendorController.getBid)
//   .post(vendorController.makeBid)

module.exports = router;
