
const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema ({
    title: {type:String, required: true},
    description: {type:String, required: true},
    requirements: [{type:String}],
    salary: {
        min: {
            type: Number
        },
        max: {
            type: Number
        },
        currency: {type: String, default: 'INR'},
    },
    location: {type: String, required: true},
    jobType: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Internship' , 'Freelance']
    },
    experienceLevel: {
        type: String,
        enum: ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'],
        default: 'Entry'
    },
    skills: [{type: String}],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    postedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applicationDeadLine: {type: String},
    isActive: {type:Boolean, default: true},

}, {timestamps: true})

module.exports = mongoose.model('Job', jobSchema, 'jobs')