var app 				= require('../app');
var boundedContext 		= require('../model/tictactoe/tictactoeBoundedContext'); 
var tictactoehandler	= require('../model/tictactoe/tictactoe');

var express = require('express')();
var http = require('http').Server(express);
var io = require('socket.io')(http);

exports.executeCommand = function (req, res) {
	try{
		if(!app.eventStore){
			app.eventStore = require('../eventstore/memorystore')();
		}

		var store 	= app.eventStore;
		var context = boundedContext(store, tictactoehandler);
		var result 	= context.handleCommand(req.body);

		/*io.on('connection', function(socket){
		  console.log('a user connected');
		});

		http.listen(3000, function(){
		  console.log('listening on *:3000');
		});*/

		res.json(result);
	}
	catch(e){
		res.json(e);
	}
};