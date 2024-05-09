// Statistic
let videoName;
let videoWidth;
let videoHeight;
let videoFormat;
let videoDuration;
let videoCurrentTime;
// let videoBitrate;
// let videoFPS;

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
  // video
  videoWidth = VIDEO.videoWidth;
  videoHeight = VIDEO.videoHeight;
  statisticResolution.innerText = videoWidth + 'x' + videoHeight;

  // duration
  videoDuration = VIDEO.duration;
  VIDEO_RANGE.setAttribute('max', videoDuration);

  // format
  if (currentVideo.type) {
    videoFormat = currentVideo.type.replace('video/', '');
  } else {
    videoFormat = VIDEO.src.split('.').pop();
  }

  statisticFormat.innerText = videoFormat;

  // ufh icon
  if (videoWidth >= 3840) {
    statisticUFH.classList.remove('header__ufh--off');
  } else {
    statisticUFH.classList.add('header__ufh--off');
  }
}

// Local time
function updateClientTime() {
  let clientTime = new Date();
  let clientHours = formatTimeUnit(clientTime.getHours());
  let clientMinutes = formatTimeUnit(clientTime.getMinutes());
  statisticClientTime.innerText = clientHours + ':' + clientMinutes;

  let estimatedTime = new Date();
  estimatedTime.setSeconds(estimatedTime.getSeconds() + videoDuration);
  let estimatedHours = formatTimeUnit(estimatedTime.getHours());
  let estimatedMinutes = formatTimeUnit(estimatedTime.getMinutes());
  statisticEndTime.innerText = estimatedHours + ':' + estimatedMinutes;
}

function formatTimeUnit(value) {
  return value < 10 ? '0' + value : value;
}

// Save load current video and time
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
    showMessage('Відео та таймкоди було відновлено');
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
