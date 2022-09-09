const express= require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router= express.Router()
const User= require('../models/user')



//router to handle signup of user
router.post('/signup', (req, res, next)=>{
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            return res.status(500).json({
                error: err
            })
        }
        else{
            const user= new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                
            })

            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user:result
                })
            })
            .catch(err=>{
                res.status(500).json({ 
                    error: err
                })
            })
        }
    })
})


//router to handle login and send jwt to client
router.post('/login', (req, res, next)=>{
    User.find({name: req.body.name})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                msg:"user doest not exist."
            })
        }

        bcrypt.compare(req.body.password, user[0].password, (error, result)=>{
            if(!result){
                return res.status(401).json({
                    msg: "password doesnt match."
                })
            }

            if(result){
                const myToken= jwt.sign({
                    name: user[0].name ,
                    email: user[0].email ,
                   
                }, 
                'this is dummy text',
                {
                    expiresIn: "24h"
                }
                );

                res.status(200).json({
                    name: user[0].name,
                    email: user[0].email,
                    token: myToken
                })

            }
        })
    })
    .catch(err=>{
        res.status(500).json({ 
            error: err
        })
    })

});

module.exports= router;
