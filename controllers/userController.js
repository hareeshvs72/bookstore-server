const users = require('../models/userModel')


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
            const existingUser = await users.findOne({email, password})
            if(existingUser){
              res.status(200).json({user:existingUser})
            }
            else{
             
              res.status(404).json("Invalid Email Or Password")
            }
          } catch (err) {
            res.status(500).json(err)
          }
          // res.status(200).send("register req recived !!!")      
}
// profile