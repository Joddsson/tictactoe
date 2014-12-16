/* jshint ignore:start */
'use strict';

var app     = angular.module('tictactoeApp');
app.controller('PlayCtrl', function ($rootScope, $scope, $http, $stateParams, gameFactory, $state, $location) {
    var nextTurn                    = 'X';
    $scope.grid, $scope.joinForm    = false; 
    $scope.joinUrl                  = $location.host() + ':' + $location.port() + '/join/' + $stateParams.gameId;

    socket.on('Incoming connection', function(u){
        console.log("user: " + u);
    });

    socket.on('gameWon', function(winSymbol){
        $('.winner').append(winSymbol);
    });

    socket.on('opponentFound', function(){
        console.log('in show grid');
        $('.grid').show();
        $scope.grid = true;
        console.log("after grid");
        $scope.$apply();
    });

    var changeTurn = function (){
        if(nextTurn === 'X'){
            nextTurn = 'O';
        }
        else{
            nextTurn = 'X';
        }
    };

    if($location.path() === ('/join/' + $stateParams.gameId)){
        $scope.joinForm = true;
    }
    if($location.path() === ('/play/' + $stateParams.gameId)){
        $scope.grid = true;
    }

    $scope.joinGame = function(){
        $state.go('play', { gameId: $state.params.gameId });
        socket.emit('opponentFound');
        $scope.grid = true;
    }

    $scope.sum = function(box, coords){
        var MakeMoveCmd = 
        {
            cmd: 'MakeMove',
            user: $scope.userName,
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
            //console.log(data[0].user);
            gameFactory.setUserName(data[0].user);
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

