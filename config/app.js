var sass = require('node-sass');
var path = require('path');
var hbs = require('hbs');
var flash = require('connect-flash');

module.exports = function(express, app, passport) {

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

		app.set('views', './app/views') // change default views directory
		app.set('view engine', 'html'); // change view engine to html
		app.engine('html', hbs.__express); // handlebars for templating
		app.use(express.static('static'));

		// required for passport
		app.use(express.session({ secret: 'itsasecret' })); // session secret
		app.use(passport.initialize());
		app.use(passport.session()); // persistent login sessions
		app.use(flash()); // use connect-flash for flash messages stored in session

	});

}