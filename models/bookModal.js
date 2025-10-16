const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
     author:{
        type:String,
        require:true
    },
     noOfPages:{
        type: Number,
        require:true
    },
     imageUrl:{
        type:String,
        require:true
    },
     price:{
        type: Number,
        require:true
    },
     discountPrice:{
        type: Number ,
        require:true
    },
     abstract:{
        type:String,
        require:true
    },
     publisher:{
        type:String,
        require:true
    },
     language:{
        type:String,
        require:true
    },
     isbn:{
        type:String,
        require:true
    },
     category:{
        type:String,
        require:true
    },
     uploadImg:{
        type:Array,
        require:true
    },
     status:{
        type:String,
        default:"pending"
    },
     userMail:{
        type:String,
        require:true
    },
     bought:{
        type:String,
        default:""
    }
})
const books = mongoose.model("books",bookSchema)
module.exports = books