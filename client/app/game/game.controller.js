'use strict';

var app     = angular.module('tictactoeApp');

app.controller('GameCtrl', function ($scope, $http) {
    var nextTurn = 'X';

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
});

