const authController = {
    register: async(req, res) => {
        try {
            res.status(201).json({messageL: "User Registered Successfully"})
        } catch (error) {
            res.status(500).json({message: "Error registering user", error: error.message})
        }
    }
}

module.exports = authController