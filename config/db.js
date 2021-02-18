const Pool =require('pg').Pool
require('dotenv').config('./config/dev.env')

// const pool = new Pool({
    //    user : process.env.PG_USER ,
    //    password: process.env.PG_PASSWORD ,
    //    host:  process.env.PG_HOST,
    //    port :   process.env.PG_PORT,
    //    database :   process.env.PG_DATABASE
    // });
    
    const devConfig =`postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
    const prodConfig = process.env.DATABASE_URL ;
 
    const pool = new Pool({  
        connectionString : process.env.DB_ENVIRONMENT === "production" ? prodConfig : devConfig
    });
  
pool.connect((err,client)=>{
    if(!err){
        console.log("Connected to db"); 
    }
}) 
 
module.exports=pool
