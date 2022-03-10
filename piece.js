class Piece {
  constructor(color, type, file, rank) {
    this.color = color;
    this.type = type;
    this.rank = rank;
    this.file = file;
    this.squareIndex = squares.findIndex(el => {
      if (this.rank == el.rank && this.file == el.file) {
        return true;
      };
    });
    this.square = squares[this.squareIndex];
      switch (color) {
          case 'l' :
              this.name = 'White';
              break;
          case 'd' :
              this.name = 'Black';
              break;
      }
      switch (type) {
          case 'r':
              this.name += ' Rook';
              this.hasMoved = false;
              this.slider = true;
              break;
          case 'n' :
              this.name += ' Knight';
              this.slider = false;
              this.moves = [-2, 2, -16, 16]
              break;
          case 'b' :
              this.name += ' Bishop';
              this.slider = true;
              break;
          case 'q' :
              this.name += ' Queen';
              this.slider = true;
              break;
          case 'k' :
              this.name += ' King';
              this.hasMoved = false;
              this.slider = false;
              break;
          case 'p' :
              this.name += ' Pawn';
              this.hasMoved = false;
              this.slider = false;
              break;
          default:
              break;
      }

  }
  show() {
    this.div = document.createElement('div');
    this.img = document.createElement('img');
    this.div.classList.add('piece');
    this.img.draggable = false;
    this.img.classList.add('pieceImg');
    this.img.style.position = "absolute";
    this.img.src = `Assets/Chess_${this.type}${this.color}t60.png`;
    this.div.appendChild(this.img);
  }

  update(newSquare) {
    this.div.style.top = newSquare.div.style.top;
    this.div.style.left = newSquare.div.style.left;
    this.square = newSquare;
    this.file = this.square.file;
    this.rank = this.square.rank;
    let captured = pieces.find(piece => {
      if (piece.square == this.square && this != piece) {
        return true;
      }
    })
    if (captured) {
      captured.div.remove();
      let capIndex = pieces.indexOf(captured);
      pieces.splice(capIndex, 1)
    }
    squares.forEach(square => square.reset());
    
    this.hasMoved = true;
    totalPly += 1;
    totalTurns = Math.ceil(totalPly / 2);
  }


  checkMove(x, y) {
    let legalBool;
    let newFile = x / 60;
    let newRank = 7 - y / 60;
    let newSquare = squares.find(square => {
      if (square.rank == newRank && square.file == newFile) {
        return true;
      }
    });
    let legalMove = this.legalMoves();
    legalBool = legalMove.includes(newSquare);
    if (!legalBool) {
      //it moved to an illegal square
      this.div.style.top = this.square.div.style.top;
      this.div.style.left = this.square.div.style.left;
      squares.forEach(square => square.reset());
      return false;
    } else {
      this.update(newSquare);
      return true;
    }
  }
  slidingMoves() {
    let SDI;
    let EDI;
    switch (this.type) {
      case 'b':
        SDI = 4;
        EDI = 8;
        break;
      case 'r':
        SDI = 0;
        EDI = 4;
        break;
      case 'q':
        SDI = 0;
        EDI = 8;
    }
    let slides = [];
    for (let directionIndex = SDI; directionIndex < EDI; directionIndex++) {
      for (let n = 0; n < this.square.distances[directionIndex]; n++) {
        let targetSquare = squares[this.square.index + directions[directionIndex] * (n + 1)];
        if (targetSquare.full && targetSquare.occupiedBy.color == this.color) {
          break;
        }
        slides.push(targetSquare);
        if (targetSquare.full && targetSquare.occupiedBy.color != this.color) {
          break;
        }
      }
    }
    return slides;
  }
  legalMoves() {
    let moves = [];
    if (this.slider) {
      moves = this.slidingMoves();
    } else if (this.type == 'k') {
      for (let directionIndex = 0; directionIndex < 8; directionIndex++) {
        let targetSquare = squares[this.square.index + directions[directionIndex]];
        if (targetSquare) {
          if (!targetSquare.full) {
            moves.push(targetSquare);
          } else if (targetSquare.full && targetSquare.occupiedBy.color != this.color) {
            moves.push(targetSquare);
          }
        }
      }
    } else if (this.type == 'n') {
      moves = squares.filter(square => {
        if (square.file == this.file - 2 && square.rank == this.rank + 1) {
          return true;
        } else if (square.file == this.file - 2 && square.rank == this.rank - 1) {
          return true;
        } else if (square.file == this.file + 2 && square.rank == this.rank + 1) {
          return true;
        } else if (square.file == this.file + 2 && square.rank == this.rank - 1) {
          return true;
        } else if (square.file == this.file - 1 && square.rank == this.rank - 2) {
          return true;
        } else if (square.file == this.file - 1 && square.rank == this.rank + 2) {
          return true;
        } else if (square.file == this.file + 1 && square.rank == this.rank + 2) {
          return true;
        } else if (square.file == this.file + 1 && square.rank == this.rank - 2) {
          return true;
        } else {return false}
      })
      moves = moves.filter(square => {
        if (square.full && square.occupiedBy.color == this.color) {
          return false;
        } else {return true}
      })
    } else if (this.type =='p') {
      if (this.color == 'l') {
        moves = squares.filter(square => {
          if (!this.hasMoved) {
            if (square.index == this.square.index + 16) {
              if (square.full) {
                return false;
              } else if (squares[this.square.index + 8].full) {
                return false;
              } else {
                return true;
              }
            }
          }
          if (square.index == this.square.index + 8) {
            if (square.full) {
              return false;
            } else {
              return true;
            }
          }
          if (square.rank == this.square.rank + 1) {
            if (square.file == this.square.file + 1 || square.file == this.square.file - 1) {
              if (square.full && square.occupiedBy.color != this.color) {
                return true;
              } else {
                return false;
              }
            }
          }
        })
      } else {
        moves = squares.filter(square => {
          if (!this.hasMoved) {
            if (square.index == this.square.index - 16) {
              if (square.full) {
                return false;
              } else if (squares[this.square.index - 8].full) {
                return false;
              } else {
                return true;
              }
            }
          }
          if (square.index == this.square.index - 8) {
            if (square.full) {
              return false;
            } else {
              return true;
            }
          }
          if (square.rank == this.square.rank - 1) {
            if (square.file == this.square.file + 1 || square.file == this.square.file - 1) {
              if (square.full && square.occupiedBy.color != this.color) {
                return true;
              } else {
                return false;
              }
            }
          }
        })
      }
    }
    moves.forEach(square => {square.lightUp()})
    return moves;
  }
}
