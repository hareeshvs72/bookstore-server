const books = require('../models/bookModal')

exports.addBookController = async (req,res)=>{
  console.log("inside add Book Controller");

  console.log(req.body);
  console.log(req.files);
  const {title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category} = req.body
  const userMail =  req.payload
  var uploadImg = []
  req.files.map(item=>uploadImg.push(item.filename))
  console.log(title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,userMail);
  
  try {
    const existingBook = await books.findOne({title,userMail})
    if(existingBook){
      res.status(401).json("you have already added the book")
    }
    else{
      const newBook = new books({
        title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,userMail
      })
      await newBook.save()
      res.status(200).json(newBook)
    }
    
  } catch (error) {
    res.status(500).json(error)
  }

  
}