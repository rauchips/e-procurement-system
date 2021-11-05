const express = require('express');
const router = express.Router();

const comController = require('../controllers/committee/comController')


/* 
  REGISTER COMMITTEE MEMBER SETUP
*/

router.route('/register')
  .get(comController.getCommittee)
  .post(comController.postCommittee)

/* 
  LOGIN COMMITTEE MEMBER SETUP
*/

router.route('/login')
  .post(comController.loginCommittee)

/* 
  GET TENDER BY ID SETUP
*/

router.route('/tender/:id')
  .get(comController.getTender)

module.exports = router;
