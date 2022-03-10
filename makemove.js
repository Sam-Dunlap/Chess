// false is white, true is black
let totalPly = 0;
let totalTurns;

function makeMove(isLegal) {
  if (isLegal) {
    squares.forEach(square => square.updateOccupied());
    return !whosePly;
  } else {
    return whosePly;
  }
}

function getAttackedSquares(color) {
  let attackedSquares = [];
  pieces.forEach(piece => {
    if (piece.color == color) {
      attackedSquares.splice(attackedSquares.length, 0, piece.legalMoves())
    }
  })
  attackedSquares.flat();
  console.log(JSON.stringify(attackedSquares));
}