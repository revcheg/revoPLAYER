// Background
function playBackgroundVideo() {
  backgroundVideo.play();
}

function pauseBackgroundVideo() {
  backgroundVideo.pause();
}

// function updateBackgroundVideo() {
//   backgroundVideo.currentTime = videoCurrentTime;
// }

VIDEO.addEventListener('play', playBackgroundVideo);
VIDEO.addEventListener('pause', pauseBackgroundVideo);
// VIDEO.addEventListener('timeupdate', updateBackgroundVideo);
