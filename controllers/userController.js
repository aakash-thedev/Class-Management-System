const Teacher = require('../models/teacher');
const Student = require('../models/student');

module.exports.home = function(req, res){
    return res.status(200).json({
        message: "Home"
    });
}

module.exports.registerTeacher = async function(req, res){

    // we are getting all the data for signing up the teacher from the body
    // so i am gonna use req.body here to fetch all the data

    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // find if this email already exists in database or not
        let teacher = await Teacher.findOne({email: email});

        if(teacher){
            return res.status(402).json({
                message: "User with this email already exists"
            });
        }

        else{
            // now create a new teacher in db
            let newTeacher = await Teacher.create({
                name: name,
                email: email,
                password: password,
                classes: []
            });

            return res.status(200).json({
                message: "Teacher Signed Up",
                teacher: {
                    data: newTeacher
                }
            });
        }
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.registerStudent = async function(req, res){

    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // find if this email already exists in database or not
        let student = await Student.findOne({email: email});

        if(student){
            return res.status(402).json({
                message: "User with this email already exists"
            });
        }

        else{
            // now create a new teacher in db
            let newStudent = await Student.create({
                name: name,
                email: email,
                password: password,
                classesEnrolled: []
            });

            return res.status(200).json({
                message: "Student Signed Up",
                teacher: {
                    data: newStudent
                }
            });
        }
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}