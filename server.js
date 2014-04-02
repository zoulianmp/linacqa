// server.js

// set up ===
// get all the tools we need
var fs 		 = require('fs');
var express  = require('express');
var passport = require('passport');
var app      = express();
var port     = process.env.PORT || 8000;
var mongoose = require('mongoose');

var configDB = require('./config/database.js');

var defaultToDev = process.env.NODE_ENV || 'development';

// dbconfig ============================================================
mongoose.connect(configDB.url); // connect to our database

// models ==============================================================
var models_path = './app/models';
fs.readdirSync(models_path).forEach(function (file) {
	if (~file.indexOf('.js')) require(models_path + '/' + file)
});

// passport config
require('./config/passport')(passport);

// app config
require('./config/app')(express, app, passport);

// routes ==============================================================
require('./config/routes')(app, passport);

// launch ==============================================================
app.listen(port);
console.log('Server started on port ' + port);