'use strict';

var app = angular.module('tictactoeApp');

app.controller('JoinCtrl', function ($rootScope, $scope, $http, $state, gameFactory) {
	/*$scope.joinGame = function(){
		console.log('in join ctr');
		console.log($scope.opponentName);
		$state.go('play', { gameId: $state.params.gameId });
		socket.emit('opponentFound');
	   	console.log($('.grid').attr('id'));
	}

	socket.on('opponentFound', function(){
	    console.log('in show grid');
	    //$scope.grid = true;
	    console.log("saasdads" + document.getElementById('ab'));
	    $rootScope.$apply();
	});*/
});