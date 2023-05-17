const BODY = document.querySelector('.body'); 

const VIDEO = document.querySelector('.video'); 
const SETTINGS = document.querySelector('.settings');
const STATISTICS = document.querySelector('.statistics');

const VIDEORANGE = document.querySelector('.control__range');

const STARTBUTTON = document.querySelector('.video__start');
const CONTROLS = document.querySelector('.control');

// const backgroundVideo = document.querySelector('.video__background');

// const castButton = CONTROLS.querySelector('.control__button--cast');

// function castVideo () {
//   const castSessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
//   chrome.cast.requestSession(
//     (castSession) => {
//       const mediaInfo = new chrome.cast.media.MediaInfo(videoPlayer.src);
//       const request = new chrome.cast.media.LoadRequest(mediaInfo);
//       castSession.loadMedia(request);
//     },
//     (error) => {
//       console.log(error);
//     },
//     castSessionRequest
//   );
// };

// castButton.addEventListener('click', castVideo);

// CONTROLS
// Pause
const playButton = document.querySelector('.control__button--play');
const playButtonIcon = document.querySelector('.control__icon--play');
const pauseButtonIcon = document.querySelector('.control__icon--pause');

function pauseVideo () {
  if (VIDEO.paused) {
    VIDEO.play();
  } else {
    VIDEO.pause();
  };
};

function changePauseIcon () {
  if (VIDEO.paused) {
    playButtonIcon.classList.remove('control__icon--hide');
    pauseButtonIcon.classList.add('control__icon--hide');
  } else {
    playButtonIcon.classList.add('control__icon--hide');
    pauseButtonIcon.classList.remove('control__icon--hide');
  };
};

playButton.addEventListener('click', pauseVideo);
playButton.addEventListener('click', changePauseIcon);
VIDEO.addEventListener('click', pauseVideo);
VIDEO.addEventListener('click', changePauseIcon);

// Mute
const muteButton = document.querySelector('.control__button--volume');
const muteButtonIcon = document.querySelector('.control__mute');

function muteVideo () {
  muteButtonIcon.classList.toggle('control__mute');
  
  if (VIDEO.muted) {
    VIDEO.muted = false;
  } else {
    VIDEO.muted = true;
  };
};

muteButton.addEventListener('click', muteVideo);

// Range
let rangeValue;

VIDEORANGE.addEventListener('mousedown', () => {
  VIDEO.pause();
});

VIDEORANGE.addEventListener('change', function () {
  rangeValue = VIDEORANGE.value;
  VIDEO.currentTime = rangeValue;
  
  if (VIDEO.paused) {
    playButtonIcon.classList.add('control__icon--hide');
    pauseButtonIcon.classList.remove('control__icon--hide');
  };

  VIDEO.play();
});

// Full screen
const fullButton = document.querySelector('.control__button--size');

function fullscreenVideo () {
  VIDEO.requestFullscreen();
};

fullButton.addEventListener('click', fullscreenVideo);

// Duration
const videoPassed = CONTROLS.querySelector('.control__time--passed');
const videoLeft = CONTROLS.querySelector('.control__time--left');

function formatTime (timeInSeconds) {
  let hours = Math.floor(timeInSeconds / 3600);
  let minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
  let seconds = Math.floor(timeInSeconds - (hours * 3600) - (minutes * 60));
  
  if (hours < 10) {
    hours = '0' + hours;
  };

  if (minutes < 10) {
    minutes = '0' + minutes;
  };

  if (seconds < 10) {
    seconds = '0' + seconds;
  };

  // minutes = minutes < 10 ? '0' + minutes : minutes;
  // seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
};

// File
let FILE;
let FILETYPE;
let FILEURL;

const INPUTFILE = document.querySelector('.settings__file');

INPUTFILE.addEventListener('click', function () {
  resetVideo();
});

