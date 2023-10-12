// STATISTICS
// let videoWidth;
// let videoHeight;
// let videoFormat;
// let videoDuration;
// let videoBuffer;
// // let videoFPS;
// let videoCurrentTime;
// let windowWidth = window.innerWidth;
// let windowHeight = window.innerHeight;

// const statisticsClientTime = STATISTICS.querySelector('.statistics__time');
// const statisticsEndTime = STATISTICS.querySelector('.statistics__end');
// const statisticsResolution = STATISTICS.querySelector('.statistics__resolution');
// const statisticsUFH = document.querySelector('.statistics__ufh');
// const statisticsFormat = STATISTICS.querySelector('.statistics__format');
// const statisticsDuration = STATISTICS.querySelector('.statistics__duration');
// // const statisticsFPS = STATISTICS.querySelector('.statistics__fps');
// const statisticsBuffer = STATISTICS.querySelector('.statistics__buffer');

// function getStatistics() {
//   STATISTICS.classList.remove('statistics--hide');

//   if (currentVideo.type) {
//     videoFormat = currentVideo.type.replace('video/', '');
//   } else {
//     videoFormat = VIDEO.src.split('.').pop();
//   }

//   videoWidth = VIDEO.videoWidth;
//   videoHeight = VIDEO.videoHeight;
//   videoDuration = Math.round(VIDEO.duration);
//   VIDEO_RANGE.setAttribute('max', videoDuration);

//   setStatistics();
//   checkFitScreen();
// }

// function setStatistics() {
//   statisticsResolution.innerHTML = videoWidth + 'x' + videoHeight;
//   statisticsFormat.innerHTML = videoFormat;
//   statisticsDuration.innerHTML = videoDuration;

//   if (videoWidth >= 3840) {
//     statisticsUFH.classList.remove('statistics--off');
//   } else {
//     statisticsUFH.classList.add('statistics--off');
//   }
// }

// // FPS
// // let framesRendered = 0;
// // let startTime = null;

// // function countFrames() {
// //   if (!startTime) {
// //     startTime = performance.now();
// //   }

// //   framesRendered++;

// //   if (performance.now() - startTime >= 1000) {
// //     videoFPS = framesRendered / ((performance.now() - startTime) / 1000);
// //     statisticsFPS.innerHTML = Math.round(videoFPS);
// //     framesRendered = 0;
// //     startTime = null;
// //   }

// //   requestAnimationFrame(countFrames);
// // }

// // VIDEO.addEventListener('play', countFrames);

// // Time
// function getTime() {
//   const clientDate = new Date();
//   const clientHours = clientDate.getHours();
//   const clientMinutes = clientDate.getMinutes();
//   statisticsClientTime.innerHTML = clientHours + ':' + clientMinutes;
// }

// function getEndTime() {
//   const futureDate = new Date();
//   futureDate.setSeconds(futureDate.getSeconds() + videoDuration);
//   const futureClientHours = futureDate.getHours();
//   const futureClientMinutes = futureDate.getMinutes();
//   statisticsEndTime.innerHTML = futureClientHours + ':' + futureClientMinutes;
// }

// STATISTICS
let videoWidth;
let videoHeight;
let videoFormat;
let videoDuration;
let videoCurrentTime;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const statisticsClientTime = STATISTICS.querySelector('.statistics__time');
const statisticsEndTime = STATISTICS.querySelector('.statistics__end');
const statisticsResolution = STATISTICS.querySelector('.statistics__resolution');
const statisticsUFH = document.querySelector('.statistics__ufh');
const statisticsFormat = STATISTICS.querySelector('.statistics__format');
const statisticsDuration = STATISTICS.querySelector('.statistics__duration');
const statisticsBuffer = STATISTICS.querySelector('.statistics__buffer');

function getStatistics() {
  updateVideoProperties();
  setStatistics();
  checkFitScreen();
}

function updateVideoProperties() {
  videoWidth = VIDEO.videoWidth;
  videoHeight = VIDEO.videoHeight;
  videoDuration = Math.round(VIDEO.duration);
  VIDEO_RANGE.setAttribute('max', videoDuration);

  if (currentVideo.type) {
    videoFormat = currentVideo.type.replace('video/', '');
  } else {
    videoFormat = VIDEO.src.split('.').pop();
  }
}

function setStatistics() {
  statisticsResolution.innerHTML = videoWidth + 'x' + videoHeight;
  statisticsFormat.innerHTML = videoFormat;
  statisticsDuration.innerHTML = videoDuration;

  if (videoWidth >= 3840) {
    statisticsUFH.classList.remove('statistics--off');
  } else {
    statisticsUFH.classList.add('statistics--off');
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
