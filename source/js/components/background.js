// Background
const background = document.querySelector('.background');
const backgroundCanvas = background.querySelector('.background__canvas');
const backgroundContext = backgroundCanvas.getContext('2d');

backgroundCanvas.width = BODY.clientWidth;
backgroundCanvas.height = BODY.clientHeight;

function renderBackground() {
  if (backgroundFlag) {
    backgroundContext.drawImage(VIDEO, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
    setTimeout(renderBackground, 1000 / 30);
  }
}

VIDEO.addEventListener('play', renderBackground);
