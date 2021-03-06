var should = require('should');
var _ = require('lodash');
var tictactoe = require('./tictactoe');

describe('Create game command', function(){
	it('should emit a game created event', function(){
		var given 	= [];
		var when 	= 
		{
			id: 1,
			cmd: "CreateGame", 
			user:  {
				userName: "joddsson"
			},
			name: "The first game",
			timeStamp: "2014-12-02T11:29:29"
		};
		var then	= [
			{
				id: 1,
				event: "GameCreated",
				user: {
					userName: "joddsson"
				},
				name: "The first game",
				timeStamp: "2014-12-02T11:29:29"
			}
		];

		var actualEvents = tictactoe(given).executeCommand(when);
    	should(actualEvents.length).be.exactly(1);
    	should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
	});
});