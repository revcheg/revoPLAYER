// Background
const background = document.querySelector('.background');
const backgroundVideo = document.querySelector('.background__video');

function setupBackground() {
  if (backgroundFlag) {
    backgroundVideo.src = currentVideo.src;
    backgroundVideo.currentTime = videoCurrentTime;

    if (VIDEO.play) {
      playBackgroundVideo();
    }
  }
}

function playBackgroundVideo() {
  backgroundVideo.play();
}

function pauseBackgroundVideo() {
  backgroundVideo.pause();
}

VIDEO.addEventListener('loadeddata', setupBackground);
VIDEO.addEventListener('play', playBackgroundVideo);
VIDEO.addEventListener('pause', pauseBackgroundVideo);
