const express = require('express');
const router = express.Router();
const passportTeacher = require('../../../config/passport_jwt_teachers');

const classController = require('../../../controllers/classController');

// ######### NOTE - Only that user could perform these CRUD operations who has JWT bearer token which you will get when you sign in ########## //

// --------- Proper authorization is implemented ----------- //

// get all the classes of particular teacher
router.get('/all/:id', classController.getAllClasses);

// to create a class Authorization is required !! so pass on the jwt token u get after sign in and then put it in authorization bearer token
// only then u will able to create a class
router.get('/createClass/:id', passportTeacher.authenticate('jwt', {session: false}), classController.createClass);

// delete a particular class
router.get('/deleteClass/:id', passportTeacher.authenticate('jwt', {session: false}), classController.deleteClass);

// update the class information [ for now i am just taking class name !! ]
router.get('/updateClass/:id', passportTeacher.authenticate('jwt', {session: false}), classController.updateClass);



// ----------------------- CRUD endpoints for teachers to manage students joining in their classes ----------------------- //

// the extra slash is for query parameter

router.get('/getStudents/:id', classController.getStudent);

router.post('/addStudent/', classController.addStudent);

router.get('/deleteStudent/', classController.deleteStudent);

module.exports = router;