const User = require("../models/user.js")
const bcrypt = require('bcrypt')

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

            res.status(201).json({message: "User Registered Successfully"})
        } catch (error) {
            res.status(500).json({message: "Error registering user", error: error.message})
        }
    }
}

module.exports = authController