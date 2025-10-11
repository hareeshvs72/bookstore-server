const mongoose = require('mongoose')
const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("bookStore DB connected sucessfuly");
    
}).catch(err=>{
    console.log("mongodb atles connection failed");
    console.log(err);  
})