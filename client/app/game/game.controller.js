'use strict';

var app     = angular.module('tictactoeApp');

app.controller('GameCtrl', function ($scope, $http, $stateParams, gameFactory, $state) {
    
    $scope.identifier = Math.floor((Math.random() * 1000) + 1);

    $scope.sum = function(box, coords){

        var MakeMoveCmd = 
        {
            cmd: 'MakeMove',
            user: 'userName',
            name: 'The first game',
            timeStamp: '2014-12-02T11:29:29',
            move: {
                coordinates: coords,
                symbol: currentSymbol
            } 
        };
        if($('#' + box + ' p').html() === ''){
            //$('#' + box + ' p').text(nextTurn);
            
        }

        $http.post('/api/makeMove', MakeMoveCmd).
            success(function(data) {
                console.log(data);
            }); 
    };

    $scope.createGame = function(){
        var CreateGameCmd = 
        {
            id: $scope.identifier,
            cmd: 'CreateGame',
            user: $scope.userName,
            name: $scope.gameName,
            timeStamp: new Date().getTime() 
        };
        
        $scope.gId = CreateGameCmd.id;

        var req = {
            method: 'POST',
            url: '/api/createGame',
            data: CreateGameCmd,
        };

        $http(req)
        .success(function(data) {
            gameFactory.setUserName(data[0].user.userName);
            gameFactory.setGameName(data[0].name);
            $state.go('game', { 'gameId': $scope.gId });
            console.log(data);      
        })
        .error(function(data) {
            console.log(data);          
        });
    };
});

