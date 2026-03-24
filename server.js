const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config.js')

mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log('Error Connecting to MongoDB:', err.message)
})