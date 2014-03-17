// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path	 = require('path');

var configDB = require('./config/database.js');

var hbs = require('hbs');
var sass = require('node-sass');
var defaultToDev = (process.argv[3] == "dev");

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

var context = {
	layout: "layouts/main"
}

app.configure('development', function(){
	app.use(express.logger('dev'));
	app.use(
		sass.middleware({
		  src: path.normalize('./' + '/static/'),
		  dest: path.normalize('./' + '/static/'),
		  debug: true,
		  force: true,
		  outputStyle: 'compressed'
		})
	);
});

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'html'); // change view engine to html
	app.engine('html', hbs.__express); // handlebars for templating
	app.use(express.static('static'));

	// required for passport
	app.use(express.session({ secret: 'itsasecret' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ======================================================================
require('./app/routes.js')(app, passport, context); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Server started on port ' + port);
