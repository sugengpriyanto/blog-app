const route = require('express').Router()
const Posts = require('../models/Post')

// create post
route.post('/', (req, res) => {

})

// read post list
route.get('/', async (req, res) => {
    try {
        const posts = await Posts.find()
        res.json(posts)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// read post
route.get('/:id', async (req, res) => {
    try{
        const post = await Posts.findById(req.params.id)
        res.json(post)
    }
    catch(err) {
        res.json({message: err.message})
    }
})

// update post
route.put('/:id', (req, res) => {
    
})

// delete post
route.delete('/:id', async (req, res) => {
    try {
        await Posts.findByIdAndDelete(req.params.id)
    }
    catch(err) {
        res.json({message: err.message})
    }
})


module.exports = route