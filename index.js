const express = require('express')
const  http = require('http') 
const app= express();
const server =  http.createServer(app)
require('dotenv').config()
const cors = require('cors')
const session = require('express-session')
const restricted = require('./Auth/restricted-middleware')
const authRoutes = require('./Auth/auth-routes')
const helmet = require('helmet');


const sessionConfig={
    name : 'monster',  // name of cookie
    secret : process.env.COOKIE_SECRET,  //secret tht makes cookie effective
    cookie:{
        maxAge:1000 * 60 * 60,  //time span for cookie
        secure : process.env.NODE_ENV === 'production' ? true :  false ,  // for production set to true for https only access
        httpOnly : true  // true means no access for js
    },
    resave : false,
    saveUninitialized : process.env.NODE_ENV === 'production' ?  false :  true   // when in production set it to false
}
 
//  middlewares 
if (process.env.NODE_ENV!=='production'){
    const morgan=require('morgan') 
    app.use(morgan('dev'));
}
app.use(cors()); 
app.use(express.json());
app.use(session(sessionConfig));
app.use(helmet());
app.use('/v1/api',restricted,require('./routes/routes'));  
app.use('/v1/api/user/login',authRoutes.Login); 
app.use('/v1/api/register/user',authRoutes.registerUser); 
app.use('/v1/api/user/logout',authRoutes.Logout); 

// if(process.env.NODE_ENV==='production'){
//     app.use(express.static(path.join(__dirname,'./client/build')))
// } 

const PORT = process.env.PORT || 3004;
server.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))