'use strict';
var express = require('express');
var errors  = require('./components/errors');
var router  = express.Router();

module.exports = function(app) {
	// Insert routes below
	app.use('/api/things', require('./api/thing'));
	app.use('/api/createGame', require('./api/gameActions'));
	app.use('/api/joinGame', require('./api/gameActions'));
	app.use('/api/makeMove', require('./api/gameActions'));

	// All undefined asset or api routes should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets)/*')
	.get(errors[404]);

	// All other routes should redirect to the index.html
	app.route('/*')
		.get(function(req, res) {
			res.sendfile(app.get('appPath') + '/index.html');
		});
};
