'use strict';

var app = angular.module('tictactoeApp');

app.controller('MainCtrl', function ($scope, $http) {
	$scope.awesomeThings = [];
	
	$http.get('/api/things').success(function(awesomeThings) {
		$scope.awesomeThings = awesomeThings;
	})
    .error(function(data){
        console.log(data);
    });
});