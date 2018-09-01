const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js');
var userController = require('./controllers/userController');
var songsController = require('./controllers/songs');

var jwt = require('jsonwebtoken');
var config = require('./configs/config.js'); // auth config

var app = express();

// Add headers
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());

app.listen(3000,() => console.log('Server started on port : 3000'));

//authentication and registration
app.use('/user', userController);


// Songs
app.use('/songs', songsController);



