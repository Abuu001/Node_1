const express = require('express')
const  http = require('http')
const app= express();
const server =  http.createServer(app)
require('dotenv').config({ path : './config/dev.env' })



const PORT = process.env.PORT || 3004;
server.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))