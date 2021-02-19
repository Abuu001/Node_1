const bcrypt = require('bcrypt');
const pool = require('../config/db')
const generateToken = require('../Auth/generateToken')

 // endpoint for logging in 
const Login=async(req,res)=>{
    try {
        const {username,user_password} = req.body;
        if (!(username && user_password)){
            return  res.status(400).json({message : "Fill in the missing fields"});
        }  
 
        let user =await pool.query("SELECT * FROM users WHERE username=$1",[username]);
   
        //check if username has been taken
        if (user.rows.length > 1) {
            return  res.status(400).json({message : "Username has been taken"});
        }
  
        //check if user already exists
        if (user.rows.length < 1) {
            return  res.status(400).json({message : "User does not exist"});
        }

        //check if the password match with the hashed one.
        const validPassword = await bcrypt.compare(user_password,user.rows[0].user_password)
        if (!validPassword) {
          return  res.status(400).json({message : "Credentials do not match"});
        }     

         // req.session.user ={
        //     id : user.rows[0].id,
        //     username : user.rows[0].username
        // }
        // console.log(req.session.user);
   
        
        // generating a jwtToken
        const userID =  user.rows[0].id ;
        const token = generateToken(userID)
        res.status(200).json( {message : `You're logged in successfully. Welcome back ${username}` , token }) 
    } catch (error) { 
        res.status(500).json({ message : "An unexpected error occurred" });
    }
} 

// post a user
const registerUser=async(req,res)=>{
    try {
        const {username,user_password} = req.body;
        if (!(username && user_password)){
          return  res.status(400).json({message : "Fill in the missing fields"});
        } 
         
        //hashing password
        const saltRounds =10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptedPass =await bcrypt.hash(user_password,salt); 

        let response =await pool.query("INSERT INTO users (username,user_password) VALUES ($1,$2) RETURNING *",[username,bcryptedPass]);
        res.status(200).json( response.rows[0]);
    } catch (error) { 
        res.status(500).json({ message : "An unexpected error occurred" });
    }
} 

const Logout =(req,res)=>{
    console.log(req.session);
    if(req.session){
        req.session.destroy(error =>{
            if ( error) {
                res.status(500).json({ message : "Failed"})
            }else{
                res.status(200).json({ messsage : "Sucessfully Logged out"})
            }
        } )
    }else{
        res.status(200).json({ message : "You are not logged in "})
    }
}

module.exports={
    Login,
    registerUser,
    Logout
}