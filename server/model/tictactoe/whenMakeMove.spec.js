var should 		= require('should');
var _ 			= require('lodash');
var tictactoe	= require('./tictactoe');

var createEvent		= {
	event: "GameCreated",
	user: {
		userName: "joddsson"
	},
	name: "The first game",
	timeStamp: "2014-12-02T11:29:29"	
};

var joinEvent	= {
	event: "GameJoined",
	user: {
		userName: "Valli"
	},
	name: "The first game",
	timeStamp: "2014-12-02T11:29:29"
};

function moveEvent(coordinates, symbol) {
	return {
		event: "MoveMade",
		user: {
			userName: "Valli"
		},
		name: "The first game",
		timeStamp: "2014-12-02T11:29:29",
		move: {
			coordinates: coordinates,
			symbol: symbol
		}
	};
}

describe('MakeMove command', function(){
	var given, when, then;

	afterEach(function(){
		var actualEvents = tictactoe(given).executeCommand(when);
		should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then)); 
	});

	it('should emit MoveMade on first game move', function(){
		given 	= [
			createEvent, joinEvent
		];
		when	= 
		{
			cmd: "MakeMove",
			user: {
				userName: "Valli"
			},
			name: "The first game",
			timeStamp: "2014-12-02T11:29:29",
			move: {
				coordinates: [0, 0],
				symbol: "X"
			} 
		};
		then	= [
			moveEvent([0,0], "X")
		]
	});

	/*it('should emit the GameOverMoveAttempted if move is made after game is over', function(){
		var given 	= [
			{
				event: "GameCreated",
				user: {
					userName: "joddsson"
				},
				name: "The first game",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				event: "GameJoined",
				user: {
					userName: "Valli"
				},
				name: "The first game",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				event: "MoveMade",
				user: {
					userName: "Valli"
				}
			}
		];
		var when 	= 
		{
			cmd: "MakeMove",
			user: {
				userName: "Valli"
			}
		}

		var then 	= [
		{
			event: "GameOverMoveAttempted",
			user: {
				userName: "Valli"
			}
		}];
		var actualEvents = tictactoe(given).executeCommand(when);

		should(actualEvents.length).be.exactly(1);
		should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then)); 
	});

	it('should emit the MoveMade if move is made and game is not over', function(){
		var given 	= [
			{
				event: "GameCreated",
				user: {
					userName: "joddsson"
				},
				name: "The first game",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				event: "GameJoined",
				user: {
					userName: "Valli"
				},
				name: "The first game",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				event: "MoveMade",
				user: {
					userName: "Valli"
				}
			}
		];
		var when 	= 
		{
			cmd: "MakeMove",
			user: {
				userName: "Valli"
			}
		}

		var then 	= [
		{
			event: "MoveMade",
			user: {
				userName: "Valli"
			}
		}];
		var actualEvents = tictactoe(given).executeCommand(when);

		should(actualEvents.length).be.exactly(1);
		should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then)); 
	});*/
}); 
// Fix this. Should this be in another test?
	/*it('should emit the GameOverMoveAttempted event if user tried to make a move when game is over', function(){
		var given 	= [
			{
				event: "GameCreated",
				user: {
					userName: "joddsson"
				},
				name: "The first game",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				event: "GameJoined",
				user: {
					userName: "Valli"
				},
				name: "The first game",
				timeStamp: "2014-12-02T11:29:29"
			},
			{
				event: "MadeMove",
				user: {
					userName: "Valli"
				}
			}
		];

		var when = 
		{
			cmd: "MakeMove", 
			user: {
				userName: "Valli"
			}
		};

		var then = [
			{
				event: "GameOverMoveAttempted",
				user: {
					userName: "Valli"
				}
			}];

		var actualEvents = tictactoe(given).executeCommand(when);

		should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then)); 
	});

	it('should disallow users to make a move', function(){

	});*/