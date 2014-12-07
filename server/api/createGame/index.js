var express = require('express');
var ctrl	= require('../command.controller.js');

module.exports = function(app){
	var router 	= express.Router();

	router.post('/', ctrl.executeCommand);

	return { router:router }
}