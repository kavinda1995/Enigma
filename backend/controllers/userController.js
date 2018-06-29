const express = require('express');
var router = express.Router();

var { User } = require('../models/userModel');


// => localhost:3000/register/

router.post('/',function(req,res){
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

module.exports = router;