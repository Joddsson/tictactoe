'use strict';
//Game id generator.

var app = angular.module('tictactoeApp');
var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

app.controller('MainCtrl', function ($scope, $http, $state, gameFactory) {
	$scope.awesomeThings 	= [];
	var identifier 			= guid();
	
	$('.createGameForm').submit(function(){
		/* jshint ignore:start */
		socket.emit('Incoming connection', $('#m').val());
		/* jshint ignore:end */
	    return false;
	});

	$scope.createGame = function(){
	    var CreateGameCmd = 
	    {
	        id: identifier,
	        cmd: 'CreateGame',
	        user: {
	        	userName: $scope.userName
	        },
	        name: $scope.gameName,
	        timeStamp: new Date().getTime() 
	    };

	    var req = {
	        method: 'POST',
	        url: '/api/createGame',
	        data: CreateGameCmd,
	    };
	    
	    $scope.gId = CreateGameCmd.id;

	    $http(req)
	    .success(function(data) {
	        gameFactory.setUserName(data[0].user.userName);
	        gameFactory.setGameName(data[0].name);
	        $state.go('play', { 'gameId': $scope.gId });
	        console.log(data);      
	    })
	    .error(function(data) {
	        console.log(data);
	    });
	};

	$http.get('/api/things').success(function(awesomeThings) {
		$scope.awesomeThings = awesomeThings;
	})
    .error(function(data){
        console.log(data);
    });
});
