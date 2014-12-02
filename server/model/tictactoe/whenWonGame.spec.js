var should 		= require('should');
var _ 			= require('lodash');
var tictactoe	= require('./tictactoe');

describe('User won a game', function(){
	it('should register one winner', function(){
		var given 	= [];
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

	it('should disallow users to make a move', function(){

	});
}); 