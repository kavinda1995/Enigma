const mongoose = require('mongoose');

var User = mongoose.model('user',{
    username: {type: String , unique: true},
    password: {type: String},
    email: {type: String},
    artistPlays: { type: Object},
    albumPlays : {type: Object },
});

module.exports = { User };