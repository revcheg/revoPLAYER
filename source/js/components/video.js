// Video
let progressInterval;
let playbackQuality;
let currentVideoPassed;
let currentVideoLeft;
let isVideoPlaying = false;

function startProgress() {
  progressInterval = setTimeout(updateProgress, 1000);
  isVideoPlaying = true;
}

function updateProgress() {
  // Buffer
  videoBuffer = Math.round(VIDEO.buffered.end(0));
  statisticsBuffer.innerHTML = videoBuffer;

  videoCurrentTime = Math.round(VIDEO.currentTime);
  VIDEO_RANGE.value = videoCurrentTime;

  // Duration
  currentVideoPassed = formatTime(videoCurrentTime);
  currentVideoLeft = formatTime(videoDuration - videoCurrentTime);
  videoPassed.innerHTML = currentVideoPassed;
  videoLeft.innerHTML = currentVideoLeft;

  startProgress();
  getTime();
  getEndTime();
  extraLine();
}

function stopProgress() {
  clearTimeout(progressInterval);
  isVideoPlaying = false;
}

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);

// Video handler
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
VIDEO.addEventListener('loadeddata', removeErrorVideo);

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
