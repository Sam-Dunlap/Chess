const playBoard = document.getElementById('boardDiv');
const squares = [];
const directions = [-8, -1, 8, 1, -7, -9, 7, 9]
const startingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const files = ['a','b','c','d','e','f','g','h'];
const ranks = [1,2,3,4,5,6,7,8];
const pieces = [];
let userFEN;
let darkSquareColor = 'brown';
let lightSquareColor = 'white';


function drawBoard() {
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
            let y = 480 - (i+1)*60 + 'px';
            let x = j*60 + 'px';
            let currentSquare = new Square(x, y, j, i);
            if (i % 2 === j % 2){
                currentSquare.div.style.backgroundColor = darkSquareColor;
                currentSquare.defaultColor = 'dark';
            } else {
                currentSquare.div.style.backgroundColor = lightSquareColor;
                currentSquare.defaultColor = 'light';
            }
            currentSquare.distToEdge();
            squares.push(currentSquare);
            currentSquare.index = squares.length - 1;
        }
    }
    let fen = userFEN? userFEN : startingFEN;
    setFromFEN(fen);
}

function setFromFEN(fen) {
    let rank = 7;
    let file = 0;
    let color;
    let chars = fen.split('');
    chars.forEach(symbol => {
        if (symbol == '/') {
            file = 0;
            rank--;
        } else if (Number.parseInt(symbol)) {
            file += Number.parseInt(symbol);
        } else {
            symbol == symbol.toLowerCase() ? color = 'd' : color = 'l';
            let currentPiece = new Piece(color, symbol.toLowerCase(), file, rank);
            currentPiece.show();
            playBoard.append(currentPiece.div);
            currentPiece.div.style.left = `${file*60}px`;
            currentPiece.div.style.top = `${420 - (rank * 60)}px`
            currentPiece.div.classList.add("piece");
            pieces.push(currentPiece);
            file++;
        }
    });
    squares.forEach(square => square.reset());
}

