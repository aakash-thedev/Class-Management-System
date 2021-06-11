const express = require('express');
const router = express.Router();

const home = require('../../../controllers/userController');

router.get('/', home.home);
router.use('/register', require('./register'));
router.use('/login', require('./login'));

// API's for teachers
router.use('/class', require('./class'));

module.exports = router;