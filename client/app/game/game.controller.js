'use strict';

var app     = angular.module('tictactoeApp');
app.controller('GameCtrl', function ($scope, $http, $stateParams, gameFactory, $state) {
    var nextTurn = 'X';
    var currentSymbol = 'X';
    $scope.identifier = Math.floor((Math.random() * 10000) + 1);

    var changeTurn = function (){
        console.log(nextTurn);
        if(nextTurn === 'X'){
            nextTurn        = 'O';
            currentSymbol   = 'X';
        }
        else{
            nextTurn        = 'X';
            currentSymbol   = 'O';
        }
    };

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
        /* jshint ignore:start */
        socket.emit('moveMade', box);
        /* jshint ignore:end */

        $http.post('/api/makeMove', MakeMoveCmd)
        .success(function(data) {
            console.log(data);
        })
        .error(function(data){
            console.log(data);
        });
    };
    /* jshint ignore:start */
    socket.on('moveMade', function(co){
        $('#' + co + ' p').text(nextTurn);
    /* jshint ignore:end */
        changeTurn();
    /* jshint ignore:start */
    });
    /* jshint ignore:end */

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

