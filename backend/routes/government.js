const express = require('express');

const { upload } = require('../config/upload')
const router = express.Router();

const govController = require('../controllers/government/govController')


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
  GET/MAKE TENDER BY ID SETUP
*/

router.route('/tender/:id')
  .get(govController.getTender)
  .post(govController.makeTender)

/*
  UPLOAD TENDER DOCUMENT BY ID
*/

router.route('/upload/:id')
  .post(upload.single('tender'),govController.uploadTender)

module.exports = router;
