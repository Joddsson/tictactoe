'use strict';

var app = angular.module('tictactoeApp');
app.config(function ($stateProvider) {
	$stateProvider
	.state('main', {
		url: '/',
		templateUrl: 'app/main/main.html',
		controller: 'MainCtrl'
	})
	.state('game', {
		url: '/game/{gameId}',
		templateUrl: 'app/game/game.html',
		controller: 'GameCtrl'
	});
});