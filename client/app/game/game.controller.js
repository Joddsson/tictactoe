'use strict';

var app     = angular.module('tictactoeApp');

app.controller('GameCtrl', function ($scope, $http, $stateParams, gameFactory, $state) {
    var nextTurn = 'X';
    $scope.identifier = Math.floor((Math.random() * 1000) + 1);

    $scope.sum = function(box, coords){
        var currentSymbol = 'X';

        var changeTurn = function (){
            if(nextTurn === 'X'){
                nextTurn        = 'O';
                currentSymbol   = 'X';
            }
            else{
                nextTurn        = 'X';
                currentSymbol   = 'O';
            }
        };

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
            $('#' + box + ' p').text(nextTurn);
            
            changeTurn();
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
        
        console.log( "stateParams ----------------------------" + $stateParams);
        var gId = CreateGameCmd.id;
        var gameId = $stateParams.gameId;

        var req = {
            method: 'POST',
            url: '/api/createGame',
            data: CreateGameCmd,
        };


        $http(req)
        .success(function(data) {
            gameFactory.setUserName(data[0].user.userName);
            gameFactory.setGameName(data[0].name);
            $state.go('game', { 'gameId': gId });
            console.log(data);      
        })
        .error(function(data) {
            console.log(data);          
        });
    };
});

