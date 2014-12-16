/**
* Main application file
*/

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
	console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

server.listen(9000, function(){
	console.log('listening on *:9000');
});

io.on('connection', function(socket){
	console.log("connected");
	socket.on('Incoming connection', function(u){
		console.log('userasdasd: ' + u);
		io.emit('Incoming connection', u);
	});
	socket.on('moveMade', function(co, gameId){
		console.log('gamdadi: ' + gameId);
		socket.join(gameId);
		io.emit('moveMade', co, gameId);
	});
	socket.on('gameWon', function(winSymbol){
		console.log("in game won server side");
		io.emit('gameWon', winSymbol);
	});
	socket.on('opponentFound', function(opponentName){
		console.log('in opponentFound');
		io.emit('opponentFound', opponentName);
	});
});

app.eventStore = require('./eventstore/memorystore')();

app.appName ="TicTacToe";

// Expose app
exports = module.exports = app;