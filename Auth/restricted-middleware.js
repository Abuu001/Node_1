const jwt = require('jsonwebtoken')
require('dotenv').config()

// code to work with tokens
module.exports = (req,res,next) =>{
    try {
        const token = req.headers.authorization;
        const secret = process.env.JWT_SECRET;

        if (token) {
            jwt.verify(token,secret,(err,decodedToken)=>{
                if (err) {
                    res.status(401).json({ message : "Invalid Ticket" })
                }else{
                    req.decodedToken = decodedToken
                    next();
                }
            })
        }else{
            res.status(401).json({ message : "No token received" });
        }

    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}


  //code  to verify cookies sessions

// module.exports = (req,res,next) =>{
//     try {
       
//      if (!req.session && req.session.sessionID){
//             return  res.status(400).json({ message : "Sorry we can't let you in !! " })
//      }
//      return   next();
     
//     } catch (error) {
//         res.status(500).json({ message : "An unexpected error occurred" })
//     }
// }
