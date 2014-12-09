angular
	.module('ticTacToeApp')
	.controller('TicTacToeController', TTTControllerFunc);

function TTTControllerFunc() {
 	this.gameBoard = [
 		{owner: null},
 		{owner: null},
 		{owner: null},
 		{owner: null},
 		{owner: null},
 		{owner: null},
 		{owner: null},
 		{owner: null},
 		{owner: null},
 	];



}