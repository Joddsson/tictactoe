var _ = require('lodash');

module.exports = function(history){
	var gameFull 	= false;
	var gameOver 	= false;
	var gameScore	= [0,0,0,0,0,0,0,0,0];
	var board 		= [["", "", ""], ["", "", ""], ["", "", ""]];
	var point 		= 0;
	var moveCount	= 0;

	var stateStore = 
	[
		{
			"gameId": "1",
			"board": [
				["x", "x", "x"],
				["Z", "P", "Z"],	
				["Z", "P", "Z"]
			],
			"state": "x wins"
		},
		{
			gameId: 2,
			board: [
				["Z", "P", "Z"],
				["o", "o", "o"],
				["Z", "P", "Z"]
			],
			state: "o wins"
		},
		{
			gameId: 3,
			board: [
				["x", "Z", "Z"],
				["Z", "x", "Z"],
				["Z", "Z", "x"]
			],
			state: "x wins"
		}
	];

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

			moveCount ++;

			board[event.move.coordinates[0]][event.move.coordinates[1]] = event.move.symbol;


			/*for(var iter in stateStore){
				if(isGameOver(stateStore[iter].board)){
					console.log("gameOver");
					gameOver = true;
				}
				else{
					gameOver = false;
				}
			}*/
		}
	}

	function processEvents(history) {
		_.each(history, processEvent);
	}

	processEvents(history);

	/*function isGameOver(boardState){
		// Ieww!
		if( boardState[0][0] === boardState[0][1] && boardState[0][0] === boardState[0][2] ||
			boardState[1][0] === boardState[1][1] && boardState[1][0] === boardState[1][2] ||
			boardState[2][0] === boardState[2][1] && boardState[2][0] === boardState[2][2] ||
			boardState[0][0] === boardState[1][0] && boardState[0][0] === boardState[2][0] ||
			boardState[1][0] === boardState[1][1] && boardState[1][0] === boardState[1][2] ||
			boardState[2][0] === boardState[2][1] && boardState[2][0] === boardState[2][2] ||
			boardState[0][0] === boardState[1][1] && boardState[0][0] === boardState[2][2] ||
			boardState[2][0] === boardState[1][1] && boardState[2][0] === boardState[0][2]
			)
		{
			return true;
		}
	}*/
	
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

