var _ = require('lodash');

module.exports = function(history){
	var gameFull 	= false;
	var gameOver 	= false;
	var gameScore	= [0,0,0,0,0,0,0,0,0];
	var board 		= [["", "", ""], ["", "", ""], ["", "", ""]];
	var point 		= 0;
	var moveCount	= 0;

	function processEvent(event){
		if(event.event === "GameJoined"){
			gameFull = true;
		}
		if(event.event === "MoveMade"){
			if(event.move.symbol === 'X'){
				point = 1;
			}
			else if(event.move.symbol === 'O'){
				point = -1;
			}

			var row = event.move.coordinates[0];
			var col = event.move.coordinates[1];

			// Set coordinates to 1 if symbol is X and -1 if symbol is Oþ 
			gameScore[row] 			+= point;
			gameScore[board + col]	+= point;

			if(row === col){
				gameScore[2 * board] += point;
			}

			moveCount++;

			board[event.move.coordinates[0]][event.move.coordinates[1]] = event.move.symbol;
		}
	}

	function processEvents(history) {
		_.each(history, processEvent);
	}

	processEvents(history);
	
	return {
		processEvents: processEvents,

		gameFull: function(){
			return gameFull;			
		},
		gameWon: function(){
			return _.reduce(gameScore, function(won, score){
				return won || score === 3 || score === -3;
			}, false);
		}
	}
};

