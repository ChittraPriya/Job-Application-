const express = require('express')
const {register, login, getMe, logout} = require('../controllers/authController.js');
const { isAuthenticated } = require('../middlewares/auth.js');
const User = require('../models/user.js')

const authRouter = express.Router();

//public routes
authRouter.post('/register', register)
authRouter.post('/login', login)

//protected Routes
authRouter.get('/getme',isAuthenticated, getMe)
authRouter.post('/logout',isAuthenticated, logout)

authRouter.post('/upload/profile-picture', isAuthenticated, removeUploadedFiles.single('profilePicture'), async(req,res) => {
    try {
        if(!req.file) {
            return res.status(400).json({message: 'No file Uploaded'})
        }
        const user = await User.findByIdAndUpdate(req.userId, {profilePicture: req.file.path}, {new: true}).select('-password')

        res.status(200).json({success: true, message:'ProfilePicture uploaded Successfully', user })
        
    } catch (error) {
        res.status(500).json({success: true, message: 'Error uploading Profile Picture', error: error.message })
    }
})

authRouter.post('/upload/resume', isAuthenticated, upload.single('resume'), async(req,res) => {
    try {
        if(!req.file) {
            return res.status(400).json({message: 'No file uploaded'})
        }
        const user = await User.findByIdAndUpdate(req.userId, {resume: req.file.path}, {new:true}).select('-password')

        res.status(200).jsin({success:true, message: 'Resume upladed Successfully', user})
    } catch (error) {
        res.status(500).json({success: true,message: 'Error uploading resume', error: error.message })
    }
})

module.exports = authRouter