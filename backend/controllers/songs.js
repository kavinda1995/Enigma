const express = require('express');
var router = express.Router();

var { Songs } = require('../models/songsModel');

// => localhost:3000/songs/  -------> Registration
router.post('/artistSongs', function(req,res){
    
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
            return res.status(200).send(data);
        }
    } );
   
});

router.post('/albumSongs',(req,res)=>{
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
    })
})



module.exports = router;