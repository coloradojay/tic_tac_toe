angular
	.module("tictactoeApp")
	.factory("GameBoard", GameBoardFunc);
// Factory is basically an object creating controller

function GameBoardFunc()
{
	TILE_STATE = ['unselected-tile', 'selected-tile'];

	var GameBoard = function(numTiles) {
		this.numTiles = numTiles;
		this.tiles = new Array(numTiles);
		
		this.toggleTile = toggleTile;
		this.getTileState = getTileState;

		for (var i=0; i<this.tiles.length; i++) {
			this.tiles[i] = 0;
		}

		function toggleTile( num ) {
			this.tiles[num] = (this.tiles[num] + 1) % TILE_STATE.length;
		}

		function getTileState( num ) {
			return TILE_STATE[this.tiles[num]];
		}
	}
	return GameBoard;

}