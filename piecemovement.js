let element;
let startX;
let startY;
let deltaX;
let deltaY;
let bbox;
let divParentPiece;

playBoard.addEventListener('pointerdown', userPressed, {passive: true});



function userPressed(event) {
    element = event.target;
    if (element.classList.contains('piece')) {
      divParentPiece = pieces.find(piece => piece.div == element);
        startX = event.clientX;
        startY = event.clientY;
        bbox = element.getBoundingClientRect();
        playBoard.addEventListener('pointermove', userMoved, {passive: true});
        playBoard.addEventListener('pointerup', userReleased, {passive: true});
        console.log("i've been pressed!");
    }
}

function userMoved(event) {
    deltaX = event.clientX - startX;
    deltaY = event.clientY - startY;
    element.style.left = bbox.left - 300 + deltaX + 'px';
    element.style.top = bbox.top - 100 + deltaY + 'px';
    console.log('moving');
}

function userReleased(event) {
    let snapX = (event.clientX - 300) - event.clientX % 60;
    let snapY = (event.clientY - 120) - event.clientY %60
    element.style.left = `${snapX}px`;
    element.style.top = `${snapY}px`;
    divParentPiece.file = files[snapX / 60];
    divParentPiece.rank = ranks[7 - snapY / 60];
    divParentPiece.update() 
    playBoard.removeEventListener('pointermove', userMoved);
    playBoard.removeEventListener('pointerup', userReleased);
}