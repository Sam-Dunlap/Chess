class Piece {
  constructor(color, type, file, rank) {
    this.color = color;
    this.type = type;
    this.rank = rank;
    this.file = file;
    this.square = file + rank.toString();
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
              break;
          case 'n' :
              this.name += ' Knight';
              break;
          case 'b' :
              this.name += ' Bishop';
              break;
          case 'q' :
              this.name += ' Queen';
              break;
          case 'k' :
              this.name += ' King';
              break;
          case 'p' :
              this.name += ' Pawn';
              break;
          default:
              break;
      }

  }
  initialize() {
    this.div = document.createElement('div');
    this.img = document.createElement('img');
    this.div.classList.add('piece');
    this.img.draggable = false;
    this.img.classList.add('pieceImg');
    this.img.style.position = "absolute";
    this.img.src = `Assets/Chess_${this.type}${this.color}t60.png`;
    this.div.appendChild(this.img);
  }

  update() {
    this.square = this.file + this.rank.toString();
  }

  captured(piece) {
    if (this.square === piece.square && this.color != piece.color){
      piece.div.remove();
    }
  }
}
