const express = require('express');
const router = express.Router();

const { upload } = require('../config/upload');

const govController = require('../controllers/government/govController');


/* 
  REGISTER GOVERNMENT ENTITY SETUP
*/

router.route('/register')
  .get(govController.getEntity)
  .post(govController.postEntity)

/* 
  LOGIN GOVERNMENT ENTITY SETUP
*/

router.route('/login')
  .post(govController.loginEntity)

/* 
  GET AND MAKE TENDER BY ID SETUP
*/

router.route('/tender/:id')
  .get(govController.getTender)
  .post(upload.single('tender'),govController.makeTender)
  .patch(govController.closeTender)

/* 
  GET AND ACCEPT BID BY ID SETUP
*/

router.route('/bid/:id')
  .get(govController.getBid)
  .patch(govController.acceptBid)

/*
  ASSIGN COMMITTEE MEMBERS TO TENDER BY ID
*/

router.route('/committee/:id')
  .patch(govController.patchCommittee)

module.exports = router;
