


// register

exports.registerController = (req,res)=>{
          console.log("inside register api");
        //   console.log(req.body);
          const { username , email , password} = req.body
          console.log(username , email , password);
          
          res.status(200).send("register req recived !!!")      
}

// login

// profile