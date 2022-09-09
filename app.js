const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app= express();

//connect mongoose db
mongoose.connect('mongodb+srv://vikas:vikas123@mycluster.z2jugjl.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('error', error=>{ 
    console.log("connection failed with db");
});

mongoose.connection.on('connected', connected=>{ 
    console.log("connected to db");
});

//use cors
app.use(cors());

//user body parser just above routes
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//include routes
const userRoute= require('./routes/user');

app.use('/user', userRoute);

app.use((req, res, next)=>{
    res.status(404).json({
        error: "Bad request"
    })
})

module.exports= app;