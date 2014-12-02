var should 		= require('should');
var _ 			= require('lodash');
var tictactoe	= require('./tictactoe');

describe('User won a game', function(){
	it('should register one winner', function(){
		var given 	= [];
		var when	= 
		{
			cmd: "WonGame",
			user: {
				userName: "Joddsson"
			},
			name: "GameWon",
			timestamp: "2014-12-02T11:29:29"
		};
		var then	=
		{
			cmd: "WonGame",
			user: {
				userName: "Joddsson"
			},
			name: "GameWon",
			timestamp: "2014-12-02T11:29:29"
		}
		var actualEvents = tictactoe(given).executeCommand(when);
		should(actualEvents.length).be.exactly(1); 
	});
}); 