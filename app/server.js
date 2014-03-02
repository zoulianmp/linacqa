var express = require('express');
var path = require('path');
var hbs = require('hbs');
var fs = require('fs');
var strftim = require('strftime');

var serverRoot = process.argv[2];
var defaultToDev = (process.argv[3] == "dev");
var port = process.argv[4] || 3123;

if(!serverRoot || serverRoot == "") {
	console.log(strftime('%d %b %H:%M:%S') + " - Server root not provided, defaulting to ./");
	serverRoot = "./";
}

var context = {
	config: {
		javascriptEnabled: true,
		dev: defaultToDev,
		cdn: 'http://cdn.linacqa.com'
	},
	layout: "layouts/main",
	imports: require('../data/imports.json')
};

var app = express();
var sass = require('node-sass');

// ---
// express config
app.configure('development', function(){
	app.use(
		sass.middleware({
		  src: path.normalize(serverRoot + '/static/'),
		  dest: path.normalize(serverRoot + '/static/'),
		  debug: false,
		  force: true,
		  outputStyle: 'compressed'
		})
	);
});

// production only
app.configure('production', function(){
	// app.use(express.compress());
});

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.compress());
app.use(express.static('static'));


// ---
// Parse Query
var parseQuery = function(request, response) {
	// parse query and manipulate { context } here
}


// ---
// routes
app.get('/', function(request, response) {
	parseQuery(request, response);
	response.render('index', context);
});

app.get('/about', function(request, response) {
	parseQuery(request, response);
	response.render('about', context);
});

// start app
app.listen(port);
console.log("Server started on port " + port);