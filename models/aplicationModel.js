const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    coverLetter:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    jobId:{
        type:String,
        required:true
    },
})

const applications = mongoose.model("applications",applicationSchema)
module.exports = applications