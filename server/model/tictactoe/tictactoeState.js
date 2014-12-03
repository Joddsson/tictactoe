var _ = require('lodash');

module.exports = function(history){
	var gameFull 	= false;
	var gameOver 	= false;
	var board		= [];
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

	_.each(history, function(event){
		if(event.event === "GameJoined"){
			gameFull = true;
		}
		else if(event.event === "MoveMade"){
			for(var iter in stateStore){
				if(isGameOver(stateStore[iter].board)){
					console.log("gameOver");
					gameOver = true;
				}
			}
		}
	});

	function isGameOver(boardState){
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
	}
	
	return {
		gameFull: function(){
			return gameFull;			
		},
		gameOver: function(){
			console.log(gameOver);
			return gameOver;
		}
	}
};

