angular
  .module('tttApp')
  .controller('tttController', tttCtrlFunc);

function tttCtrlFunc($firebase) {

  var self = this;

  var ref = new Firebase("https://thelounge.firebaseio.com/");
  var sync = $firebase(ref);

  self.player1 = "";
  self.player2 = "";
  self.playerTurn = playerTurn;
  self.gameBoard = ['','','','','','','','',''];
  self.turnCount = 0;

  function playerTurn($index){
    console.log(self.turnCount);
    if (self.gameBoard[$index] === ''){
      //If the gameboard space is taken, the player cannot move into the space
      if (self.turnCount % 2 === 0){
        self.gameBoard[$index] = 'X';
        // track his position on the board and save that to the array
        // show his game piece on the gameBoard
        console.log(self.gameBoard);
        console.log(self.turnCount);

      }else {
        self.gameBoard[$index] = 'O';
        console.log(self.gameBoard);
      }
        self.turnCount++;
        // increase the turnCount by 1
    }else { 
      alert("That space is taken");
    }    
  }

  

}