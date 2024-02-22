// STATISTICS
let videoWidth;
let videoHeight;
let videoFormat;
let videoDuration;
let videoCurrentTime;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const statisticsName = document.querySelector('.video__name');
const statisticsClientTime = STATISTICS.querySelector('.statistics__time');
const statisticsEndTime = STATISTICS.querySelector('.statistics__end');
const statisticsResolution = STATISTICS.querySelector('.statistics__resolution');
const statisticsUFH = document.querySelector('.header__ufh');
const statisticsFormat = STATISTICS.querySelector('.statistics__format');
const statisticsDuration = STATISTICS.querySelector('.statistics__duration');
const statisticsBuffer = STATISTICS.querySelector('.statistics__buffer');

// function getStatistics() {
//   updateVideoProperties();
//   setStatistics();
// }

// function updateVideoProperties() {
//   videoWidth = VIDEO.videoWidth;
//   videoHeight = VIDEO.videoHeight;
//   videoDuration = Math.round(VIDEO.duration);
//   VIDEO_RANGE.setAttribute('max', videoDuration);

//   if (currentVideo.type) {
//     videoFormat = currentVideo.type.replace('video/', '');
//   } else {
//     videoFormat = VIDEO.src.split('.').pop();
//   }
// }

function getStatistics() {
  statisticsName.classList.remove('video__name--off');

  videoWidth = VIDEO.videoWidth;
  videoHeight = VIDEO.videoHeight;
  videoDuration = Math.round(VIDEO.duration);
  VIDEO_RANGE.setAttribute('max', videoDuration);

  if (currentVideo.type) {
    videoFormat = currentVideo.type.replace('video/', '');
  } else {
    videoFormat = VIDEO.src.split('.').pop();
  }

  setStatistics();
}

function setStatistics() {
  statisticsName.innerHTML = currentVideo.name;

  statisticsResolution.innerHTML = videoWidth + 'x' + videoHeight;
  statisticsFormat.innerHTML = videoFormat;
  statisticsDuration.innerHTML = videoDuration;

  if (videoWidth >= 3840) {
    statisticsUFH.classList.remove('header__ufh--off');
  } else {
    statisticsUFH.classList.add('header__ufh--off');
  }
}

function updateBuffered() {
  if (VIDEO.buffered.length > 0) {
    videoBuffer = Math.floor(VIDEO.buffered.end(0));
    statisticsBuffer.innerHTML = videoBuffer;
  }
}

function updateCurrentTime() {
  videoCurrentTime = Math.floor(VIDEO.currentTime);
}

VIDEO.addEventListener('timeupdate', updateCurrentTime);
VIDEO.addEventListener('progress', updateBuffered);

// Time
function getTime() {
  const clientDate = new Date();
  const clientHours = clientDate.getHours();
  const clientMinutes = clientDate.getMinutes();
  statisticsClientTime.innerHTML = clientHours + ':' + clientMinutes;
}

function getEndTime() {
  const futureDate = new Date();
  futureDate.setSeconds(futureDate.getSeconds() + videoDuration);
  const futureClientHours = futureDate.getHours();
  const futureClientMinutes = futureDate.getMinutes();
  statisticsEndTime.innerHTML = futureClientHours + ':' + futureClientMinutes;
}
