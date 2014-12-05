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

	it('should emit the game won if game is won on top row with symbol X', function(){
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

	it('should emit the game won if game is won on middle row with symbol Y', function(){
		given 	= [
			createEvent, joinEvent,
			moveEvent([0, 0], "O"),
			moveEvent([0, 1], "O")
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
				symbol: "O"
			}
		};

		then 	= [
			moveEvent([0,2], "O"),
			{
				event: "GameWon",
				user: {
					userName: "Valli"
				},
				name: "The first game",
				timeStamp: "2014-12-02T11:29:29",
				move: {
					coordinates: [0,2],
					symbol: "O"
				}
			}
		]; 
	});

	it('should emit the game won if game is won on middle column with symbol Y', function(){
		given 	= [
			createEvent, joinEvent,
			moveEvent([0, 1], "O"),
			moveEvent([1, 1], "O")
		];

		when 	= {
			cmd: "MakeMove",
			user: {
				userName: "Valli"
			},
			name: "The first game",
			timeStamp: "2014-12-02T11:29:29",
			move: {
				coordinates: [2, 1],
				symbol: "O"
			}
		};

		then 	= [
			moveEvent([2,1], "O"),
			{
				event: "GameWon",
				user: {
					userName: "Valli"
				},
				name: "The first game",
				timeStamp: "2014-12-02T11:29:29",
				move: {
					coordinates: [2,1],
					symbol: "O"
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

	it('should emit the illegal move event if player tries an illegal move', function(){
		given 	= [
			createEvent, joinEvent,
			moveEvent([0,0], "O")
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
				coordinates: [0,0],
				symbol: "O"
			}
		};

		then = [{
			event: "IllegalMove",
			user: {
				userName: "Valli"
			},
			name: "The first game",
			timeStamp: "2014-12-02T11:29:29",
			move: {
				coordinates: [0,0],
				symbol: "O"
			}
		}];
	});
}); 