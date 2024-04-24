// Video
let progressInterval;
let currentVideoPassed;
let currentVideoLeft;
let isVideoPlaying = false;

function startProgress() {
  isVideoPlaying = true;
  progressInterval = setInterval(updateProgress, 1000);
  updateProgress();
}

function updateProgress() {
  // Buffer
  videoBuffer = Math.floor(VIDEO.buffered.end(0)) - videoCurrentTime;
  statisticBuffer.innerText = videoBuffer;

  videoCurrentTime = Math.floor(VIDEO.currentTime);
  VIDEO_RANGE.value = videoCurrentTime;

  // Duration
  currentVideoPassed = formatTime(videoCurrentTime);
  currentVideoLeft = formatTime(videoDuration - videoCurrentTime);
  videoPassed.innerText = currentVideoPassed;
  videoLeft.innerText = currentVideoLeft;

  getTime();
  getEndTime();
  setPaybackProgress();
}

function stopProgress() {
  clearInterval(progressInterval);
  isVideoPlaying = false;
}

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);

// Video handler
// Pause
function pauseAnimation() {
  WRAPPER.classList.add('video__wrapper--pause');
}

function removePauseAnimation() {
  WRAPPER.classList.remove('video__wrapper--pause');
}

VIDEO.addEventListener('pause', pauseAnimation);
VIDEO.addEventListener('playing', removePauseAnimation);
VIDEO.addEventListener('ended', removePauseAnimation);

// Waiting
function waitingVideo() {
  WRAPPER.classList.remove('video__wrapper--pause');
  WRAPPER.classList.add('video__wrapper--waiting');
}

function playingVideo() {
  WRAPPER.classList.remove('video__wrapper--waiting');
}

VIDEO.addEventListener('waiting', waitingVideo);
VIDEO.addEventListener('playing', playingVideo);

// Error
function errorVideo() {
  WRAPPER.classList.add('video__wrapper--error');
  showMessage('Помилка відео &#128528;');
  isVideoPlaying = false;
  resetVideo();
}

function removeErrorVideo() {
  WRAPPER.classList.remove('video__wrapper--error');
}

VIDEO.addEventListener('error', errorVideo);
VIDEO.addEventListener('canplay', removeErrorVideo);
