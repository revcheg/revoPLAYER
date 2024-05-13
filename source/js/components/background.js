// Background
const background = document.querySelector('.background');
const backgroundVideo = background.querySelector('.background__video');
const backgroundContext = backgroundVideo.getContext('2d');

function renderBackground() {
  if (backgroundFlag) {
    backgroundContext.drawImage(VIDEO, 0, 0, backgroundVideo.width, backgroundVideo.height);
    setTimeout(renderBackground, 1000 / 30);
  }
}

VIDEO.addEventListener('play', renderBackground);
