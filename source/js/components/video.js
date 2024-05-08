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
}

function stopProgress() {
  clearInterval(progressInterval);
  isVideoPlaying = false;
}

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);

// Video state
// Start
function loadstartState() {
  setPlayIcon();
  stopProgress();
  resetDuration();
  resetSpeed();
  updateActiveButton();

  WRAPPER.classList.add('video__wrapper--loadstart');
}

function removeLoadstartState() {
  WRAPPER.classList.remove('video__wrapper--loadstart');
}

VIDEO.addEventListener('loadstart', loadstartState);
VIDEO.addEventListener('loadeddata', removeLoadstartState);

// Pause
function pauseState() {
  WRAPPER.classList.add('video__wrapper--pause');
}

function removePauseState() {
  WRAPPER.classList.remove('video__wrapper--pause');
}

VIDEO.addEventListener('pause', pauseState);
VIDEO.addEventListener('playing', removePauseState);

// Waiting
function waitingState() {
  WRAPPER.classList.add('video__wrapper--waiting');
}

function removeWaitingState() {
  WRAPPER.classList.remove('video__wrapper--waiting');
}

VIDEO.addEventListener('waiting', waitingState);
VIDEO.addEventListener('playing', removeWaitingState);

// Error
function errorState() {
  WRAPPER.classList.add('video__wrapper--error');
  showMessage('Помилка відео &#128528;');
  isVideoPlaying = false;
  resetVideo();
}

function removeErrorState() {
  WRAPPER.classList.remove('video__wrapper--error');
}

VIDEO.addEventListener('error', errorState);
VIDEO.addEventListener('canplay', removeErrorState);
