// STATISTICS
const statisticsCheckbox = document.querySelector('.settings__checkbox--statistics');
const statisticsAdditionalCheckbox = document.querySelector('.settings__checkbox--additional');
const statisticsAdditional = document.querySelector('.settings__label--add');
const statisticsHiddenCategory = document.querySelectorAll('.statistics__category--hide');

statisticsCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    STATISTICS.classList.remove('statistics--off');
    statisticsAdditional.classList.remove('settings__label--hide');
  } else {
    STATISTICS.classList.add('statistics--off');
    statisticsAdditional.classList.add('settings__label--hide');
    statisticsAdditionalCheckbox.checked = false;
  };
});

statisticsAdditionalCheckbox.addEventListener('change', function (event) {
  statisticsHiddenCategory.forEach((element) => {
    element.classList.remove('statistics__category--hide');
  });
});

let videoWidth;
let videoHeight;
let videoFormat;
let videoDuration;
let videoBuffer;
let videoFPS;
let videoCurrentTime;

const statisticsClientTime = STATISTICS.querySelector('.statistics__time');
const statisticsEndTime = STATISTICS.querySelector('.statistics__end');
const statisticsResolution = STATISTICS.querySelector('.statistics__resolution');
const statisticsUFH = document.querySelector('.statistics__ufh');
const statisticsFormat = STATISTICS.querySelector('.statistics__format');
const statisticsDuration = STATISTICS.querySelector('.statistics__duration');
const statisticsFPS = STATISTICS.querySelector('.statistics__fps');
const statisticsBuffer = STATISTICS.querySelector('.statistics__buffer');

function getStatistics () {
  STATISTICS.classList.remove('statistics--hide');

  if (FILETYPE) {
    videoFormat = FILETYPE;
  } else {
    videoFormat = VIDEO.src.split('.').pop();
  };

  videoWidth = VIDEO.videoWidth;
  videoHeight = VIDEO.videoHeight;
  videoDuration = Math.round(VIDEO.duration);
  VIDEORANGE.setAttribute('max', videoDuration);

  setStatistics();
};

function getFPS () {
  let playbackQuality = VIDEO.getVideoPlaybackQuality();
  videoFPS = playbackQuality.totalVideoFrames / VIDEO.currentTime;
  statisticsFPS.innerHTML = Math.round(videoFPS);

  // videoFPS = VIDEO.webkitDecodedFrameCount;
  // let framesPerSecond = Math.round((VIDEO.webkitDecodedFrameCount - videoFPS))
  // console.log(framesPerSecond);
};

function refreshFPS () {
  videoFPS = 0;
  playbackQuality = 0;
};

// function getBitrate () {
//   VIDEO.addEventListener('loadedmetadata', function () {
//     const bitratePerSecond = VIDEO.webkitVideoBitsPerSecond;
//     console.log(bitratePerSecond);
//   });
// };

function getTime () {
  const clientDate = new Date();
  const clientHours = clientDate.getHours();
  const clientMinutes = clientDate.getMinutes();
  statisticsClientTime.innerHTML = clientHours + ':' + clientMinutes;
};

function getEndTime () {
  const futureDate = new Date();
  futureDate.setSeconds(futureDate.getSeconds() + videoDuration);
  const futureClientHours = futureDate.getHours();
  const futureClientMinutes = futureDate.getMinutes();
  statisticsEndTime.innerHTML = futureClientHours + ':' + futureClientMinutes;
};

function setStatistics () {
  statisticsResolution.innerHTML = videoWidth + 'x' + videoHeight;
  statisticsFormat.innerHTML = videoFormat;
  statisticsDuration.innerHTML = videoDuration;

  if (videoWidth >= 3840) {
    statisticsUFH.classList.remove('statistics--off');
  } else {
    statisticsUFH.classList.add('statistics--off');
  };
};