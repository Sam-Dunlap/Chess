let element;
let startX;
let startY;
let deltaX;
let deltaY;
let bbox;
let divParentPiece;
let whosePly = false;

playBoard.addEventListener('pointerdown', userPressed, {passive: true});



function userPressed(event) {
  let toPlay;
  if (whosePly){
    toPlay = 'd';
  } else {
    toPlay = 'l';
  }
    element = event.target;
    divParentPiece = pieces.find(piece => piece.div == element);
    if (element.classList.contains('piece') && divParentPiece.color === toPlay) {
      divParentPiece.legalMoves();
      startX = event.clientX;
      startY = event.clientY;
      bbox = element.getBoundingClientRect();
      playBoard.addEventListener('pointermove', userMoved, {passive: true});
      playBoard.addEventListener('pointerup', userReleased, {passive: true});
    }
}

function userMoved(event) {
    deltaX = event.clientX - startX;
    deltaY = event.clientY - startY;
    element.style.left = bbox.left - 300 + deltaX + 'px';
    element.style.top = bbox.top - 100 + deltaY + 'px';
}

function userReleased(event) {
  let snapX = (event.clientX - 300) - event.clientX % 60;
  let snapY = (event.clientY - 120) - event.clientY % 60;
  let isLegal = divParentPiece.checkMove(snapX, snapY);
  whosePly = makeMove(isLegal);
    //makeMove() will check if legal move. If so, whosePly flips, otherwise it does not. must return bool
  playBoard.removeEventListener('pointermove', userMoved);
  playBoard.removeEventListener('pointerup', userReleased);
}