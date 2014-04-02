// app/routes.js

var site = require('../app/controllers/site');
var users = require('../app/controllers/users');

module.exports = function(app, passport, context, mongoose) {

	// ===
	// TOP LEVEL ROUTES
	// ===
	app.get('/', site.index);
	app.get('/about', site.about);

	// ===
	// USER ROUTES
	// ===
	// user routes
	app.get('/login', users.login);
	app.get('/signup', users.signup);
	app.get('/logout', users.logout);
	app.post('/users', users.create);
	app.post('/users/session',
		passport.authenticate('local', {
		  failureRedirect: '/login',
		  failureFlash: 'Invalid email or password.'
		}), users.session);
	app.get('/users/:userId', users.show);
	app.param('userId', users.user);

};