'use strict';

var app = angular.module('tictactoeApp');

app.controller('GameCtrl', function ($scope, $http, gameFactory) {
    var nextTurn = "X";
    $scope.sum = function(box, coords){
    console.log($scope.userName);
        var currentSymbol = "X"
        if($("#" + box + " p").html() === ""){
            $("#" + box + " p").text(nextTurn);
            
            changeTurn();
        }

        function changeTurn(){
            if(nextTurn === "X"){
                nextTurn        = "O";
                currentSymbol   = "X";
            }
            else{
                nextTurn        = "X";
                currentSymbol   = "O"
            }
        }

        var MakeMoveCmd = 
        {
            cmd: "MakeMove",
            user: "userName",
            name: "The first game",
            timeStamp: "2014-12-02T11:29:29",
            move: {
                coordinates: coords,
                symbol: currentSymbol
            } 
        }


        $http.post('http://localhost:9000/api/makeMove', MakeMoveCmd).
            success(function(data, status, headers, config) {
                console.log(data);
            });  
    }
});

