var _  = require('cloneextend');


var Store = require('./modelo/store');
var Controller = require ('./controller');
var config = require('../config/config.js');

module.exports = function(app, passport) {

	console.log('passing by main dude... ');

// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	//PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.sendfile('./angular/index.html', {
			user : req.user
		});
	});

	app.get('/profiler', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});


	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login', function(req, res) {
			res.render('login.ejs', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
	app.get('/connect/local', function(req, res) {
		res.render('connect-local.ejs', { message: req.flash('loginMessage') });
	});
	app.post('/connect/local', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

// 

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});


	// devolver todos las tiendas
	//app.get('/api/store', isLoggedIn, Controller.getStore);

	app.get('/api/storeFromUser', isLoggedIn, Controller.getStoreByEmail); 

	app.get('/api/getLoggedUser', isLoggedIn, function (req,res) {

		var dude = _.clone(req.user.local);

		dude.isAdmin = (dude.email === config.adminKey);

		console.log('getting req.user.local');
		console.log(dude);


		res.send(dude); 
	}); 

	//app.get('/api/getAll', Controller.getAllStoresWithUsers);

	// Crear una nueva tienda
	app.post('/api/store', isLoggedIn, Controller.setStore);
	// Modificar los datos de una tienda
	app.put('/api/store/:store_id', isLoggedIn, Controller.updateStore);
	// Borrar una tienda
	app.delete('/api/store/:store_id', isLoggedIn, Controller.removeStore);

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
