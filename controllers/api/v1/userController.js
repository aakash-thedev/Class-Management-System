module.exports.home = function(req, res){
    return res.status(200).json({
        message: "Home"
    });
}

module.exports.teacherSignUp = function(req, res){
    return res.status(200).json({
        message: "Teacher Signed Up"
    });
}

module.exports.studentSignUp = function(req, res){
    return res.status(200).json({
        message: "Student Signed Up"
    });
}