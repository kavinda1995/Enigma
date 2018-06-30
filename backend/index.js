const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js');
var userController = require('./controllers/userController');

var app = express();
app.use(bodyParser.json());

app.listen(3000,() => console.log('Server started on port : 3000'));


app.use('/user', userController);
app.use('/user', userController);

