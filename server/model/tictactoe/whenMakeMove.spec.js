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

	it('should emit the game won if game is won on top row', function(){
		given 	= [
			createEvent, joinEvent,
			moveEvent([0, 0], "X"),
			moveEvent([0, 1], "X")
		];

		when 	= {
			cmd: "MakeMove",
			user: {
				userName: "Valli"
			},
			name: "The first game",
			timeStamp: "2014-12-02T11:29:29",
			move: {
				coordinates: [0, 2],
				symbol: "X"
			}
		};

		then 	= [
			moveEvent([0,2], "X"),
			{
				event: "GameWon",
				user: {
					userName: "Valli"
				},
				name: "The first game",
				timeStamp: "2014-12-02T11:29:29",
				move: {
					coordinates: [0,2],
					symbol: "X"
				}
			}
		]; 
	});

	it('should emit the game draw if the board is full and nobody won', function(){
		given 	= [
			createEvent, joinEvent,
			moveEvent([0,0], "X"),
			moveEvent([0,1], "X"),
			moveEvent([0,2], "O"),
			moveEvent([1,0], "O"),
			moveEvent([1,1], "O"),
			moveEvent([1,2], "X"),
			moveEvent([2,0], "X"),
			moveEvent([2,1], "O")
		];
		
		when 	= 
		{
			cmd: "MakeMove",
			user: {
				userName: "Valli"
			},
			name: "The first game",
			timeStamp: "2014-12-02T11:29:29",
			move: {
				coordinates: [2,2],
				symbol: "X"
			}
		};

		then 	= [
			moveEvent([2,2], "X"),
			{
				event: "GameTie",
				user: {
					userName: "Valli"
				},
				name: "The first game",
				timeStamp: "2014-12-02T11:29:29",
				move: {
					coordinates: [2,2],
					symbol: "X"
				}
			}
		]; 
	});
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