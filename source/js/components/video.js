// Video
let progressInterval;
let playbackQuality;

function startProgress() {
  progressInterval = setTimeout(updateProgress, 1000);
}

function updateProgress() {
  // Buffer
  videoBuffer = Math.round(VIDEO.buffered.end(0));
  videoCurrentTime = VIDEO.currentTime;
  VIDEORANGE.value = videoCurrentTime;
  statisticsBuffer.innerHTML = videoBuffer;

  // Duration
  let currentVideoPassed = formatTime(videoCurrentTime); 
  let currentVideoLeft = formatTime(videoDuration - videoCurrentTime); 
  videoPassed.innerHTML = currentVideoPassed; 
  videoLeft.innerHTML = currentVideoLeft; 

  startProgress();
  stayFocus();
  getTime();
  getEndTime();
  extraLine();
}

function stopProgress() {
  clearTimeout(progressInterval);
}

function stayFocus() {
  VIDEO.addEventListener('blur', function () {
    if (VIDEO.paused) {
      VIDEO.blur();
    } else {
      VIDEO.focus();
    }
  });
}

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);

// Duration
const videoPassed = CONTROLS.querySelector('.control__time--passed');
const videoLeft = CONTROLS.querySelector('.control__time--left');

function formatTime(timeInSeconds) {
  let hours = Math.floor(timeInSeconds / 3600);
  let minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
  let seconds = Math.floor(timeInSeconds - (hours * 3600) - (minutes * 60));
  
  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  // minutes = minutes < 10 ? '0' + minutes : minutes;
  // seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
}

// Video handler
// Waiting
const waitingStatus = document.querySelector('.video__waiting'); 

function waitingVideo() {
  waitingStatus.classList.remove('video__waiting--hide');
  WRAPPER.classList.add('video__wrapper--waiting');
}

function playingVideo() {
  waitingStatus.classList.add('video__waiting--hide');
  WRAPPER.classList.remove('video__wrapper--waiting');
}

VIDEO.addEventListener('waiting', waitingVideo);
VIDEO.addEventListener('playing', playingVideo);

// Error
function errorVideo() {
  WRAPPER.classList.add('video__wrapper--error');
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
