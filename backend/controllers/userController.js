const express = require('express');
var router = express.Router();

var { User } = require('../models/userModel');

var jwt = require('jsonwebtoken');
var config = require('../configs/config.js'); // auth config



// => localhost:3000/user/register/  -------> Registration

router.post('/register',function(req,res){
    var newuser = new User({

        username: req.body.username,
        password:req.body.password,
        email: req.body.email,

    });

    newuser.save(function(err,savedUser){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    });
    });

// => localhost:3000/user/login/  -------> Login

    router.post('/login',function(req,res){

        var username = req.body.username;
        var password = req.body.password;

        User.findOne({username: username, password: password}, (err,user) => {
            if (err){
                cosole.log(err);
                return res.status(500).send();
            }

            if(!user){
                return res.status(404).send();
            }
            const payload = {
                user: user.username,
                permissions: 'normal user'
                
              };
            var token = JSON.stringify(jwt.sign(payload,config.secret));
                    

            return res.status(200).send(token);
        })

    });


module.exports = router;
