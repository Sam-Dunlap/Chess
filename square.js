class Square {
  constructor(x, y, file, rank) {
    this.div = document.createElement('div');
  //  this.humanFile = files[file];
  //  this.humanRank = ranks[rank];
  // this.name = this.humanFile + this.humanRank.toString();
    this.file = file;
    this.rank = rank;
    this.div.style.top = y;
    this.div.style.left = x;
    this.div.classList.add('square');
    document.getElementById('boardDiv').appendChild(this.div);
  }
  lightUp() {
    this.div.style.backgroundColor = 'blue';
  }
  reset() {
    if (this.defaultColor == 'dark') {
      this.div.style.backgroundColor = darkSquareColor;
    } else {
      this.div.style.backgroundColor = lightSquareColor;
    }
    this.updateOccupied();
  }
  distToEdge() {
    let toLeftEdge = this.file;
    let toRightEdge = 7 - this.file;
    let toTopEdge = 7 - this.rank;
    let toBottomEdge = this.rank;
    let NW = Math.min(toTopEdge, toLeftEdge);
    let NE = Math.min(toTopEdge, toRightEdge);
    let SW = Math.min(toBottomEdge, toLeftEdge);
    let SE = Math.min(toBottomEdge, toRightEdge);
    this.distances = [
      toBottomEdge,
      toLeftEdge,
      toTopEdge,
      toRightEdge,
      SE,
      SW,
      NW,
      NE
    ]
  }
  updateOccupied() {
    let newPiece = pieces.find(piece => {
      if (this == piece.square) {
        return true;
      }
    })
    if (newPiece) {
      this.full = true;
      this.occupiedBy = newPiece;
    } else {
      this.full = false;
      this.occupiedBy = null;
    }
    
    
  }
}