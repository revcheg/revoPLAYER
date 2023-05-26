const BODY = document.querySelector('.body'); 

const VIDEO = document.querySelector('.video'); 
const WRAPPER = document.querySelector('.video__wrapper'); 
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
const playButton = CONTROLS.querySelector('.control__button--play');
const playButtonIcon = CONTROLS.querySelector('.control__icon--play');
const pauseButtonIcon = CONTROLS.querySelector('.control__icon--pause');

function pauseVideo() {
  if (VIDEO.paused) {
    VIDEO.play();
  } else {
    VIDEO.pause();
  }
}

function changePauseIcon() {
  playButtonIcon.classList.toggle('control__icon--hide');
  pauseButtonIcon.classList.toggle('control__icon--hide');
}

playButton.addEventListener('click', pauseVideo);
playButton.addEventListener('click', changePauseIcon);

VIDEO.addEventListener('click', pauseVideo);
VIDEO.addEventListener('click', changePauseIcon);

// Mute
const muteButton = CONTROLS.querySelector('.control__button--volume');
const muteButtonIcon = CONTROLS.querySelector('.control__mute');

function muteVideo() {
  muteButtonIcon.classList.toggle('control__mute');
  
  if (VIDEO.muted) {
    VIDEO.muted = false;
  } else {
    VIDEO.muted = true;
  }
}

muteButton.addEventListener('click', muteVideo);

// Extra line
let lineProgress;

function extraLine() {
  lineProgress = (videoCurrentTime / videoDuration) * 100;
  line.style.width = lineProgress + '%';
  line.value = lineProgress;
}

// Range
let rangeValue;

VIDEORANGE.addEventListener('mousedown', () => {
  VIDEO.pause();
  stopProgress();

  if (playButtonIcon.classList.contains('control__icon--hide')) {
    changePauseIcon();
  }
});

VIDEORANGE.addEventListener('change', function () {
  rangeValue = VIDEORANGE.value;
  VIDEO.currentTime = rangeValue;
  VIDEO.play();

  if (pauseButtonIcon.classList.contains('control__icon--hide')) {
    changePauseIcon();
  }
});

// Full screen
const fullButton = CONTROLS.querySelector('.control__button--size');

function fullscreenVideo() {
  VIDEO.requestFullscreen();
}

fullButton.addEventListener('click', fullscreenVideo);

// File
let FILE;
let FILETYPE;
let FILEURL;
let FILESIZE;

const MAX_FILE_SIZE = 1073741824;

const INPUTFILE = document.querySelector('.settings__file');

INPUTFILE.addEventListener('click', function () {
  resetVideo();
});

INPUTFILE.addEventListener('change', function () {
  FILE = INPUTFILE.files[0];
  FILEURL = URL.createObjectURL(FILE);
  FILETYPE = INPUTFILE.files[0].type.replace('video/', '');
  FILESIZE = FILE.size;
  validateFILE(FILE);
});

function validateFILE(FILE) {
  if (FILESIZE < MAX_FILE_SIZE) {
    if (!isSupportedFileType(FILE.type)) {
      console.log('Непідтримуваний тип файлу');
      INPUTFILE.value = '';
    } else {
      VIDEO.src = FILEURL; 
      VIDEO.setAttribute('crossorigin', 'anonymous');
    }
  } else {
    console.log('Файл завеликий');
    INPUTFILE.value = '';
  }
}

function isSupportedFileType(fileType) {
  let supportedFormats = ['video/mp4', 'video/webm'];
  return supportedFormats.includes(fileType);
}

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
  }
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
      setScheme('light');
      setButton();
      saveScheme('light');
      break;

    case 'd':
      setScheme('dark');
      setButton();
      saveScheme('dark');
      break;
  }
});

// Save/Load theme
// Save theme
function saveScheme(scheme) {
  localStorage.setItem('localTheme', scheme);
  
  // Old
  localStorage.setItem('localButton', buttonIndex);
}

// Load theme
function loadScheme() {
  if (localStorage) {
    const localTheme = localStorage.getItem('localTheme');
    setScheme(localTheme);

    // Old
    const localButton = localStorage.getItem('localButton');
    setButton(localButton);
  }
}

function getSavedScheme() {
  return localStorage.getItem('localTheme');
}

function clearScheme() {
  localStorage.removeItem('localTheme');
}

// // Scheme BETA
// const schemeRadios = document.querySelectorAll('.footer__theme');
// let darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)').matches;

// function setupSwitcher() {
//   const savedScheme = getSavedScheme();

