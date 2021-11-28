const route = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt');

// register 
route.post('/register', async (req, res) => {
    // Check if email exist
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.json("Email already used")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        await newUser.save()
        res.json("Successfully registered")
    } catch(err) {
        res.json({message: err.message})
    }
})

// Login
route.post('/login', async (req, res) => {
    const user = await Users.findOne({email: req.body.email})
    if (!user) return res.json("Email does not exist")

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.json("Invalid Password")

    res.json("Logged in")
})


module.exports = route