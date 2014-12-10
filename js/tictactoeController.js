angular
	.module("tictactoeApp")
	.controller('TicTacToeController', TicTacToeControllerFunc);

// $inject adds the parameter gameboard.js function
TicTacToeControllerFunc.$inject = ['GameBoard']; 

// Have to add the parameter to the controllerfunc
function TicTacToeControllerFunc(GameBoard){
	this.gameName = "Tic-Tac-Toe";

	this.activeBoard = new GameBoard(9);
}