const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../../../controllers/userController');

router.post('/teacher', userController.registerTeacher);
router.post('/student', userController.registerStudent);

module.exports = router;