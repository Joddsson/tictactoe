'use strict';

var app = angular.module('tictactoeApp');
app.config(function ($stateProvider) {
	$stateProvider
	.state('main', {
		url: '/',
		templateUrl: 'app/main/main.html',
		controller: 'MainCtrl'
	})
	.state('play', {
		url: '/play/{gameId}',
		templateUrl: 'app/play/play.html',
		controller: 'PlayCtrl'
	})
	.state('join', {
		url: '/join/{gameId}',
		templateUrl: 'app/join/join_game.html',
		controller: 'PlayCtrl'
	});
});
