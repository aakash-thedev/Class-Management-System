const express = require('express');
const router = express.Router();
const passportTeacher = require('../../../config/passport_jwt_teachers');

const userController = require('../../../controllers/userController');

router.get('/teacher', userController.loginTeacher);
router.get('/student', userController.loginStudent);

module.exports = router;