const express = require('express');
const route = express.Router();
const Users = require('../models/User')
const bcrypt = require('bcrypt');

//Get all users
route.get('/', async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

//get specific user
route.get('/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        res.json(user)
    }
    catch (err) {
        res.json({message: err.message})
    }
})

//Update User
route.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.json(updatedUser)
        }
        catch(err) {
            res.json({message: err.message})
        }
    } else {
        res.json("Access Denied")
    }
})

//Delete user
route.delete('/:id', async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.json("Account Deleted")
    }
    catch {
        res.json({message: err.message})
    }
})

module.exports = route