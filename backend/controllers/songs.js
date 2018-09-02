const express = require('express');
var router = express.Router();

var { Songs } = require('../models/songsModel');
var jwt = require('jsonwebtoken');
var config = require('../configs/config.js');

var verifiedJwt = 

// => localhost:3000/songs/  -------> Registration
router.post('/artistSongs', (req,res) => {
    var token = req.headers['x-access-token']; // getting token from request header

    //check whether token provided
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    //verify token with the secret
    jwt.verify(token,config.secret, (err, authenticated)=>{
        if(err){
            res.status(500).send({ auth: false, message: 'Authentication Failed!' });
        }

        if(authenticated){
            
            var artistName = req.body.artistName;

            Songs.find( {artist: artistName}, (err,artistSongs) => {
                if(err){
                    console.log(err);
                    return res.status(500).send();
                }

                if(!artistSongs){
                    return res.status(404).send();
                }

                else{
                    var data = JSON.stringify(artistSongs);
                    console.log(data);
                    return res.status(200).send(data);
                }
            });
        }

    });
    
   
});

router.get('/artists', (req,res) => {
    var token = req.headers['x-access-token']; // getting token from request header

    //check whether token provided
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    //verify token with the secret
    jwt.verify(token,config.secret, (err, authenticated)=>{
        if(err){
            res.status(500).send({ auth: false, message: 'Authentication Failed!' });
        }

        if(authenticated){

            Songs.find((err,artistSongs) => {
                if(err){
                    console.log(err);
                    return res.status(500).send();
                }

                if(!artistSongs){
                    return res.status(404).send();
                }

                else{
                    var data = JSON.stringify(artistSongs);
                    return res.status(200).send(data);
                }
            });
        }

    });
    
   
});

router.post('/albumSongs',(req,res)=>{
    var token = req.headers['x-access-token']; // getting token from request header

    //check whether token provided
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

     //verify token with the secret
    jwt.verify(token,config.secret, (err, authenticated) => {
        if(err){
            res.status(500).send({ auth: false, message: 'Authentication Failed!' });
        }

        if(authenticated){
            var albumName = req.body.albumName;

            Songs.find( {album:albumName}, (err,albumSongs)=>{
                if(err){
                    return res.status(500).send();
                }

                if(!albumSongs){
                    
                    return res.status(404).send();
                }

                else{
                    var data = JSON.stringify(albumSongs);
                    return res.status(200).send(data);
                }
            });
        }
    });
});



module.exports = router;