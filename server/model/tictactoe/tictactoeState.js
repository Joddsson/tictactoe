var _ = require('lodash');

module.exports = function(history){
	var gameFull 	= false;
	var gameOver 	= false;
	var gameCreated	= false;
	var gameScore	= [0,0,0,0,0,0,0,0,0];
	var board 		= [["", "", ""], ["", "", ""], ["", "", ""]];
	var point 		= 0;
	var moveCount	= 0;

	function processEvent(event){
		if(event.event === "GameCreated"){
			gameCreated = true;
		}
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

			// Set coordinates to 1 if symbol is X and -1 if symbol is O.
			gameScore[row] 		+= point;
			gameScore[3 + col]	+= point;

			if(row === col){
				gameScore[2 * board] += point;
			}

      		if (3 - 1 - col === row) gameScore[2*3 + 1] += point;

			moveCount ++;
			
			board[event.move.coordinates[0]][event.move.coordinates[1]] = event.move.symbol;
		}
	}

	function processEvents(history) {
		_.each(history, processEvent);
	}

	processEvents(history);
	
	return {
		processEvents: processEvents,

		gameCreated: function(){
			return gameCreated;
		},
		gameFull: function(){
			return gameFull;			
		},
		gameWon: function(symbol){
			if(board[0][0] ===  symbol && board[1][1] === symbol && board[2][2] === symbol ||
				board[2][0] ===  symbol && board[1][1] === symbol && board[0][2] === symbol)
			{
				moveCount = 0;
				return true;
			}
			return _.reduce(gameScore, function(won, score){
				return won || score === 3 || score === -3;
			}, false);
		},
		gameTie: function(){
			if(moveCount === 9){
				moveCount = 0;
				return true;
			}
			return false;
		},
		illegalMove: function(coord){
			if(board[coord[0]][coord[1]] !== ''){
				return true;
			}
			return false;
		}
	}
};

