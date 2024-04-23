// Statistic
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

const statisticName = WRAPPER.querySelector('.video__name');
const statisticClientTime = STATISTIC.querySelector('.statistic__time');
const statisticEndTime = STATISTIC.querySelector('.statistic__end');
const statisticResolution = STATISTIC.querySelector('.statistic__resolution');
const statisticUFH = HEADER.querySelector('.header__ufh');
const statisticFormat = STATISTIC.querySelector('.statistic__format');
const statisticBuffer = STATISTIC.querySelector('.statistic__buffer');
// const statisticBitrate = STATISTIC.querySelector('.statistic__bitrate');
// const statisticFPS = STATISTIC.querySelector('.statistic__fps');

function getStatistic() {
  statisticName.classList.remove('video__name--off');

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
  setStatistic();
}

function setStatistic() {
  videoName = currentVideo.name;

  if (currentVideo.year) {
    videoName += ' / ' + currentVideo.year;
  }

  statisticName.innerText = videoName;

  statisticResolution.innerText = videoWidth + 'x' + videoHeight;
  statisticFormat.innerText = videoFormat;

  if (videoWidth >= 3840) {
    statisticUFH.classList.remove('header__ufh--off');
  } else {
    statisticUFH.classList.add('header__ufh--off');
  }
}

function updateBuffered() {
  if (VIDEO.buffered.length > 0) {
    videoBuffer = Math.floor(VIDEO.buffered.end(0));
    statisticBuffer.innerText = videoBuffer;
  }
}

function updateVideoTime() {
  videoCurrentTime = Math.floor(VIDEO.currentTime);
}

VIDEO.addEventListener('timeupdate', updateVideoTime);
VIDEO.addEventListener('progress', updateBuffered);

// Save and load current video time
function saveVideoTime() {
  localStorage.setItem('video-category', currentCategory);
  localStorage.setItem('video-subcategory', currentSubcategory);
  localStorage.setItem('video-index', currentVideoIndex);
  localStorage.setItem('video-time', videoCurrentTime);
}

function loadVideoTime() {
  if (localStorage.getItem('video-time')) {
    currentCategory = localStorage.getItem('video-category');
    currentSubcategory = localStorage.getItem('video-subcategory');
    currentVideoIndex = parseInt(localStorage.getItem('video-index'));
    videoCurrentTime = parseInt(localStorage.getItem('video-time'));
    VIDEO.currentTime = videoCurrentTime;
  }
}

loadVideoTime();

function clearVideoTime() {
  localStorage.removeItem('video-category');
  localStorage.removeItem('video-subcategory');
  localStorage.removeItem('video-index');
  localStorage.removeItem('video-time');
}

VIDEO.addEventListener('timeupdate', saveVideoTime);
VIDEO.addEventListener('ended', clearVideoTime);

// Local time
function getTime() {
  const clientDate = new Date();
  const clientHours = formatTimeUnit(clientDate.getHours());
  const clientMinutes = formatTimeUnit(clientDate.getMinutes());
  statisticClientTime.innerText = clientHours + ':' + clientMinutes;
}

function getEndTime() {
  const futureDate = new Date();
  futureDate.setSeconds(futureDate.getSeconds() + videoDuration);
  const futureClientHours = formatTimeUnit(futureDate.getHours());
  const futureClientMinutes = formatTimeUnit(futureDate.getMinutes());
  statisticEndTime.innerText = futureClientHours + ':' + futureClientMinutes;
}

// Add 0 to time output if value < 10
function formatTimeUnit(value) {
  return value < 10 ? '0' + value : value;
}