//   if (savedScheme !== null) {
//     const currentRadio = document.querySelector(`.footer__theme[value=${savedScheme}]`);
//     currentRadio.checked = true;
//   }

//   [...schemeRadios].forEach((radio) => {
//     radio.addEventListener('change', (event) => {
//         setScheme(event.target.value);
//     });
//   });
// }

// function setupScheme() {
//   const savedScheme = getSavedScheme();
//   const systemScheme = getSystemScheme();

//   if (savedScheme === null) return;

//   if (savedScheme !== systemScheme) {
//     setScheme(savedScheme);
//   }
// }

// function setScheme(scheme) {
//   switchMedia(scheme);

//   if (scheme === 'auto') {
//     clearScheme();
//   } else {
//     saveScheme(scheme);
//   }
// }

// let favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');

// function switchMedia(scheme) {
//   BODY.className = '';

//   switch (scheme) {
//     case 'light':
//       BODY.classList.add(scheme);
//       favicon.href = 'img/favicons/favicon.svg'
//       break;

//     case 'auto':
//       BODY.classList.add(scheme);
//       favicon.href = 'img/favicons/favicon.svg'
//       break;

//     case 'dark':
//       BODY.classList.add(scheme);
//       favicon.href = 'img/favicons/favicon-dark.svg'
//       break;
//   }
// }

// function getSystemScheme() {
//   return darkSchemeMedia ? 'dark' : 'light';
// }

// setupSwitcher();
// setupScheme();

// Scheme
let scheme = 'light';
let buttonIndex;

const themeButtons = document.querySelectorAll('.footer__theme');

// Check client scheme
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  scheme = 'dark';
} else {
  scheme = 'light';
}

// Set button
themeButtons.forEach(function (button, index) {
  button.addEventListener('click', function () {
    buttonIndex = Array.from(themeButtons).indexOf(button);
    scheme = this.getAttribute('data-theme');

    setButton(buttonIndex);
    setScheme(scheme);
    saveScheme(scheme);
  });
});

function setButton() {
  themeButtons.forEach((button) => {
    button.removeAttribute('disabled');
    button.classList.remove('footer__theme--active');
  });
  
  themeButtons[buttonIndex].setAttribute('disabled', 'disabled'); 
  themeButtons[buttonIndex].classList.add('footer__theme--active');
}

// Set scheme
let favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');

function setScheme(scheme) {
  BODY.className = '';

  switch (scheme) {
    case 'light':
      BODY.classList.add(scheme);
      buttonIndex = 0;
      favicon.href = 'img/favicons/favicon.svg'
      break;

    case 'dark':
      BODY.classList.add(scheme);
      buttonIndex = 1;
      favicon.href = 'img/favicons/favicon-dark.svg'
      break;

    case 'cyberpunk':
      BODY.classList.add(scheme);
      buttonIndex = 2;
      break;
  }
}

setScheme(scheme);
setButton(buttonIndex);

loadScheme();

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

function setVideo() {
  VIDEO.src = 'video/' + game + '/' + deepFlag + '.webm';
  VIDEO.preload = 'auto';
  VIDEO.volume = 0.5;
}

// Reset video
function resetVideo() {
  VIDEO.load();
  VIDEO.removeAttribute('crossorigin');
  WRAPPER.className = 'video__wrapper';
  STARTBUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--hide');
  STATISTICS.classList.add('statistics--hide');
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
}

// Settings
const openButton = document.querySelector('.header__menu');
const closeButton = SETTINGS.querySelector('.settings__close');

function openSettings() {
  SETTINGS.classList.remove('settings--hide');
  SETTINGS.focus();
}

function closeSettings() {
  SETTINGS.classList.add('settings--hide');
  SETTINGS.blur();
}

openButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', closeSettings);

// Statistics checkbox
const statisticsCheckbox = SETTINGS.querySelector('.settings__checkbox--statistics');
const statisticsAdditionalCheckbox = SETTINGS.querySelector('.settings__checkbox--additional');
const statisticsAdditional = SETTINGS.querySelector('.settings__label--add');
const statisticsHiddenCategory = STATISTICS.querySelectorAll('.statistics__category--hide');

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
  }
});

statisticsAdditionalCheckbox.addEventListener('change', function (event) {
  statisticsHiddenCategory.forEach((element) => {
    element.classList.remove('statistics__category--hide');
  });
});

// Deep mode
let deepFlag = 'main';
const deepCheckbox = SETTINGS.querySelector('.settings__checkbox--deep');

deepCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    deepFlag = 'deep';
  } else {
    deepFlag = 'main';
  }

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

// Extra line
const line = CONTROLS.querySelector('.control__line');
const lineCheckbox = SETTINGS.querySelector('.settings__checkbox--line');

lineCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    line.classList.remove('control__line--hide');
  } else {
    line.classList.add('control__line--hide');
  }
});

// 3D scale
const scaleCheckbox = SETTINGS.querySelector('.settings__checkbox--scale');

// Start 
function startVideo() {
  let videoSRC = VIDEO.src; 
  if (videoSRC === '' || videoSRC.includes('undefined')) {
    openButton.focus();
    openButton.classList.add('header__menu--error');
    setTimeout(() => {
      openButton.classList.remove('header__menu--error');
    }, 2000);
  } else if (videoSRC && VIDEO.readyState >= VIDEO.HAVE_CURRENT_DATA) {
    openButton.classList.remove('header__menu--error');
    STARTBUTTON.classList.add('video__start--hide');
    CONTROLS.classList.remove('control--off', 'control--hide');

    VIDEO.play();

    getStatistics();
  }
}

STARTBUTTON.addEventListener('click', startVideo);

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

function getStatistics() {
  STATISTICS.classList.remove('statistics--hide');

  if (FILETYPE) {
    videoFormat = FILETYPE;
  } else {
    videoFormat = VIDEO.src.split('.').pop();
  }

  videoWidth = VIDEO.videoWidth;
  videoHeight = VIDEO.videoHeight;
  videoDuration = Math.round(VIDEO.duration);
  VIDEORANGE.setAttribute('max', videoDuration);

  setStatistics();
}

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

// Tabs
const tabButtons = SETTINGS.querySelectorAll('.settings__button');
const tabs = SETTINGS.querySelectorAll('.settings__tab');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('settings__button--active'));
    // tabs.forEach(tab => tab.classList.remove('settings__tab--active'));
    tabs.forEach(tab => {
      tab.classList.remove('settings__tab--active');
      tab.classList.remove('settings__tab--relative');
      tab.removeAttribute('tabIndex');
    });

    const tabName = button.getAttribute('data-tab');

    button.classList.add('settings__button--active');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).classList.add('settings__tab--active');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).setAttribute('tabIndex', '0');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).focus();
    updateSettingsHeight();
  });
});

// Little fix mobile settings height
function updateSettingsHeight() {
  const settingsButtonHeight = SETTINGS.querySelector('.settings__control').clientHeight;
  const settingsWrapper = SETTINGS.querySelector('.settings__wrapper');
  const settingsWrapperHeight = settingsWrapper.clientHeight;
  const activeTab = document.querySelector('.settings__tab--active');
  const activeTabHeight = activeTab.clientHeight;

  if (BODY.clientWidth < 1440) {
    settingsWrapper.style.height = `calc(100vh - ${settingsButtonHeight}px - 61px)`;
    settingsWrapper.style.margin = '0';

    if (activeTabHeight > settingsWrapperHeight) {
      activeTab.classList.add('settings__tab--relative');
      settingsWrapper.style.height = activeTabHeight + 'px';
      settingsWrapper.style.margin = '15px 0 40px 0';
    } 
  }
}

updateSettingsHeight();

window.addEventListener('resize', updateSettingsHeight);

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

// End
function endVideo() {
  resetVideo();
  VIDEO.blur();
}

VIDEO.addEventListener('ended', endVideo);

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

// 3D transform
function movingVideo(event) {
  if (scaleCheckbox.checked) {
    let xPos = -(event.pageX / window.innerWidth - 0.5) * -20;
    let yPos = (event.pageY / window.innerHeight - 0.5) * -20;
    let blockRect = VIDEO.getBoundingClientRect();
    let mouseX = event.clientX - blockRect.left;
    let mouseY = event.clientY - blockRect.top;
  
    if (!(mouseX >= 0 && mouseX < blockRect.width && mouseY >= 0 && mouseY < blockRect.height)) {
      WRAPPER.style.transform = 'perspective(1000px) rotateY(' + xPos + 'deg) rotateX(' + yPos + 'deg) scaleZ(2)';
    } else {
      WRAPPER.style.transform = 'perspective(1000px) rotateY(0deg) scaleZ(2)';
    }
  }
}

function movingMobileVideo(event) {
  if (scaleCheckbox.checked) {
    let tiltX = event.beta;
    let tiltY = event.gamma;
    let rotateX = (tiltX / 45) * -30;
    let rotateY = (tiltY / 45) * 30;
  
    WRAPPER.style.transform = 'perspective(1000px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg) scaleZ(2)';
  }
}

BODY.addEventListener('mousemove', movingVideo);
BODY.addEventListener('deviceorientation', movingMobileVideo);
