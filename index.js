const express = require('express')
const  http = require('http') 
const app= express();
const server =  http.createServer(app)
require('dotenv').config({ path : './config/dev.env' })
const morgan=require('morgan')
const cors = require('cors')

//  middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/v1/api',require('./routes/routes'))

// if(process.env.NODE_ENV==='production'){
//     app.use(express.static(path.join(__dirname,'./client/build')))
// } 

const PORT = process.env.PORT || 3004;
server.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))