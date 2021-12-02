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

/* 
  GET AND APPROVE BID BY ID SETUP
*/

router.route('/bid/:id')
  .get(comController.getBid)
  .patch(comController.approveBid)

module.exports = router;
