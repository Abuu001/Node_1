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
    const prodConfig = process.env.DATABASE_URL || `postgres://akupwqptwjjniv:77d7cb774d2b7efe6cfb154793f51e3936800af86399ae53e1f1d7807a2c830f@ec2-54-225-130-212.compute-1.amazonaws.com:5432/df7nfcuolh9cs`;
 
    const pool = new Pool({  
        connectionString : process.env.NODE_ENV === "production" ? prodConfig : devConfig
    }); 
  
pool.connect((err,client)=>{
    if(!err){
        console.log("Connected to db"); 
    }
}) 
 
module.exports=pool
