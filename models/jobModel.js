const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true
    },
     location:{
        type:String,
        require:true
    },
     jobType:{
        type:String,
        require:true
    },
     salary:{
        type:String,
        required:true
    },
     qualification:{
        type:String,
        require:true
    },
     experience:{
        type:String,
        require:true
    },
     description:{
        type:String,
        require:true
    }

})

const jobs = mongoose.model("jobs",jobSchema)

module.exports = jobs