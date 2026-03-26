const User = require("../models/user.js")
const bcrypt = require('bcrypt')
const sendEmail = require("../utils/email.js")
const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require("../utils/config.js")

const authController = {
    register: async(req, res) => {
        try {
            //getr details from the request body
            const {name, email, password} = req.body

            //check if the user exists already
            const existingUser = await User.findOne({email})

            if(existingUser) {
                return res.status(400).json({message: "User is alreay Exists"})
            }

            //encrypt the password
            const hashedPassword = await bcrypt.hash(password, 10)

            //create a new User
            const newUser = new User ({ name, email,password: hashedPassword})

            //save the user to the database
            await newUser.save()

            // //send an email to the user
            // await sendEmail(email, 'Welcome to our app', 'Thankyou for Registering')

            res.status(201).json({message: "User Registered Successfully"})
        } catch (error) {
            res.status(500).json({message: "Error registering user", error: error.message})
        }
    },
    login: async(req,res) => {
        try {
            const { email, password} = req.body;

            //find the user by email
            const user = await User.findOne({ email });

            if(!user){
                return res.status(400).json({message: 'Email does not Exists'})
            }

            //compare the password
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json({message: 'Invalid Password'})
            }

            //generte a token
            const token = jwt.sign({userid : user._id}, JWT_SECRET, { expiresIn : '1h'})

            //set a token as a cookie
            res.cookie('token', token,{
                httpOnly: true,
                secure: NODE_ENV === 'production',
                sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge : 24 * 60 * 60 * 1000 //24hours
            })

            return res.status(200).json({message: 'Login Successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    assignedCompany: user.assignedCompany || null
                }
            });
        } catch (error) {
             res.status(500).json({message: "Error Logging in", error: error.message})
        }
    }
}

module.exports = authController