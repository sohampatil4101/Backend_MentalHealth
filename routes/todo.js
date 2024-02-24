const express = require('express')
const todo = require('../models/Todo')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';



// Route to book appoinment
router.post('/posttodo', fetchuser, async (req, res) =>{
        
    try {
        console.log(req.user.id)
        const user = await todo.create({
            user: req.user.id,
            todo : req.body.todo,
            priority : req.body.priority
        })
        
        success = true
        res.json({success})
    
    
}    

catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
}


})

// route for doc to fetch all his appoinment
router.get('/fetchmytodo', fetchuser, async(req, res) =>{
    try {
        const notes = await todo.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})

module.exports = router