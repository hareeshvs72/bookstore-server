const jobs = require('../models/jobModel')

// add job

exports.addJobController = async(req,res)=>{
    console.log("inside add job controller");

    const {title,location,jobType,salary,qualification,experience,description} = req.body
    try {
        const jobDetails = await jobs.findOne({title,location})
        if(jobDetails){
            res.status(409).json("job already added  ... please add another !!")
        }
        else{
            const newJob = new jobs({
                title,location,jobType,salary,qualification,experience,description
            })
            await newJob.save()
            res.status(200).json(newJob)
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
}

// get all jobs
exports.getAllJobsController = async(req,res)=>{
    console.log("inside get all JObs ");
    try {
        const searchKey = req.query.search
        const query = {
            title:{$regex :searchKey ,$options:'i'}
        }
        const allJobs = await jobs.find(query)
        res.status(200).json(allJobs)
    } catch (error) {
        res.status(500).json(error)
    }
    
    
}
// delet the job - 6902e6bf43bcde4953cfcf5a , 6902e70c7c5c13ca8b288869

exports.deleteJobsController = async(req,res)=>{
    console.log("insdie dellet job controller");

    const {id} = req.params

    try {
        const deleteJobs = await jobs.findByIdAndDelete({_id:id})
        res.status(200).json(deleteJobs)
    } catch (error) {
        res.status(500).json(error)
    }
    
}