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
  .post(govController.makeTender)
  // .patch(govController.closeTender)

/*
  UPLOAD TENDER DOCUMENT BY ID
*/

router.route('/upload/:id')
  .get(govController.getUpload)
  .post(upload.single('tender'),govController.uploadTender)

module.exports = router;
