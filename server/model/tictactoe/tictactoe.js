module.exports = function(history){
	var tictactoeState 	= require('./tictactoeState');
	var gameState 		= tictactoeState(history);

	return {
		executeCommand: function(cmd){
			var cmdHandlers = {
				"CreateGame": function(cmd){
					return [{
						event: "GameCreated",
						user: cmd.user,
						name: cmd.name,
						timeStamp: cmd.timeStamp 
					}];
				},
				"JoinGame": function(cmd){
					if(gameState.gameFull()){
						console.log("User tried to join a full game");
						return[{
							event: "GameFullJoinAttempted",
							user: cmd.user,
							name: cmd.name,
							timeStamp: cmd.timeStamp
						}];
					}
					console.log("User joined a game");
					return[{
						event: "GameJoined",
						user: cmd.user,
						name: cmd.name,
						timeStamp: cmd.timeStamp
					}];
				},
				"DrawGame": function(cmd){
					return [{
						event: "GameDraw",
						winner: cmd.winner,
						timeStamp: cmd.timeStamp
					}];
				},
				"MakeMove": function(cmd){
					var events = [{
						event: "MoveMade",
						// The user how attempted to make the move.
						user: cmd.user,
						name: cmd.name,
						timeStamp: cmd.timeStamp,
						move: cmd.move						
					}];

					gameState.processEvents(events);
					if(gameState.gameWon()){
						events.push(
						{
							event: "GameWon",
							user: cmd.user,
							name: cmd.name,
							timeStamp: cmd.timeStamp,
							move: cmd.move
						})
					}

					return events;
				}
			}
			return cmdHandlers[cmd.cmd](cmd);
		}
	}
};