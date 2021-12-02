const express = require('express');
const router = express.Router();

const { bid } = require('../config/bid');

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

router.route('/tender')
  .get(vendorController.getTender)

/* 
  GET AND MAKE BID BY ID SETUP
*/

router.route('/bid/:id')
  .get(vendorController.getBid)
  .post(bid.single('bid'),vendorController.makeBid)

/* 
  GET APPROVED BID BY ID SETUP
*/

router.route('/approved/:id')
  .get(vendorController.approvedBid)

module.exports = router;
