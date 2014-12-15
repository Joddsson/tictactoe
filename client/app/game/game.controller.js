/* jshint ignore:start */
'use strict';

var app     = angular.module('tictactoeApp');
app.controller('GameCtrl', function ($scope, $http, $stateParams, gameFactory, $state) {
    var nextTurn = 'X';
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

    $scope.identifier = guid();
    var changeTurn = function (){
        if(nextTurn === 'X'){
            nextTurn        = 'O';
        }
        else{
            nextTurn        = 'X';
        }
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
    
    $scope.sum = function(box, coords){
        var MakeMoveCmd = 
        {
            cmd: 'MakeMove',
            user: 'userName',
            name: 'The first game',
            timeStamp: '2014-12-02T11:29:29',
            move: {
                coordinates: coords,
                symbol: nextTurn
            } 
        };
        
        socket.emit('moveMade', box);

        $http.post('/api/makeMove', MakeMoveCmd)
        .success(function(data) {
            //console.log(data);
            for (var i = 0; i < data.length; i++) {
                if(data[i].event === 'GameWon'){
                    socket.emit('gameWon', data[i].move.symbol);
                }
                console.log(data[i]);
            }
        })
        .error(function(data){
            console.log(data);
        });
    };

    socket.on('moveMade', function(co){
        if($('#' + co + ' p').text() === ''){
            $('#' + co + ' p').text(nextTurn);
        }
        changeTurn();
    });
});
/* jshint ignore:end */

