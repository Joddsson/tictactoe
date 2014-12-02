module.exports = function(history){
	var tictactoeState 	= require('./tictactoeState');
	//var gamestate 		= tictactoeState(history);

	return {
		executeCommand: function(cmd){
			var cmdHandlers = {
				"WonGame": function(cmd){
					return [{
						event: "GameWon",
						winner: cmd.winner,
						timeStamp: cmd.timeStamp
					}]
				},
				"DrawGame": function(cmd){
					return [{
						event: "GameDraw",
						winner: cmd.winner,
						timeStamp: cmd.timeStamp
					}]
				}
			}
			return cmdHandlers[cmd.cmd](cmd);
		}
	}
};