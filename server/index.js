const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRouter = require('./routes/User')
const postRouter = require('./routes/Post')
const authRouter = require('./routes/Auth')

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/api/', (req, res) => {
    res.json("This is HomePage")
})

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

app.listen(port, () => console.log(`Server is running on port: ${port}`));