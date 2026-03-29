const express = require('express');
const authRouter = require('./routes/authRoutes.js');
const cookieParser = require('cookie-parser');
const errorRoutes = require('./middlewares/errorRoutes.js');
const logger = require ('./middlewares/logger.js')

//create an express app
const app = express();

//middleware to parse the body of incoming request as Json
app.use(express.json());

//middleware to parse cookies
app.use(cookieParser())

//custom logger middleware
app.use(logger)

app.use('/api/v1/auth', authRouter)

//middleware to handle undefined routes
app.use(errorRoutes)


module.exports = app;