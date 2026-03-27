const express = require('express')
const {register, login, getMe, logout} = require('../controllers/authController.js');
const { isAuthenticated } = require('../middlewares/auth.js');

const authRouter = express.Router();

//public routes
authRouter.post('/register', register)
authRouter.post('/login', login)

//protected Routes
authRouter.get('/getme',isAuthenticated, getMe)
authRouter.post('/logout',isAuthenticated, logout)

module.exports = authRouter