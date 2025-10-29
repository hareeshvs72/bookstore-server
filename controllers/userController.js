const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// register

exports.registerController = async (req,res)=>{
          console.log("inside register api");
        //   console.log(req.body);
          const { username , email , password} = req.body
          console.log(username , email , password);
          try {
            const existingUser = await users.findOne({email})
            if(existingUser){
              res.status(409).json("user already exist!!! please login")
            }
            else{
              const newUser = new users({
                username,
                email,
                password
              })
              await newUser.save()
              res.status(200).json(newUser)
            }
          } catch (err) {
            res.status(500).json(err)
          }
          // res.status(200).send("register req recived !!!")      
}

// login

exports.loginController = async (req,res)=>{
          console.log("inside login api");
        //   console.log(req.body);
          const {email , password} = req.body
          console.log( email , password);
          try {
            const existingUser = await users.findOne({email})
          if(existingUser){
              if(existingUser.password == password){
              const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
              res.status(200).json({user:existingUser,token})
            }
            else{
             
              res.status(401).json("Invalid Email Or Password")
            }
          }
          else{
           res.status(404).json("Account does not exist") 
          }
          } catch (err) {
            res.status(500).json(err)
          }
          // res.status(200).send("register req recived !!!")      
}

// google login
exports.googleLoginController = async (req,res)=>{
          console.log("inside google login api");
        //   console.log(req.body);
          const {email , password,username,profile} = req.body
          console.log( email , password,username,profile);
          try {
            const existingUser = await users.findOne({email})
          if(existingUser){
           const token = jwt.sign({userMail:existingUser.email},process.env.JWTSECRET)
              res.status(200).json({user:existingUser,token})
          }
          else{
            const newUser = new users({
              username,email,password,profile
            })
            await newUser.save()
            console.log(newUser);
            
            // token
           const token = jwt.sign({userMail:newUser.email,role:existingUser.role},process.env.JWTSECRET)
              res.status(200).json({user:newUser,token})
          }
          } catch (err) {
            res.status(500).json(err)
          }
          // res.status(200).send("register req recived !!!")      
}
// profile - user

exports.userProfileWditController = async (req,res)=>{
    console.log("inside userProfile Edit controller");
    // get data to be update from req, boday ,payload ,file

    const {username,password,profile,bio,role} = req.body

    const email = req.payload
    const updateProfile  = req.file?req.file.filename : profile
    try {
      const updateUser = await users.findOneAndUpdate({email},{username,email,password,profile:updateProfile,bio,role},{new:true})
      await updateUser.save()
      res.status(200).json(updateUser)
    } catch (error) {
      res.status(500).json(error)
    }
}


// ------------------------ Admin  ----------------------------

// get all Useres

exports.getAllUsersController = async (req,res)=>{
     console.log("inside Get All User Controller");
     const email = req.payload
     try {
      const allUsers = await users.find({email:{$ne:email}})
      res.status(200).json(allUsers)
     } catch (error) {
      res.status(500).json(error)
     }
  
}

// update admin profile

exports.adminProfileUpdateController = async (req,res)=>{
   console.log("insdie  adminProfileUpdateController");
   const {username,password,profile,bio,role} = req.body
   const adminEmail = req.payload
   
     
       const updateProfile  = req.file?req.file.filename : profile
      
       
   
   try {
    const updateAdmin = await users.findOneAndUpdate({email:adminEmail},{username,email,password,profile:updateProfile,bio,role},{new:true})
    await updateAdmin.save()
    res.status(200).json(updateAdmin)
   } catch (error) {
    res.status(500).json(error)
   }
}