angular
  .module('tttApp')
  .controller('tttController', tttCtrlFunc);

function tttCtrlFunc($firebase) {

  var self = this;

  var ref = new Firebase("https://thelounge.firebaseio.com/game");
  self.sync = $firebase(ref).$asObject();

  self.sync.name="name";
  self.sync.turnCount = 0;
  self.sync.$save();
  //anything to be saved to firebase needs to have it's name modified to self.sync.<name>
  self.player1 = "";
  self.player2 = "";
  self.gameBoard = ['','','','','','','','',''];

  self.playerTurn = playerTurn;

  function playerTurn($index){
    console.log(self.sync.turnCount);
    if (self.gameBoard[$index] === ''){
      // If the game board space is empty, ok to play the game
      if (self.sync.turnCount % 2 === 0){
        self.gameBoard[$index] = 'X';
        // track p1's position on the board and save X to the array
      }
      else {
        self.gameBoard[$index] = 'O';
        // track p2's position on the board and save X to the array
      }
        self.sync.turnCount++;
        // increase the turnCount by 1
    }
    else { 
      alert("That space is taken");
      //If the gameboard space is taken, alert the player that the space is taken
    }    
  }

  //game logic
  // if turnCount = 9, game is over and clear the gameBoard array
  // if player has 3 in a row, then alert a message saying he won
  function gameLogic(){
    if (turnCount === 9){
      alert("Cat's Game");
    }
  }

}