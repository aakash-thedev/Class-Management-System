const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    classTeacher: {
        type: mongoose.Schema.Types.ObjectId
    },

    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]

}, {
    timestamps: true
});

const Teacher = mongoose.model('Teacher', classSchema);

module.exports = Teacher;