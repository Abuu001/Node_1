const pool = require('../config/db')
const moment= require('moment')

/**
 * getTime
 * @type {string}
 */

/**
 * 
 * @todo Add CRUD routes
 */
// for posting Message
/**@function postMessage */
const postMessage=async(req,res)=>{
    try {
        const getTime =moment().format('LT');
        const {message,name} = req.body

        let response =await pool.query("INSERT INTO messages (sender,text_field,time_sent) VALUES ($1,$2,$3) RETURNING *",[name,message,getTime]);
        res.status(200).json( response.rows[0])
    } catch (error) {
        res.status(500).json({ message : "Failed to add message" })  
        console.log(error);
    }
}

/**
 * Function runs asynchronously
 * @async 
 */
// for getting  all Message
const getMessages=async(req,res)=>{
    try {
        let response =await pool.query("SELECT  lesson_name,time_stamp,lesson_id,lesson_fk,sender,text_field FROM lessons LEFT JOIN messages ON lesson_id=lesson_fk");
        res.status(200).json( {
            length : response.rows.length,
            mesage : response.rows
        })
         
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

// for getting a Message
const getMessage=async(req,res)=>{
    try {   
        const {id} = req.params;
 
        let response =await pool.query("SELECT * FROM messages WHERE lesson_fk=$1",[id]);
        res.status(200).json({
            message : response.rows[0]
        })
         
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

// for deleting Message
const deleteMessage=async(req,res)=>{
    try {
        const {id} = req.params;
        let response =await pool.query("DELETE  FROM messages WHERE lesson_fk=$1",[id]);
        res.status(200).json({
            message :"Record deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

// for updating  all Message
const updateMessage=async(req,res)=>{
    try {
        const {id} = req.params;
        const {sender,text_field}=req.body
        const getTime =moment().format('LT'); 

       let response =await pool.query("UPDATE messages SET  sender=$1,text_field=$2,time_sent=$3 WHERE lesson_fk=$4 RETURNING *",[sender,text_field,getTime,id]);
       res.status(201).json({
        message : response.rows[0]
    }) 

    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}
 
//========================  LESSONS=========================================

// for posting lessons
const postLessons=async(req,res)=>{
    try {
    
        const getTime =moment().format('LT');
        const {name} = req.body

        let response =await pool.query("INSERT INTO lessons (lesson_name,time_stamp) VALUES ($1,$2) RETURNING *",[name,getTime]);
        res.status(200).json( response.rows[0])
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
} 

// for getting all lessons
const getLessons=async(req,res)=>{
    try {
        let response =await pool.query("SELECT * FROM lessons ORDER BY lesson_id ASC");
        res.status(200).json( {
            length : response.rows.length,
            mesage : response.rows
        })
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

// for getting a lesson
const getLesson=async(req,res)=>{
    try {
         const {id} = req.params;
  
         let response =await pool.query("SELECT * FROM lessons WHERE id=$1",[id]);
         res.status(200).json({
             message : response.rows[0]
         })
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

// for deleting lessons
const deleteLesson=async(req,res)=>{
    try {
        const {id} = req.params;
        let response =await pool.query("DELETE  FROM lessons WHERE id=$1",[id]);
        res.status(200).json({
            message :"Record deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

// for updating  lessons
const updateLesson=async(req,res)=>{
    try {
        const {id} = req.params;
        const {name}=req.body
        const getTime =moment().format('LT'); 

       let response =await pool.query("UPDATE lessons SET  lesson_name=$1,time_stamp=$2 WHERE id=$3 RETURNING *",[name,getTime,id]);

        res.status(201).json({
            message : response.rows[0]
        })
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

module.exports={
    postMessage,
    getMessages,
    getMessage,
    updateMessage,
    deleteMessage,
    postLessons,
    getLessons,
    deleteLesson,
    getLesson,
    updateLesson
}
