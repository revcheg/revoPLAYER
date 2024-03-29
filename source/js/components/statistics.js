// STATISTICS
let videoName;
let videoWidth;
let videoHeight;
let videoFormat;
let videoDuration;
let videoCurrentTime;
// let videoBitrate;
// let videoFPS;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const statisticsName = WRAPPER.querySelector('.statistics__name');
const statisticsClientTime = STATISTICS.querySelector('.statistics__time');
const statisticsEndTime = STATISTICS.querySelector('.statistics__end');
const statisticsResolution = STATISTICS.querySelector('.statistics__resolution');
const statisticsUFH = HEADER.querySelector('.header__ufh');
const statisticsFormat = STATISTICS.querySelector('.statistics__format');
const statisticsBuffer = STATISTICS.querySelector('.statistics__buffer');
// const statisticsBitrate = STATISTICS.querySelector('.statistics__bitrate');
// const statisticsFPS = STATISTICS.querySelector('.statistics__fps');

function getStatistics() {
  statisticsName.classList.remove('statistics__name--off');

  videoWidth = VIDEO.videoWidth;
  videoHeight = VIDEO.videoHeight;
  videoDuration = Math.round(VIDEO.duration);
  VIDEO_RANGE.setAttribute('max', videoDuration);

  if (currentVideo.type) {
    videoFormat = currentVideo.type.replace('video/', '');
  } else {
    videoFormat = VIDEO.src.split('.').pop();
  }

  // checkFitScreen();
  setStatistics();
}

function setStatistics() {
  videoName = currentVideo.name;

  if (currentVideo.year) {
    videoName += ' / ' + currentVideo.year;
  }

  statisticsName.innerText = videoName;

  statisticsResolution.innerText = videoWidth + 'x' + videoHeight;
  statisticsFormat.innerText = videoFormat;

  if (videoWidth >= 3840) {
    statisticsUFH.classList.remove('header__ufh--off');
  } else {
    statisticsUFH.classList.add('header__ufh--off');
  }
}

function updateBuffered() {
  if (VIDEO.buffered.length > 0) {
    videoBuffer = Math.floor(VIDEO.buffered.end(0));
    statisticsBuffer.innerText = videoBuffer;
  }
}

function updateCurrentTime() {
  videoCurrentTime = Math.floor(VIDEO.currentTime);
}

VIDEO.addEventListener('timeupdate', updateCurrentTime);
VIDEO.addEventListener('progress', updateBuffered);

// Save and load current video time, deep beta version...
function saveCurrentTime() {
  localStorage.setItem('current-category', currentCategory);
  localStorage.setItem('current-subcategory', currentSubcategory);
  localStorage.setItem('current-index', currentVideoIndex);
  localStorage.setItem('current-time', videoCurrentTime);
}

function removeCurrentTime() {
  localStorage.removeItem('current-category');
  localStorage.removeItem('current-subcategory');
  localStorage.removeItem('current-index');
  localStorage.removeItem('current-time');
}

function loadCurrentTime() {
  if (localStorage.getItem('current-time')) {
    currentCategory = localStorage.getItem('current-category');
    currentSubcategory = localStorage.getItem('current-subcategory');
    currentVideoIndex = parseInt(localStorage.getItem('current-index'));
    videoCurrentTime = parseInt(localStorage.getItem('current-time'));
    VIDEO.currentTime = videoCurrentTime;
  }
}

loadCurrentTime();

VIDEO.addEventListener('timeupdate', saveCurrentTime);
VIDEO.addEventListener('ended', removeCurrentTime);

// Local time
function getTime() {
  const clientDate = new Date();
  const clientHours = addLeadingZero(clientDate.getHours());
  const clientMinutes = addLeadingZero(clientDate.getMinutes());
  statisticsClientTime.innerText = clientHours + ':' + clientMinutes;
}

function getEndTime() {
  const futureDate = new Date();
  futureDate.setSeconds(futureDate.getSeconds() + videoDuration);
  const futureClientHours = addLeadingZero(futureDate.getHours());
  const futureClientMinutes = addLeadingZero(futureDate.getMinutes());
  statisticsEndTime.innerText = futureClientHours + ':' + futureClientMinutes;
}

// Add 0 to time output if value < 10
function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}
