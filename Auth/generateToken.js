const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports=(id)=>{
    //we ned 3 things  -->  payload,secret,options

    const payload={
        id : id
    }
    const secret = process.env.JWT_SECRET;
    const options={
        expiresIn : 60 * 60 
    }
   return  jwt.sign(payload,secret,options)
}
