const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Class = require('../models/class');

module.exports.getAllClasses = async function(req, res) {

    try{

        const teachersId = req.params.id;

        // find the teacher is in Database
        // return all his/her classes

        let teacher = await Teacher.findById(teachersId).populate('classes');

        if(!teacher){
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        const classes = teacher.classes;

        return res.status(200).json({

            message: "All the user",
            data: {
                classes: classes
            }

        });
    }

    catch(err){

        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.createClass = async function(req, res) {

    try{
        // we will get instructor's id from req.params &
        // we will get name of the class of the teacher from the req body

        //------ same instructor cannot have duplicate class names but different instructors can have classes of same name ------- //

        // so when i am creating a class i will just check if the current instructor has any class with same name or not

        const teacherId = String(req.params.id).trim();
        const className = req.body.className;

        // find the teacher in database
        let teacher = await Teacher.findById(teacherId).populate('classes');

        if(!teacher){
            return res.status(404).json({
                message: "Unauthorized"
            });
        }

        // when we find the teacher we iterate over its classes and check if the className given exists or not
        for(let i=0; i<teacher.classes.length; i++) {

            if(teacher.classes[i].name == className){

                return res.status(402).json({
                    message: `Class with '${className}' name already exists`
                });
            }
        }

        // now we can create a new class
        let newClass = await Class.create({
            name: className,
            classTeacher: teacher._id,
            studentsEnrolled: []
        });

        teacher.classes.push(newClass._id);
        teacher.save();

        return res.status(200).json({
            message: `${className} class created successfully`,
            data: {
                newClass: newClass
            }
        });
    }

    catch(err){

        console.log("error", err);

        return res.status(500).json({

            message: "Internal Server Error"
        });
    }
}

module.exports.deleteClass = async function(req, res) {

    try{

        // we will be getting the id of the selected class from front end via params

        // we will find that class in database & delete this class from classTeachers classes array
        // & then iterate over all the enrolledStudent one by one and delete this class ref from their
        // classesEnrolled array
        // atlast we will delete this class from class collection

        // this way all the refrences of this class will also be deleted [ which is a very good thing to do ]

        const classId = String(req.params.id).trim();

        let currentClass = await Class.findById(classId).populate('studentsEnrolled').populate('classTeacher');

        if(!currentClass){
            return res.status(404).json({
                message: "Class Not Found"
            });
        }

        // when we find the class in db
        // find the classTeacher in db

        const classTeacherId = currentClass.classTeacher;

        let classTeacher = await Teacher.findById(classTeacherId).populate('classes');

        if(!classTeacher){
            return res.status(404).json({
                message: "Class Teacher not found"
            });
        }

        // if we found the classTeacher then delete this class from its classes array
        var classIndex = -1;

        for(let i=0; i<classTeacher.classes.length; i++) {
            if(classTeacher.classes[i].id == classId){
                classIndex = i;
                break;
            }
        }

        classTeacher.classes.splice(classIndex, 1);

        classTeacher.save();

        // now iterate over all the studentEnrolled array

        for(let i=0; i<currentClass.studentsEnrolled.length; i++) {

            let student = currentClass.studentsEnrolled[i];
            var classEnrolledIndex = -1;
            // for this students inside its classesEnrolled array delete this class
            for(let j=0; j<student.classesEnrolled.length; j++){
                if(student.classesEnrolled[i] == classId){

                    classEnrolledIndex = i;
                    break;

                }
            }

            student.classesEnrolled.splice(classEnrolledIndex, 1);

            student.save();
        }

        // now finally delete this class reference from its model
        currentClass.remove();

        return res.status(200).json({
            message: "Class & its all references from everywhere Deleted Successfully"
        });

    }

    catch(err){

        console.log("Error", err);
        return res.status(500).json({
            message: "Iternal Server Error"
        });
    }

    // ----------------- whoaahhhhh !! that was a lot of logic and code ----------------------------- //
}

module.exports.updateClass = async function(req, res) {

    try{
        const classId = req.params.id;

        let updatedClass = Class.findByIdAndUpdate(classId, { name: req.body.className });

        updatedClass.save();

        return res.status(200).json({
            message: "Class updated successfully",
            newClass: updatedClass
        });
    }
    catch(err){

        console.log("err", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


// --------------- MANAGE STUDENTS IN THE CLASSES ----------------- //

// --------------- add student to the class ----------------------- //

module.exports.addStudent = async function(req, res) {

    try{

    
        // we will get two things from query parameter

        // 1 - Student id we want to add 
        // 2 - In which class we want to add the above student

        const studentId = req.query.studentId;
        const classId = req.query.classId;

        // first find student in the database
        let student = await Student.findById(studentId).populate('classesEnrolled');

        if(!student){
            return res.status(404).json({
                message: "Student not found"
            });
        }

        let currentClass = await Class.findById(classId).populate('studentsEnrolled');

        if(!currentClass){
            return res.status(404).json({
                message: "Class not found"
            });
        }

        // if we found both
        if(student && currentClass) {

            // then add the student in currentClass's studentEnrolled array
            // && add the currentClass in student's classesEnrolled array

            currentClass.studentsEnrolled.push(student._id);

            currentClass.save();

            student.classesEnrolled.push(currentClass._id);

            student.save();

            return res.status(200).json({
                message: "Student Added"
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

// ----------------- delete student ---------------------- //

module.exports.deleteStudent = async function(req, res) {

    try{
        // we will get two things from query parameter

        // 1 - Student id we want to add 
        // 2 - In which class we want to add the above student

        const studentId = req.query.studentId;
        const classId = req.query.classId;

        // first find student in the database
        let student = await Student.findById(studentId).populate('classesEnrolled');

        if(!student){
            return res.status(404).json({
                message: "Student not found"
            });
        }

        let currentClass = await Class.findById(classId).populate('studentsEnrolled');

        if(!currentClass){
            return res.status(404).json({
                message: "Class not found"
            });
        }

        // if we found both
        if(student && currentClass) {

            // then add the student in currentClass's studentEnrolled array
            // && add the currentClass in student's classesEnrolled array

            var studentIndex = -1;

            for(let i=0; i<currentClass.studentsEnrolled.length; i++){

                if(currentClass.studentsEnrolled[i].id == student.id){
                    studentIndex = i;
                    break;
                }
            }

            currentClass.studentsEnrolled.splice(studentIndex, 1);

            currentClass.save();

            var classIndex = -1;

            for(let j=0; j<student.classesEnrolled.length; j++){

                if(student.classesEnrolled[i].id == classId){
                    classIndex = j;
                    break;
                }
            }

            student.classesEnrolled.splice(classIndex, 1);

            student.save();

            return res.status(200).json({
                message: "Student Deleted Successfully"
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