// STATISTICS
(function () {
  const statisticsCheckbox = document.querySelector('.settings__checkbox--statistics');

  statisticsCheckbox.addEventListener('change', function (event) {
    if (event.currentTarget.checked) {
      STATISTICS.classList.remove('statistics--off');
    } else {
      STATISTICS.classList.add('statistics--off');
    };
  });
})();

let videoWidth;
let videoHeight;
let videoFormat;
let videoDuration;
let videoBuffer;
let videoFPS;
let videoCurrentTime;

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