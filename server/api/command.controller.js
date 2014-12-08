var app 				= require('../app');
var boundedContext 		= require('../model/tictactoe/tictactoeBoundedContext'); 
var tictactoehandler	= require('../model/tictactoe/tictactoe');

exports.executeCommand = function (req, res) {
	try{
		if(!app.eventStore){
			console.log("in in ctrl");
			app.eventStore = require('../eventstore/memorystore')();
		}

		var store 	= app.eventStore;
		var context = boundedContext(store, tictactoehandler);
		console.log(req.body);
		var result 	= context.handleCommand(req.body);
		console.log("faile");

		console.log("req body " + req);

		res.json(result);
	}
	catch(e){
		console.log("in ctrl catch");
		console.log(e);
		res.json(e);
	}
};