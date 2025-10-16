const books = require('../models/bookModal')

exports.addBookController = (req,res)=>{
  console.log("inside add Book Controller");
  res.status(200).json("request recived")
  
}