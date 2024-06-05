// Video
let isVideoPlaying = false;

let currentVideoPassed;
let currentVideoLeft;

function updateProgress() {
  // CurrentTime
  videoCurrentTime = VIDEO.currentTime;
  VIDEO_RANGE.value = videoCurrentTime;

  // Duration
  currentVideoPassed = formatTime(videoCurrentTime);
  currentVideoLeft = formatTime(videoDuration - videoCurrentTime);
  videoPassed.innerText = currentVideoPassed;
  videoLeft.innerText = currentVideoLeft;

  // Buffer
  videoBuffer = (VIDEO.buffered.length > 0) ? VIDEO.buffered.end(0) - videoCurrentTime : 0;
  statisticBuffer.innerText = Math.floor(videoBuffer);

  updateClientTime();
  updatePayback();
}

VIDEO.addEventListener('timeupdate', updateProgress);

function startProgress() {
  isVideoPlaying = true;
}

function stopProgress() {
  isVideoPlaying = false;
}

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);

// VIDEO STATES
// Loadstart
function loadstartState() {
  stopProgress();
  resetDuration();
  resetSpeed();

  WRAPPER.classList.add('video__wrapper--loadstart');
}

function removeLoadstartState() {
  WRAPPER.classList.remove('video__wrapper--loadstart');
}

VIDEO.addEventListener('loadstart', loadstartState);
VIDEO.addEventListener('loadeddata', removeLoadstartState);

// Loadeddata
function loadeddataState() {
  getStatistic();
}

VIDEO.addEventListener('loadeddata', loadeddataState);

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
