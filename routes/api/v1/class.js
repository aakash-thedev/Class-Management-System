const express = require('express');
const router = express.Router();
const passportTeacher = require('../../../config/passport_jwt_teachers');

const classController = require('../../../controllers/classController');

// to create a class Authorization is required !! so pass on the jwt token u get after sign in and then put it in authorization bearer token
// only then u will able to create a class

router.get('/createClass/:id', passportTeacher.authenticate('jwt', {session: false}), classController.createClass);

module.exports = router;