// Background
const background = document.querySelector('.background');
const backgroundVideo = document.querySelector('.background__video');

function setupBackground() {
  if (VIDEO.src) {
    backgroundVideo.src = VIDEO.src;
  }

  if (videoCurrentTime) {
    backgroundVideo.currentTime = videoCurrentTime;
  }
}

function playBackgroundVideo() {
  backgroundVideo.play();
}

function pauseBackgroundVideo() {
  backgroundVideo.pause();
}

VIDEO.addEventListener('play', playBackgroundVideo);
VIDEO.addEventListener('pause', pauseBackgroundVideo);
