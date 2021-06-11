const express = require('express');
const router = express.Router();

const studentController = require('../../../controllers/studentController');

router.get('/classes_enrolled/:id', studentController.classesEnrolled);

module.exports = router;