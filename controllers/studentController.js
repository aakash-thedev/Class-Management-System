const Student = require('../models/student');

module.exports.classesEnrolled = async function(req, res) {

    try{
        // get the student id from param
        const studentId = req.params.id;

        let student = Student.findById(studentId).populate('classesEnrolled');

        let classesEnrolled = student.classesEnrolled;

        return res.status(200).json({
            message: `Student is enrolled in these classes`,
            classesEnrolled: classesEnrolled
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}