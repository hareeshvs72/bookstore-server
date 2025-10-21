// import  dotenv express cors
// load .env file content into process .env
 
require('dotenv').config()
const express =require('express')
const cors = require('cors')
const router = require('./routing/router')
require('./db/connection')
// create server 
const bookStoreServer = express()
// enable cors protocol in server app
bookStoreServer.use(cors())
bookStoreServer.use(express.json()) // parse json
bookStoreServer.use(router)
bookStoreServer.use('/uploads',express.static('./uploads'))
// create prot for aplication

const PORT = 3000

// RUN SERVER PORT 

bookStoreServer.listen(PORT, ()=>{
    console.log(`book store server run at port : ${PORT} , and waiting for client request !! `);
})

bookStoreServer.get('/',(req,res)=>{
   res.status(200).send( "<h1>book store server run at port ... and waiting for client request !!</h1>")
    
})

