angular
  .module('tttApp')
  .controller('tttController', tttCtrlFunc);

function tttCtrlFunc($firebase) {
  var self = this;
  var ref = new Firebase("https://thefiringsquad.firebaseio.com/game");
  self.sync = $firebase(ref).$asObject();
  // Saving the FB db as an Object
  self.sync.tiles =['','','','','','','','',''];
  // Creating 9 tiles and setting each tile value to 1
  self.sync.play = true;
  // Setting the initial value of the game to true, important check throughout the game
  self.sync.turnCount = 0;
  // Counter of player moves
  self.sync.player1Name = '';
  // Placeholder for Player 1's name
  self.sync.player2Name = '';
  // Placeholder for Player 2's name
  self.sync.gameName = "Tic Tac Toe";
  // Setting the game name
  self.sync.$save();

  self.playerTurn = function(i) {
    if (self.sync.play) {
      // Assumes that self.sync.play is set to true
      if (self.sync.turnCount % 2 == 0 ) {
        self.sync.tiles[i] = 'X';
        // Saves Player 1's value of X
        self.sync.turnCount++;
        //Increases the turncount by one with each pass
        self.sync.$save();
      } 
      else if (self.sync.turnCount % 2 == 1) {
        self.sync.tiles[i] = 'O';
        // Saves Player 2's value of O
        self.sync.turnCount++;
        self.sync.$save();
      }
       checkWin(); // on ng-click checks for a winner
    }
  };

  function checkWin() {
    var squares = self.sync.tiles;
    // Setting the tiles saved in FB to a local variable

    var winners = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    // Listing all of the winning tile combinations
    // 0 |  1  |  2
    // -------------
    // 3 |  4  |  5
    // -------------
    // 6 |  7  |  8

    for (var i = 0; i< winners.length; i++) {
      // Comparision of tiles to the winning combos for Player 1
      if ((squares[winners[i][0]] == 'X' && squares[winners[i][1]] == 'X' && squares[winners[i][2]] == 'X')) {
        self.sync.play = false;
        // Sets the play variable from true to false as the game is over
        self.sync.$save();
        alert("Player 1 Wins!");
      } // Comparision for Player 2
      else if ((squares[winners[i][0]] == 'O' && squares[winners[i][1]] == 'O' && squares[winners[i][2]] == 'O')) {
        self.sync.play = false;
        // Sets the play variable from true to false as the game is over        
        self.sync.$save();
        alert("Player 2 Wins!");
        }
    }
    if (self.sync.play && self.sync.turnCount == 9) {
        self.sync.play = false;
        self.sync.$save();
        alert("Cat's Game!");
    }
  };
}