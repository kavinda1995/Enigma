const express = require('express');
var router = express.Router();

var { Songs } = require('../models/songsModel');

// => localhost:3000/songs/  -------> Registration
router.post('/artist', function(req,res){
    
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
            console.log('Artist Songs exists')

            console.log(artistSongs);
                  var data = JSON.stringify(artistSongs);

            return res.status(200).send(data);
        }
    } );
   
})

module.exports = router;