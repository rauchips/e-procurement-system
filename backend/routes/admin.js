const express = require('express');
const router = express.Router();

const { upload } = require('../config/upload');
const { bid } = require('../config/bid');


const adminController = require('../controllers/admin/adminController');

/*
  REGISTER SETUP
*/

router.route('/register')
  .get(adminController.getLogin)
  .post(adminController.postAdmin)

/*
  LOGIN SETUP
*/

router.route('/login')
  .post(adminController.loginAdmin)

/*
  GOVERNMENT ENTITY SETUP
*/

router.route('/governments')
  .get(adminController.getAllEntities)
  
/*
  GOVERNMENT ENTITY BY ID SETUP
*/

router.route('/governments/:id')
  .get(adminController.getEntity)
  .patch(adminController.patchEntity)
  .delete(adminController.deleteEntity)

/*
  VENDOR SETUP
*/

router.route('/vendors')
  .get(adminController.getAllVendors)
  
/*
  VENDOR BY ID SETUP
*/

router.route('/vendors/:id')
  .get(adminController.getVendor)
  .patch(adminController.patchVendor)
  .delete(adminController.deleteVendor)

/*
  TENDOR SETUP
*/

router.route('/tenders')
  .get(adminController.getAllTenders)
  
/*
  TENDOR BY ID SETUP
*/

router.route('/tenders/:id')
  .get(adminController.getTender)
  .patch(upload.single('tender'),adminController.patchTender)
  .delete(adminController.deleteTender)

/*
  COMMITTEE SETUP
*/

router.route('/committees')
  .get(adminController.getAllCommittees)
  
/*
  COMMITTEE BY ID SETUP
*/

router.route('/committees/:id')
  .get(adminController.getCommittee)
  .patch(adminController.patchCommittee)
  .delete(adminController.deleteCommittee)

/*
  BID SETUP
*/

router.route('/bids')
  .get(adminController.getAllBids)

/*
  BID BY ID SETUP
*/

router.route('/bids/:id')
  .get(adminController.getBid)
  .patch(bid.single('bid'),adminController.patchBid)
  .delete(adminController.deleteBid)

module.exports = router;