// false is white, true is black


function makeMove() {
  pieces.forEach(piece => {
    if (divParentPiece.square == piece.square && divParentPiece.color != piece.color) {
      divParentPiece.captured(piece);
    } else if (divParentPiece.square == piece.square && divParentPiece.color == piece.color && divParentPiece != piece) {
      divParentPiece.cancel();
    }
  });
  if (divParentPiece.prevSquare == divParentPiece.square) {
    divParentPiece.cancel();
  }
  //if whosePly, only black pieces can be moved
  //check: is the landing square empty or occupied by enemy?
  //is the path clear?
  //is it moving into check?
  //did the piece actually move?
return !whosePly;
}