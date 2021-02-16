const pool = require('../config/db')
const moment= require('moment')


// for posting channel
const postChannel=async(req,res)=>{
    try {
   
         db.query()
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

// for getting  all channel
const getChannels=async(req,res)=>{
    try {
         
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

// for getting a channel
const getChannel=async(req,res)=>{
    try {
         const {id}= req.params;
         
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

// for deleting channel
const deleteChannel=async(req,res)=>{
    try {
         const {id}= req.params;
        // const deleted = 
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

// for updating  all channel
const updateChannel=async(req,res)=>{
    try {
        const {id} = req.params;
        const changes =req.body;

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

        res.status(200).json({
            message : response.rows[0]
        })
    } catch (error) {
        res.status(500).json({ message : "An unexpected error occurred" })
    }
}

module.exports={
    postChannel,
    getChannels,
    getChannel,
    updateChannel,
    postLessons,
    getLessons,
    deleteChannel,
    deleteLesson,
    getLesson,
    updateLesson
}
