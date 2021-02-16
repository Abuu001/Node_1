const Pool =require('pg').Pool
require('dotenv').config('./config/dev.env')


const pool = new Pool({
   user : process.env.PG_USER ,
   password: process.env.PG_PASSWORD ,
   host:  process.env.PG_HOST,
   port :   process.env.PG_PORT,
   database :   process.env.PG_DATABASE
});

pool.connect((err,client)=>{
    if(!err){
        console.log("Connected to db"); 
    }
}) 
 
module.exports=pool
