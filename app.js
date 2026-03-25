const express = require('express')

//create an express app
const app = express();

app.get('/', (res,req)=>{
    res.send('Hello World')
})


module.exports = app;