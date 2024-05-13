// Background
const background = document.querySelector('.background');
const backgroundVideo = document.querySelector('.background__video');

function setupBackground() {
  if (backgroundFlag) {
    backgroundVideo.src = currentVideo.src;
    backgroundVideo.currentTime = videoCurrentTime;

    if (isVideoPlaying) {
      playBackground();
    }
  }
}

function playBackground() {
  backgroundVideo.play();
}

function pauseBackground() {
  backgroundVideo.pause();
}

VIDEO.addEventListener('loadeddata', setupBackground);
VIDEO.addEventListener('play', playBackground);
VIDEO.addEventListener('pause', pauseBackground);
