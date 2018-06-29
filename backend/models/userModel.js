const mongoose = require('mongoose');

var User = mongoose.model('user',{
    username: {type: String , unique: true},
    password: {type: String},
    email: {type: String}
});

module.exports = { User };