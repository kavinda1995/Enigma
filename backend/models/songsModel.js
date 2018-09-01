const mongoose = require('mongoose');

var Songs = mongoose.model('song',{
    name: {type: String},
    artist: {type: String},
    link: {type: String},
    album:{type: String}
});

module.exports = { Songs };