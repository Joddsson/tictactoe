module.exports = function(history){
	var tictactoeState 	= require('./tictactoeState');
	var gameState 		= tictactoeState(history);

	return {
		executeCommand: function(cmd){

			var cmdHandlers = {
				"CreateGame": function(cmd){
					return [{
						id: cmd.id,
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
							id: cmd.id,
							event: "GameFullJoinAttempted",
							user: cmd.user,
							name: cmd.name,
							timeStamp: cmd.timeStamp
						}];
					}
					if(!gameState.gameCreated()){
						console.log("User tried to join a empty game");
						return[{
							id: cmd.id,
							event: "GameEmptyJoinAttempted",
							user: cmd.user,
							name: cmd.name,
							timeStamp: cmd.timeStamp
						}];
					}
					console.log("User joined a game");
					return[{
						id: cmd.id,
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
					if(gameState.illegalMove(cmd.move.coordinates)){
						return [{
							event: "IllegalMove",
							user: cmd.user,
							name: cmd.name,
							timeStamp: cmd.timeStamp,
							move: cmd.move
						}];
					}

					var events = [{
						event: "MoveMade",
						// The user how attempted to make the move.
						user: cmd.user,
						name: cmd.name,
						timeStamp: cmd.timeStamp,
						move: cmd.move						
					}];

					gameState.processEvents(events);
					if(gameState.gameWon(cmd.move.symbol)){
						events.push(
						{
							event: "GameWon",
							user: cmd.user,
							name: cmd.name,
							timeStamp: cmd.timeStamp,
							move: cmd.move
						})
					}
					if(gameState.gameTie()){
						events.push(
						{
							event: "GameTie",
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