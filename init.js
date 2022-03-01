const playBoard = document.getElementById('boardDiv');
const squares = [];
const startingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const files = ['a','b','c','d','e','f','g','h'];
const ranks = [1,2,3,4,5,6,7,8];
const pieces = [];

let userFEN;



function drawBoard() {
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
            let currentSquare = document.createElement('div')
            currentSquare.style.zIndex = 0;
            currentSquare.style.position = 'absolute';
            currentSquare.style.height = 60 + 'px';
            currentSquare.style.width = 60 + 'px';
            currentSquare.style.top = 480 - (i+1)*60 + 'px';
            currentSquare.style.left = j*60 + 'px';
            currentSquare.id = `${files[j]}${ranks[i]}`;
            currentSquare.classList.add('square');
            document.getElementById('boardDiv').appendChild(currentSquare);
            if (i % 2 === j % 2){
                currentSquare.style.backgroundColor = 'brown';
            } else { currentSquare.style.backgroundColor = 'white';}
            squares.push(currentSquare);
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
            let currentPiece = new Piece(color, symbol.toLowerCase(), files[file], ranks[rank]);
            currentPiece.initialize();
            playBoard.append(currentPiece.div);
            currentPiece.div.style.left = `${file*60}px`;
            currentPiece.div.style.top = `${420 - (rank * 60)}px`
            currentPiece.div.classList.add("piece");
            pieces.push(currentPiece);
            file++;
        }
    });
}

