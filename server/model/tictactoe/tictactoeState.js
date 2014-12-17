var _ = require('lodash');

module.exports = function(history){
	console.log('dmer');
	var gameFull 	= false;
	var gameOver 	= false;
	var gameCreated	= false;
	var gameScore	= [0,0,0,0,0,0,0,0,0];
	var board 		= [["", "", ""], ["", "", ""], ["", "", ""]];
	var point 		= 0;
	var moveCount	= 0;

	function clear() {
		console.log('adsd');
		gameFull 	= false;
		gameOver 	= false;
		gameCreated	= false;
		gameScore	= [0,0,0,0,0,0,0,0,0];
		board 		= [["", "", ""], ["", "", ""], ["", "", ""]];
		point 		= 0;
		moveCount	= 0;
	}

	function processEvent(event){
		if(event.event === "GameCreated"){
			gameCreated = true;
		}
		if(event.event === "GameJoined"){
			gameFull = true;
		}
		if(event.event === "MoveMade"){
			//console.log('sweg' + event.move);
			var point = event.move.symbol==='X'? 1 : -1;	

			var row = event.move.coordinates[0];
			var col = event.move.coordinates[1];

			// Set coordinates to 1 if symbol is X and -1 if symbol is O.
			gameScore[row] 		+= point;
			gameScore[3 + col]	+= point;

			if(row === col){
				gameScore[2 * 3] += point;
			}

      		if (3 - 1 - col === row) gameScore[2*3 + 1] += point;

			moveCount ++;
			
			board[event.move.coordinates[0]][event.move.coordinates[1]] = event.move.symbol;
		}
	}

	function gameWon(symbol){
	    return _.reduce(gameScore, function(won, score){
	    	//console.log("won: " + won + ", " + "score: " + score);
			return won || score === 3 || score === -3;

	    }, false);
	}

	function processEvents(history) {
		_.each(history, processEvent);
	}

	processEvents(history);
	
	return {
		processEvents: processEvents,

		clear: clear,
		gameCreated: function(){
			return gameCreated;
		},
		gameFull: function(){
			return gameFull;			
		},
		gameWon : gameWon,
		gameTie: function(){
			if(gameWon()){
				return false;
			}
			if(moveCount === 9){
				return true;
			}
			return false;
		}
		/*illegalMove: function(coords){
			//console.log(!!board[coords[0]][coords[1]]);
			var sumt = document.getElementsByClassName('box');

			console.log("sdsaasdasd" + sumt.value);
			if($('.box p').text() !== ''){
				console.log("yoloool");
			}
			//return !!board[coords[0]][coords[1]];
		}*/
	}
};

