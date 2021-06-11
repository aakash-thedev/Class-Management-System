const express = require('express');
const router = express.Router();

const home = require('../../../controllers/userController');

router.get('/', home.home);
router.use('/register', require('./register'));

module.exports = router;