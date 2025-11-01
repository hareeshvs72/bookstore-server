const applications = require('../models/aplicationModel')

// add Aplication - user

exports.addAplicationController = async (req,res)=>{
    console.log("inside add aplication controller");

    const {fullname,email,qualification,phone,coverLetter,jobTitle,jobId} = req.body
    const resume = req.file.filename
    try {
        const aplicationDetails = await applications.findOne({email,jobId})
        if(aplicationDetails){
            res.status(409).json("alreasy Applied For Job !!!")
        }else{
            const newAplication = new applications({
                fullname,email,qualification,phone,coverLetter,resume,jobTitle,jobId
            })
            await newAplication.save()
            res.status(200).json(newAplication)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// get application  - admin

exports.getAplicationController = async(req,res)=>{
    console.log("inside get Aplication Controller");

    try {
        const allAplication = await applications.find()
        res.status(200).json(allAplication)
    } catch (error) {
        res.status(500).json(error)
    }
}