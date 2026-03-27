const express = require('express');
const authRouter = require('./routes/authRoutes.js');
const cookieParser = require('cookie-parser')

//create an express app
const app = express();

//middleware to parse the body of incoming request as Json
app.use(express.json());

//middleware to parse cookies
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)


module.exports = app;