INPUTFILE.addEventListener('change', function () {
  FILE = INPUTFILE.files[0];
  FILEURL = URL.createObjectURL(FILE);
  FILETYPE = INPUTFILE.files[0].type.replace('video/', '');
  VIDEO.src = FILEURL; 
});

// Keyboard
let videoKey;

// Video
VIDEO.addEventListener('keyup', (event) => {
  videoKey = event.key;

  switch (videoKey) {
    case ' ':
      pauseVideo();
      changePauseIcon();
      break;

    case 'ArrowLeft':
      VIDEO.currentTime -= 5;
      break;

    case 'ArrowRight':
      VIDEO.currentTime += 5;
      break;

    case 'ArrowUp':
      VIDEO.volume += 0.1;
      break;

    case 'ArrowDown':
      VIDEO.volume -= 0.1;
      break;

    case 'm':
      muteVideo();
      break;

    case 'f':
      fullscreenVideo();
      break;
  };
});

// Other
BODY.addEventListener('keyup', (event) => {
  videoKey = event.key;

  switch (videoKey) {
    case 's':
      openSettings();
      break;

    case 'Escape':
      closeSettings();
      break;

    case 'p':
      startVideo();
      break;

    case 'l':
      setTheme('light');
      setButton();
      saveTheme('light');
      break;

    case 'd':
      setTheme('dark');
      setButton();
      saveTheme('dark');
      break;
  };
});

// Save/Load theme
// Save theme
function saveTheme(currentTheme) {
  localStorage.setItem('localTheme', currentTheme);
  localStorage.setItem('localButton', buttonIndex);
};

// Load theme
function loadTheme() {
  if (localStorage) {
    const localTheme = localStorage.getItem('localTheme');
    const localButton = localStorage.getItem('localButton');
    setTheme(localTheme);
    setButton(localButton);
  };
};

// Set Video
let game;

const chooseButtons = document.querySelectorAll('.settings__video');

chooseButtons.forEach((element) => {
  element.addEventListener('click', function () {
    game = this.getAttribute('data-video');
    resetVideo();
    setVideo();
    deepCheckbox.removeAttribute('disabled', 'disabled');
  });
});

function setVideo () {
  VIDEO.src = 'video/' + game + '/' + deepFlag + '.webm';
  VIDEO.preload = 'auto';
  VIDEO.volume = 0.5;
};

// Reset video
function resetVideo () {
  VIDEO.pause();
  STARTBUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--hide');
  STATISTICS.classList.add('statistics--hide');
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
};

// Settings
const openButton = document.querySelector('.header__menu');
const closeButton = document.querySelector('.settings__close');

function openSettings () {
  SETTINGS.classList.remove('settings--hide');
  SETTINGS.focus();
};

function closeSettings () {
  SETTINGS.classList.add('settings--hide');
  SETTINGS.blur();
};

openButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', closeSettings);

// Statistics checkbox
const statisticsCheckbox = document.querySelector('.settings__checkbox--statistics');
const statisticsAdditionalCheckbox = document.querySelector('.settings__checkbox--additional');
const statisticsAdditional = document.querySelector('.settings__label--add');
const statisticsHiddenCategory = document.querySelectorAll('.statistics__category--hide');

statisticsCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    STATISTICS.classList.remove('statistics--off');
    statisticsAdditional.classList.remove('settings__label--hide');
    statisticsAdditionalCheckbox.removeAttribute('disabled');
  } else {
    STATISTICS.classList.add('statistics--off');
    statisticsAdditional.classList.add('settings__label--hide');
    statisticsAdditionalCheckbox.checked = false;
    statisticsAdditionalCheckbox.setAttribute('disabled', 'disabled');
  };
});

statisticsAdditionalCheckbox.addEventListener('change', function (event) {
  statisticsHiddenCategory.forEach((element) => {
    element.classList.remove('statistics__category--hide');
  });
});

// Deep mode
let deepFlag;
let deepCheckbox = document.querySelector('.settings__checkbox--deep');

deepCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    deepFlag = 'deep';
  } else {
    deepFlag = 'main';
  };

  setVideo();
});

// HQ mode
// let hqCheckbox = document.querySelector('.settings__checkbox--hq');
// let hqFlag;

// hqCheckbox.addEventListener('change', function (event) {
//   if (event.currentTarget.checked) {
//     hqFlag = true;
//   } else {
//     hqFlag = false;
//   };
// });

// Start 
function startVideo (event) {
  event.stopPropagation();

  if (VIDEO.src) {
    openButton.classList.remove('header__menu--error');
    STARTBUTTON.classList.add('video__start--hide');
    CONTROLS.classList.remove('control--off', 'control--hide');
    
    VIDEO.play();

    getStatistics();
    startProgress();
  } else {
    openButton.focus();
    openButton.classList.add('header__menu--error');
    setTimeout(() => {
      openButton.classList.remove('header__menu--error');
    }, 2000);
  };
};

STARTBUTTON.addEventListener('click', startVideo);

// End
VIDEO.addEventListener('ended', function () {
  STARTBUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--hide');
  STATISTICS.classList.add('statistics--hide');
  VIDEO.blur();
});

// STATISTICS
let videoWidth;
let videoHeight;
let videoFormat;
let videoDuration;
let videoBuffer;
// let videoFPS;
let videoCurrentTime;

const statisticsClientTime = STATISTICS.querySelector('.statistics__time');
const statisticsEndTime = STATISTICS.querySelector('.statistics__end');
const statisticsResolution = STATISTICS.querySelector('.statistics__resolution');
const statisticsUFH = document.querySelector('.statistics__ufh');
const statisticsFormat = STATISTICS.querySelector('.statistics__format');
const statisticsDuration = STATISTICS.querySelector('.statistics__duration');
// const statisticsFPS = STATISTICS.querySelector('.statistics__fps');
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

// THEME
let currentTheme = 'light';
let buttonIndex;
let favicon = document.querySelector('.favicon');

const themeButtons = document.querySelectorAll('.footer__theme');

// Check client theme
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  currentTheme = 'dark';
} else {
  currentTheme = 'light';
};

// Set button
themeButtons.forEach(function (button, index) {
  button.addEventListener('click', function () {
    buttonIndex = Array.from(themeButtons).indexOf(button);
    currentTheme = this.getAttribute('data-theme');

    setButton(buttonIndex);
    setTheme(currentTheme);
    saveTheme(currentTheme);
  });
});

function setButton() {
  themeButtons.forEach((button) => {
    button.removeAttribute('disabled');
    button.classList.remove('footer__theme--active');
  });
  
  themeButtons[buttonIndex].setAttribute('disabled', 'disabled'); 
  themeButtons[buttonIndex].classList.add('footer__theme--active');
};

// Set theme
function setTheme(currentTheme) {
  BODY.className = '';

  switch (currentTheme) {
    case 'light':
      BODY.classList.add(currentTheme);
      buttonIndex = 0;
      favicon.href = 'img/favicons/favicon.svg'
      break;

    case 'dark':
      BODY.classList.add(currentTheme);
      buttonIndex = 1;
      favicon.href = 'img/favicons/favicon-dark.svg'
      break;

    case 'cyberpunk':
      BODY.classList.add(currentTheme);
      buttonIndex = 2;
      break;
  };
};

setTheme(currentTheme);
setButton(buttonIndex);

loadTheme();

// Video
let progressInterval;
let playbackQuality;

function startProgress () {
  progressInterval = setTimeout(updateProgress, 1000);
};

function updateProgress () {
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
};

function stopProgress () {
  clearTimeout(progressInterval);
};

function stayFocus () {
  VIDEO.addEventListener('blur', function () {
    if (VIDEO.paused) {
      VIDEO.blur();
    } else {
      VIDEO.focus();
    };
  });
};

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);
