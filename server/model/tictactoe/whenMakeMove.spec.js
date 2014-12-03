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