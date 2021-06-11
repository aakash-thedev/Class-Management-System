const express = require('express');
const router = express.Router();

const home = require('../../../controllers/userController');

router.get('/', home.home);
router.use('/register', require('./register'));
router.use('/login', require('./login'));

// --------------------- API's for teachers --------------------- //

// ---------------------- All the CRUD operations on Class could be done inside this route --------------------------- //

router.use('/class', require('./class'));

router.use('/students', require('./students'));

module.exports = router;