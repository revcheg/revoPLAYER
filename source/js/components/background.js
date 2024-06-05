// Background
const backgroundElement = document.querySelector('.background');
const backgroundCanvas = backgroundElement.querySelector('.background__canvas');
const backgroundContext = backgroundCanvas.getContext('2d');

const aspectRatio = VIDEO.videoWidth / VIDEO.videoHeight;

if (window.innerWidth / window.innerHeight > aspectRatio) {
  backgroundCanvas.width = window.innerHeight * aspectRatio;
  backgroundCanvas.height = window.innerHeight;
} else {
  backgroundCanvas.width = window.innerWidth;
  backgroundCanvas.height = window.innerWidth / aspectRatio;
}

function renderBackground() {
  if (backgroundFlag) {
    backgroundCanvas.width = BODY.clientWidth;
    backgroundCanvas.height = BODY.clientHeight;

    backgroundContext.drawImage(VIDEO, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
    setTimeout(renderBackground, 1000 / 60);
  }
}

VIDEO.addEventListener('play', renderBackground);
