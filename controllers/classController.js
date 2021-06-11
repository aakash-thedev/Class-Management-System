const Teacher = require('../models/teacher');
const Class = require('../models/class');

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
                    message: `Class with '${className}' already exists`
                });
            }
        }

        // now we can create a new class
        let newClass = await Class.create({
            name: className,
            classTeacher: teacher.name,
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