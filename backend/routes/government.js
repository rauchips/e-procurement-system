const express = require('express');
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
  GET MEMBERS NOT ASSIGNED TO EVALUATION COMMITTEE
*/

router.route('/committee')
  .get(govController.getCommittee)


/*
  GET/ ADD MEMBER TO EVALUATION COMMITTEE BY ID
*/

router.route('/committee/:id')
  .get(govController.addedCommittee)
  .patch(govController.addCommittee)

module.exports = router;
