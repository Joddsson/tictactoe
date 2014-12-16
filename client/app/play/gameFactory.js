'use strict';

angular.module('tictactoeApp')
.factory('gameFactory', function (){
	var userName;
	var gameName;

	return {
		setUserName: function(uName) {
			userName = uName;
		},
		getUserName: function() {
			return userName;
		},
		setGameName: function(uName) {
			gameName = uName;
		},
		getGameName: function() {
			return gameName;
		}
	};
});