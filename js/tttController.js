angular
  .module('tttApp')
  .controller('tttController', tttCtrlFunc);

function tttCtrlFunc($firebase) {

  var self = this;

  var ref = new Firebase("https://thelounge.firebaseio.com/game");
  self.sync = $firebase(ref).$asObject();

  self.sync.name="name";
  self.sync.turnCount = 0;
  self.sync.player1 = "";
  self.sync.player2 = "";
  self.sync.$save();
  //anything to be saved to firebase needs to have it's name modified to self.sync.<name>

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
    function gameWin(){
      if (self.sync.turnCount = 9){
        alert("Cat's Game");
      }
    }
 
  }

  //game logic
  // if turnCount = 9, game is over and clear the gameBoard array
  // if player has 3 in a row, then alert a message saying he won
  // function gameLogic(){
  //   if (turnCount === 9){
  //     alert("Cat's Game");
  //   }
  // }
      // var isWinCombo = function(cell1, cell2, cell3, player) {
      //       if (($scope.game.cells[cell1] === player) &&
      //           ($scope.game.cells[cell2] === player) && 
      //           ($scope.game.cells[cell3] === player)) {
      //           return true;
      //       } else {
      //           return false;
      //       }
      //     };
      // var winnerIsX = function() {
      //   return (isWinCombo(0, 1, 2, "X") ||
      //       isWinCombo(3, 4, 5, "X") || 
      //       isWinCombo(6, 7, 8, "X") ||
      //       isWinCombo(0, 3, 6, "X") ||
      //       isWinCombo(1, 4, 7, "X") || 
      //       isWinCombo(2, 5, 8, "X") ||
      //       isWinCombo(0, 4, 8, "X") ||
      //       isWinCombo(2, 4, 6, "X"));
      // };

      // var winnerIsO = function() {
      //   return (isWinCombo(0, 1, 2, "O") ||
      //       isWinCombo(3, 4, 5, "O") || 
      //       isWinCombo(6, 7, 8, "O") ||
      //       isWinCombo(0, 3, 6, "O") ||
      //       isWinCombo(1, 4, 7, "O") || 
      //       isWinCombo(2, 5, 8, "O") ||
      //       isWinCombo(0, 4, 8, "O") ||
      //       isWinCombo(2, 4, 6, "O"));
      // };
}