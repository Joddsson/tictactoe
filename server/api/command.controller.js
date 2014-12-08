var app 				= require('../app');
var boundedContext 		= require('../model/tictactoe/tictactoeBoundedContext'); 
var tictactoehandler	= require('../model/tictactoe/tictactoe');

exports.executeCommand = function (req, res) {
	try{
		if(!app.eventStore){
			app.eventStore = require('../eventstore/memorystore')();
		}

		var store 	= app.eventStore;
		var context = boundedContext(store, tictactoehandler);
		var result 	= context.handleCommand(req.body);

		res.json(result);
	}
	catch(e){
		res.json(e);
	}
};