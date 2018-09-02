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
            return res.status(500).send(err.message.toString());
        }
        return res.status(200).send('User Registered Successfully');
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


    // => localhost:3000/user/plays --> count artistPlays

    router.post('/plays', (req,res)=>{
        var token = req.headers['x-access-token']; // getting token from request header
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    //verify token with the secret
        jwt.verify(token,config.secret, (err, authenticated)=>{
            if(err){
                res.status(500).send({ auth: false, message: 'Authentication Failed!' });
            }

            if(authenticated){
                //console.log(authenticated.user);

                User.find({username : authenticated.user},{artistPlays: true},(err,artistPlayCount)=>{
                    if(err){
                        return res.status(500).send();
                    }

                    if(!artistPlayCount){
                        return res.status(404).send();
                    }
                    else{
                        var artistName = req.body.artistName;
                        var objectArray = artistPlayCount[0].artistPlays;
                        

                        var hasKey = objectArray.some(function(val) {
                            return Object.values(val).includes(artistName);
                          });

                          console.log(hasKey);
                         

                       if(!hasKey){ 
                            
                            var query = {};
                            var criteria = artistName;
                            query[criteria] = 1;
                            

                            User.update({$push: {artistPlays: {name : artistName, count: 1} }}, (err,countCreated)=>{
                                if(err){
                                    console.log(err.message.toString());
                                }

                                else if(countCreated){
                                    console.log(countCreated);
                                }
                            });
                        }

                        if(hasKey){
                            var currentCount;
                

                            User.findOneAndUpdate({ "artistPlays.name": artistName },
                            { $inc: { "artistPlays.$.count" : 1 } },function(err,doc){ })
                            

                        }

                

                    }
                }) ;
            }
    });
});

module.exports = router;
