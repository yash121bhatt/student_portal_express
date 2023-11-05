const mongoose = require('mongoose')

// Course Schema 
const CourseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: 'pending'
    },

    comment: {
        type: String,

    },

    userId: {
        type: String,
        required: true
    }





}, { timestamps: true })

const CouresModel = mongoose.model('course', CourseSchema)

module.exports = CouresModel