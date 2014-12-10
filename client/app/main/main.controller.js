'use strict';

var app = angular.module('tictactoeApp');
app.controller('MainCtrl', function ($scope, $http, gameFactory, $state) {
	$scope.awesomeThings = [];
	$http.get('/api/things').success(function(awesomeThings) {
		$scope.awesomeThings = awesomeThings;
	})
    .error(function(data){
        console.log(data);
    });

	$scope.createGame = function(){
	    var id = Math.floor((Math.random() * 1000) + 1);
	    var CreateGameCmd = 
	    {
	        id: id,
	        cmd: 'CreateGame',
	        user: $scope.userName,
	        name: $scope.gameName,
	        timeStamp: new Date().getTime() 
	    };

	    var req = {
		    method: 'POST',
		    url: 'http://localhost:9000/api/createGame',
		    headers: {
		    	'Access-Control-Allow-Origin': '*'
		    },
		    data: CreateGameCmd,
	    };

	    $http(req)
	    .success(function(data) {
    	    gameFactory.setUserName(data[0].user.userName);
    	    gameFactory.setGameName(data[0].name);
            $state.go('game');
	        console.log(data);      
	    })
	    .error(function(data) {
	        console.log(data);          
	    });
	};
});