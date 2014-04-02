// controllers/site.js

// ===
// get "/"
exports.index = function(req, res){
	res.render('site/index', {
		layout: 'layouts/main',
    	title: 'Home'
    });
};

// ===
// get "/about"
exports.about = function(req, res){
	res.render('site/about', {
		layout: 'layouts/main',
    	title: 'About'
    });
};