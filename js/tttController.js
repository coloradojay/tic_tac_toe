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

  var checkPlayer;
  // Creating a player check variable, has to be set outside of the playerTurn function

  self.playerTurn = function(i) {
    if (self.sync.play) {
      // Assumes that self.sync.play is set to true
      if (self.sync.turnCount % 2 == 0 && self.sync.tiles[i] === '' && checkPlayer != 'O')
        // If the tile is empty and the checkPlayer value is not O, then X can set a piece on the board
       {
        checkPlayer = 'X';
        self.sync.tiles[i] = checkPlayer;
        // Sets Player 1's game piece to X
        self.sync.turnCount++;
        //Increases the turncount by one with each pass
        self.sync.$save();
      } 
      else if (self.sync.turnCount % 2 == 1 && self.sync.tiles[i] === '' && checkPlayer != 'X') {
        // If the tile is empty and the checkPlayer value is not O, then X can set a piece on the board
        checkPlayer = 'O';
        self.sync.tiles[i] = checkPlayer;
        // Sets Player 2's game piece to O
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
    } // Cat's Game Logic
    if (self.sync.play && self.sync.turnCount == 9) {
      // Checks to see if the play variable is set to true and the turn count is 9
        self.sync.play = false;
        // Changes the play variable to false, stopping the game
        self.sync.$save();
        alert("Cat's Game!");
    }
  };
  self.clearBoard = function() {
    // Reset's the FB object items back to their original state
    self.sync.tiles =['','','','','','','','',''];
    self.sync.play = true;
    self.sync.turnCount = 0;
    self.sync.$save();
  }
}