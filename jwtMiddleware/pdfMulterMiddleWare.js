const multer = require('multer')

const storage  = multer.diskStorage({
    destination:(req,file,cb)=>{
         cb(null,'./pdf')
    },
    filename:(res,file,cb)=>{
        cb(null,`resume-${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req,file,cb)=>{
    // image with png jpg jpeg
     if(file.mimetype == 'application/pdf' ){
        cb(null,true)
     }
     else{
        cb(null,false)
        return cb(new Error("accept only pdf files"))
     }
}

const pdfMulterConfig = multer({
    storage,
    fileFilter
})

module.exports = pdfMulterConfig