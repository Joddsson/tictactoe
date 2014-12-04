/*var should 		= require('should');
var _ 			= require('lodash');
var tictactoe	= require('./tictactoe');

describe('User won a game', function(){
	it('should register one winner', function(){
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
			}
		];
		var when	= 
		{
			cmd: "WonGame",
			winner: {
				userName: "Joddsson"
			}
		};
		var then	= [
			{
				event: "GameWon",
				winner: {
					userName: "Joddsson"
				}
			}
		]
		var actualEvents = tictactoe(given).executeCommand(when);
		
		// Asserting that a winner was registerd.
		should(actualEvents.length).be.exactly(1);
		should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then)); 
	});

	it('should emit the GameOverMoveAttempted if move is made after game is over', function(){
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
	});
}); */