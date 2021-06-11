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