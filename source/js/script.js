const BODY = document.querySelector('.body');

const HEADER = document.querySelector('.header');
const FOOTER = document.querySelector('.footer');

const MAIN = document.querySelector('.main');
const VIDEO = document.querySelector('.video');
const WRAPPER = document.querySelector('.video__wrapper');
const SETTINGS = document.querySelector('.settings');
const STATISTIC = document.querySelector('.statistic');
const EPISODE = document.querySelector('.episode');

const VIDEO_RANGE = document.querySelector('.control__range--duration');
const START_BUTTON = document.querySelector('.video__start');
const CONTROLS = document.querySelector('.control');

const MESSAGE = document.querySelector('.message');

// Settings
let settingsOpen = false;
const openButton = document.querySelector('.header__menu');
const closeButton = SETTINGS.querySelector('.settings__close');

function openSettings() {
  if (settingsOpen) {
    settingsOpen = false;
    SETTINGS.classList.add('settings--hide');
    SETTINGS.blur();
  } else {
    settingsOpen = true;
    SETTINGS.classList.remove('settings--hide');
    SETTINGS.focus();
  }

  if (categoryName === 'scheme') {
    schemeSwitcher.classList.add('footer__switcher--show');
  }
}

function closeSettings() {
  settingsOpen = false;
  SETTINGS.classList.add('settings--hide');
  SETTINGS.blur();
  schemeSwitcher.classList.remove('footer__switcher--show');
}

openButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', closeSettings);

// Statistic window
const statisticCheckbox = SETTINGS.querySelector('.settings__checkbox--statistic');

function showStatistic() {
  STATISTIC.classList.toggle('statistic--off');
  statisticName.classList.toggle('video__name--short');
}

statisticCheckbox.addEventListener('change', showStatistic);

// Scale player
const scaleCheckbox = SETTINGS.querySelector('.settings__checkbox--scale');

function setupScale() {
  if (scaleCheckbox.checked) {
    BODY.addEventListener('mousemove', setScale);
  } else {
    WRAPPER.removeAttribute('style');
    BODY.removeEventListener('mousemove', setScale);
  }
}

function setScale(event) {
  if (scaleCheckbox.checked && event.isTrusted) {
    let xPos = -(event.pageX / window.innerWidth - 0.5) * -40;
    let yPos = (event.pageY / window.innerHeight - 0.5) * -40;
    let blockRect = VIDEO.getBoundingClientRect();
    let mouseX = event.clientX - blockRect.left;
    let mouseY = event.clientY - blockRect.top;

    if (!(mouseX >= 0 && mouseX < blockRect.width && mouseY >= 0 && mouseY < blockRect.height)) {
      WRAPPER.style.transform = 'perspective(1000px) rotateY(' + xPos + 'deg) rotateX(' + yPos + 'deg) scaleZ(2)';
    } else {
      WRAPPER.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scaleZ(1)';
    }
  }
}

scaleCheckbox.addEventListener('change', setupScale);

// Autoplay
let autoplayFlag = true;
const autoplayCheckbox = SETTINGS.querySelector('.settings__checkbox--autoplay');

function setAutoplay() {
  if (autoplayCheckbox.checked) {
    autoplayFlag = true;
    VIDEO.addEventListener('loadeddata', startVideo);
  } else {
    autoplayFlag = false;
    VIDEO.removeEventListener('loadeddata', startVideo);
  }
}

autoplayCheckbox.addEventListener('change', setAutoplay);

// Deep mode
let deepFlag = 'main';
const deepCheckbox = SETTINGS.querySelector('.settings__checkbox--deep');
const deepLabel = deepCheckbox.parentNode;

deepCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    deepFlag = 'deep';
  } else {
    deepFlag = 'main';
  }

  setVideo();
});

// Playback progress line
let playbackValue;

const playbackProgress = CONTROLS.querySelector('.control__progress');
const playbackCheckbox = SETTINGS.querySelector('.settings__checkbox--line');

function updatePayback() {
  if (playbackCheckbox.checked) {
    playbackValue = Math.floor((videoCurrentTime / videoDuration) * 100);
    playbackProgress.style.width = `calc(${playbackValue}% - 10px)`;
    playbackProgress.value = playbackValue;
  }
}

function showPayback() {
  playbackProgress.classList.toggle('control__progress--hide');
}

playbackCheckbox.addEventListener('change', showPayback);

// Additional controls
const controlsCheckbox = SETTINGS.querySelector('.settings__checkbox--controls');
const additionalControls = CONTROLS.querySelectorAll('.control__button--hide');

function showAddControls() {
  controlsCheckbox.checked = !controlsCheckbox.checked;

  additionalControls.forEach(control => {
    if (controlsCheckbox.checked) {
      control.classList.remove('control__button--hide');
    } else {
      control.classList.add('control__button--hide');
    }
  });
}

controlsCheckbox.addEventListener('change', showAddControls);
controlsCheckbox.addEventListener('click', showAddControls);

// Subtitle background
const subtitleCheckbox = SETTINGS.querySelector('.settings__checkbox--subtitle');

function setBackgroundSubtitle() {
  if (subtitleCheckbox.checked) {
    VIDEO.classList.add('video--subtitle');
  } else {
    VIDEO.classList.remove('video--subtitle');
  }
}

subtitleCheckbox.addEventListener('change', setBackgroundSubtitle);

// Subtitle bold
const subtitleBoldCheckbox = SETTINGS.querySelector('.settings__checkbox--bold');

function setBolderSubtitle() {
  if (subtitleBoldCheckbox.checked) {
    VIDEO.classList.add('video--bold');
  } else {
    VIDEO.classList.remove('video--bold');
  }
}

subtitleBoldCheckbox.addEventListener('change', setBolderSubtitle);

// Blur
const blurCheckbox = SETTINGS.querySelector('.settings__checkbox--blur');

blurCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    BODY.classList.add('blur');
  } else {
    BODY.classList.remove('blur');
  }
});

// Background video
let backgroundFlag = false;

const backgroundCheckbox = SETTINGS.querySelector('.settings__checkbox--background');

function showBackground() {
  if (backgroundCheckbox.checked) {
    backgroundFlag = true;
    backgroundElement.classList.remove('background--off');
    renderBackground();
  } else {
    backgroundFlag = false;
    backgroundElement.classList.add('background--off');
  }
}

backgroundCheckbox.addEventListener('change', showBackground);

// Episode list
const episodeCheckbox = SETTINGS.querySelector('.settings__checkbox--episode');
const episodeLabel = SETTINGS.querySelector('.settings__option--episode');

function showEpisode() {
  if (episodeCheckbox.checked) {
    EPISODE.classList.remove('episode--off');
  } else {
    EPISODE.classList.add('episode--off');
  }
};

episodeCheckbox.addEventListener('change', showEpisode);

// Scheme
const schemeSwitcher = FOOTER.querySelector('.footer__switcher');
const lightStyle = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyle = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
// const favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');

let systemScheme = getSystemScheme();
let savedScheme = getSavedScheme();

function getSystemScheme() {
  let systemScheme = matchMedia('(prefers-color-scheme: dark)').matches;
  return systemScheme ? 'dark' : 'light';
}

function setupScheme() {
  if (savedScheme === null) return;

  if (savedScheme === 'light') {
    switchMedia('light');
  } else if (savedScheme === 'dark') {
    switchMedia('dark');
  } else if (savedScheme === 'vice') {
    createScheme('vice');
  }
}

setupScheme();

function setScheme(scheme) {
  // if (savedScheme === 'dark') {
  //   favicon.href = 'img/favicons/favicon-dark.svg';
  // } else {
  //   favicon.href = 'img/favicons/favicon.svg';
  // }

  saveScheme(scheme);
  switchMedia(scheme);
  updateSchemeButtons(document.querySelector(`.footer__scheme[value=${scheme}]`));
}

if (savedScheme !== null) {
  updateSchemeButtons(document.querySelector(`.footer__scheme[value=${savedScheme}]`));
} else {
  updateSchemeButtons(document.querySelector(`.footer__scheme[value=${systemScheme}]`));
}

function updateSchemeButtons(activeRadio) {
  let schemeButtons = document.querySelectorAll('.footer__scheme');

  [...schemeButtons].forEach((radio) => {
    if (radio === activeRadio) {
      radio.checked = true;
      radio.setAttribute('checked', 'checked');
    } else {
      radio.checked = false;
      radio.removeAttribute('checked');
    }
  });
}

schemeSwitcher.addEventListener('change', (event) => {
  savedScheme = event.target.value;
  setScheme(savedScheme);
});

// Switch media link
let lightMedia;
let darkMedia;
let schemeMedia;

function switchMedia(scheme) {
  if (scheme === 'light') {
    lightMedia = 'all';
    darkMedia = 'not all';
    schemeMedia = 'not all';
  } else if (scheme === 'dark') {
    lightMedia = 'not all';
    darkMedia = 'all';
    schemeMedia = 'not all';
  } else if (scheme === 'vice') {
    lightMedia = 'not all';
    darkMedia = 'not all';
    schemeMedia = 'all';
  } else {
    lightMedia = 'not all';
    darkMedia = 'not all';
    schemeMedia = 'all';
  }

  lightStyle.media = lightMedia;
  darkStyle.media = darkMedia;

  if (schemeStyle) {
    schemeStyle.media = schemeMedia;
  }
}

// Create new scheme
let schemeStyle;

function createScheme(scheme) {
  if (document.querySelector(`link[href="css/${scheme}.css"]`)) {
    return;
  }

  schemeStyle = document.createElement('link');
  schemeStyle.setAttribute('rel', 'stylesheet');
  schemeStyle.href = `css/${scheme}.css`;
  // schemeStyle.setAttribute('media', 'all');
  darkStyle.parentNode.insertBefore(schemeStyle, darkStyle.nextSibling);

  switchMedia(scheme);

  let schemeLabel = document.createElement('label');
  schemeLabel.classList.add('footer__label');

  let schemeButton = document.createElement('input');
  schemeButton.classList.add('button', 'footer__scheme');
  schemeButton.name = 'color-scheme';
  schemeButton.ariaLabel = `${scheme}`;
  schemeButton.title = `Встановити ${scheme} тему`;
  schemeButton.type = 'radio';
  schemeButton.value = scheme;

  let schemeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  schemeIcon.setAttribute('class', 'footer__icon');
  schemeIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  schemeIcon.setAttribute('width', '25');
  schemeIcon.setAttribute('height', '25');
  schemeIcon.setAttribute('viewBox', '0 0 48 48');

  let schemeUseElement = document.createElementNS("http://www.w3.org/2000/svg", "use");
  schemeUseElement.setAttribute('href', `img/sprite.svg#${scheme}`);

  schemeSwitcher.appendChild(schemeLabel);
  schemeIcon.appendChild(schemeUseElement);
  schemeLabel.appendChild(schemeIcon);
  schemeLabel.appendChild(schemeButton);

  updateSchemeButtons(schemeButton);

  saveScheme(scheme);
}

// Background
const backgroundElement = document.querySelector('.background');
const backgroundCanvas = backgroundElement.querySelector('.background__canvas');
const backgroundContext = backgroundCanvas.getContext('2d');

const aspectRatio = VIDEO.videoWidth / VIDEO.videoHeight;

if (window.innerWidth / window.innerHeight > aspectRatio) {
  backgroundCanvas.width = window.innerHeight * aspectRatio;
  backgroundCanvas.height = window.innerHeight;
} else {
  backgroundCanvas.width = window.innerWidth;
  backgroundCanvas.height = window.innerWidth / aspectRatio;
}

function renderBackground() {
  if (backgroundFlag) {
    backgroundCanvas.width = BODY.clientWidth;
    backgroundCanvas.height = BODY.clientHeight;

    backgroundContext.drawImage(VIDEO, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
    setTimeout(renderBackground, 1000 / 60);
  }
}

VIDEO.addEventListener('play', renderBackground);

// Console
const consoleContainer = document.querySelector('.console');
const consoleBackground = consoleContainer.querySelector('.console__background');
const consoleClose = consoleContainer.querySelector('.console__close');
const consoleInput = consoleContainer.querySelector('.console__input');

function openConsole() {
  if (!consoleBackground.src) {
    consoleBackground.src = 'video/console.mp4';
  }
  consoleBackground.play();
  consoleContainer.classList.remove('console--hide');
  consoleInput.focus();
}

function closeConsole() {
  consoleBackground.pause();
	consoleContainer.classList.add('console--hide');
	consoleInput.value = '';
  consoleInput.blur();
}

consoleClose.addEventListener('click', closeConsole);

// Open console, dev button
const devButton = FOOTER.querySelector('.footer__copyright--dev');
const MAX_DEV_CLICK = 10;
let clickCount = 0;

function devClicks() {
  if (++clickCount >= MAX_DEV_CLICK) {
    clickCount = 0;
    openConsole();
    showMessage('Консоль розробника розблокована &#129323;');
  } else {
    showMessage(`Залишилось ${MAX_DEV_CLICK - clickCount} кліків`);
  }
}

devButton.addEventListener('click', devClicks);

// Command list
const consoleCommands = {
  'unlimited spider man': {
    currentCategory: 'bonus',
    currentSubcategory: 'Unlimited Spider Man',
    message: 'Відкрито бонусне відео &#128375;',
  },
  'spider man': {
    currentCategory: 'bonus',
    currentSubcategory: 'Spider Man',
    message: 'Відкрито бонусне відео &#128375;',
  },
  'vice city': {
    currentCategory: 'bonus',
    currentSubcategory: 'Vice City',
    message: 'Розблокована нова тема &#127847;',
    scheme: 'vice',
  },
  'assassins creed 2': {
    currentCategory: 'bonus',
    currentSubcategory: 'Assassins Creed 2',
    message: 'Відкрито бонусне відео &#129413;',
  },
  'tmnt': {
    currentCategory: 'bonus',
    currentSubcategory: 'TMNT',
    message: 'Кавабанга &#127829;',
  },
};

function executeCommand(event) {
  if (event.key === 'Enter') {
    let command = consoleInput.value.trim().toLowerCase();
    let commandDescription = consoleCommands[command];

    if (commandDescription) {
      deepLabel.classList.add('settings__option--hide');

      currentCategory = commandDescription.currentCategory;
      currentSubcategory = commandDescription.currentSubcategory;
      currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];

      resetVideo();
      setupCurrentVideo();
      closeConsole();
      showMessage(commandDescription.message);

      if (autoplayFlag) {
        startVideo();
      }

      if (commandDescription.scheme) {
        createScheme(commandDescription.scheme);
      }
    } else {
      showMessage('Команда неможлива &#128126;');
    }

    consoleInput.value = '';
    consoleInput.blur();
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

consoleInput.addEventListener('input', stopPropagation);
consoleInput.addEventListener('keyup', stopPropagation);
consoleInput.addEventListener('keyup', executeCommand);

// Execute dev command
const devConsoleCheckbox = consoleContainer.querySelector('.console__input--checkbox');

function executeDevCommand(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    let command = consoleInput.value;

    try {
      let result = eval(command);
      showMessage('Результат: ' + result);
    } catch (error) {
      showMessage('Помилка: ' + error.message);
    }

    consoleInput.value = '';
    consoleInput.blur();
  }
}

function activateDevConsole() {
  if (devConsoleCheckbox.checked) {
    consoleInput.removeEventListener('keyup', executeCommand);
    consoleInput.addEventListener('keyup', executeDevCommand);
  } else {
    consoleInput.removeEventListener('keyup', executeDevCommand);
    consoleInput.addEventListener('keyup', executeCommand);
  }
}

devConsoleCheckbox.addEventListener('change', activateDevConsole);

// CONTROLS
VIDEO.controls = false;

// Show/hide controls
let controlsTimer;

function mouseMove() {
  clearTimeout(controlsTimer);
  showControls();

  controlsTimer = setTimeout(() => {
    hideControls();
  }, 1500);
}

function showControls() {
  statisticName.classList.remove('video__name--hide');
  VIDEO.style.cursor = 'auto';
  STATISTIC.classList.remove('statistic--hide');
  CONTROLS.classList.remove('control--hide');
}

function hideControls() {
  statisticName.classList.add('video__name--hide');
  VIDEO.style.cursor = 'none';
  STATISTIC.classList.add('statistic--hide');
  CONTROLS.classList.add('control--hide');
}

WRAPPER.addEventListener('mousemove', mouseMove);
WRAPPER.addEventListener('mouseleave', hideControls);

// Pause and play
const playButton = CONTROLS.querySelector('.control__button--play');
const playButtonIcon = CONTROLS.querySelector('.control__icon--play');
const pauseButtonIcon = CONTROLS.querySelector('.control__icon--pause');

function pauseVideo() {
  if (isVideoPlaying) {
    VIDEO.pause();
    isVideoPlaying = false;
  }
}

function playVideo() {
  if (!isVideoPlaying) {
    VIDEO.play();
    isVideoPlaying = true;
  }
}

function setPauseIcon() {
  playButtonIcon.classList.remove('control__icon--hide');
  pauseButtonIcon.classList.add('control__icon--hide');
}

function setPlayIcon() {
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
}

VIDEO.addEventListener('pause', setPauseIcon);
VIDEO.addEventListener('playing', setPlayIcon);

function switchVideoState() {
  if (isVideoPlaying) {
    pauseVideo();
  } else {
    playVideo();
  }
}

playButton.addEventListener('click', switchVideoState);

// Duration, range
const videoPassed = CONTROLS.querySelector('.control__time--passed');
const videoLeft = CONTROLS.querySelector('.control__time--left');

function setDuration() {
  let rangeValue = VIDEO_RANGE.value;

  VIDEO.currentTime = rangeValue;

  videoPassed.innerText = formatTime(rangeValue);
  videoLeft.innerText = formatTime(videoDuration - rangeValue);

  playbackProgress.value = rangeValue;
  playbackProgress.style.width = Math.floor((rangeValue / videoDuration) * 100) + '%';
}

function resetDuration() {
  VIDEO_RANGE.value = '0';
  videoPassed.innerText = formatTime(0);
  videoLeft.innerText = formatTime(0);
  playbackProgress.style.width = '0%';
  playbackProgress.value = 0;
}

VIDEO_RANGE.addEventListener('input', setDuration);

// Time, format time
function formatTime(timeInSeconds) {
  let hours = Math.floor(timeInSeconds / 3600);
  let minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
  let seconds = Math.floor(timeInSeconds - (hours * 3600) - (minutes * 60));

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  if (parseInt(hours) > 0) {
    return hours + ':' + minutes + ':' + seconds;
  } else {
    return minutes + ':' + seconds;
  }
}

// Duration hover, show time preview
const videoPreview = CONTROLS.querySelector('.control__time--preview');

function handleTimePreview(event) {
  let touch = event.touches ? event.touches[0] : null;
  let clientX = touch ? touch.clientX : event.clientX;
  let rangeRect = VIDEO_RANGE.getBoundingClientRect();

  if (event.type === 'touchstart' || event.type === 'touchmove' || event.type === 'mousemove') {
    if (clientX < rangeRect.left || clientX > rangeRect.right) {
      hideTimePreview();
    } else {
      showTimePreview(clientX);
      updatePreviewPosition(clientX);
    }
  } else if (event.type === 'touchend' || event.type === 'mouseleave') {
    hideTimePreview();
  }
}

function showTimePreview(clientX) {
  let percent = (clientX - VIDEO_RANGE.getBoundingClientRect().left) / VIDEO_RANGE.clientWidth;
  let previewTime = percent * VIDEO_RANGE.max;

  videoPreview.classList.remove('control__time--hide');
  videoPreview.innerText = formatTime(previewTime);
}

function hideTimePreview() {
  videoPreview.classList.add('control__time--hide');
}

function updatePreviewPosition(clientX) {
  let previewWidth = videoPreview.clientWidth;
  let durationRect = CONTROLS.querySelector('.control__duration').getBoundingClientRect();

  let previewX = clientX - durationRect.left - (previewWidth / 2);
  previewX = Math.max(0, Math.min(previewX, durationRect.width - previewWidth));

  videoPreview.style.left = `${previewX}px`;
}

VIDEO_RANGE.addEventListener('touchmove', handleTimePreview);
VIDEO_RANGE.addEventListener('touchend', hideTimePreview);

VIDEO_RANGE.addEventListener('mousemove', handleTimePreview);
VIDEO_RANGE.addEventListener('mouseleave', hideTimePreview);

// Wheel duration
function wheelDuration(event) {
  event.preventDefault();
  const delta = -Math.sign(event.deltaY);
  let currentValue = parseFloat(VIDEO_RANGE.value);
  let changedValue = currentValue + delta;

  VIDEO_RANGE.value = changedValue;
  VIDEO.currentTime = VIDEO_RANGE.value;
  setDuration();
}

VIDEO_RANGE.addEventListener('wheel', wheelDuration);

// Mute
const muteButton = CONTROLS.querySelector('.control__button--mute');
const muteButtonIcon = CONTROLS.querySelector('#muted');

function setupMute() {
  VIDEO.muted ? unmuteVideo() : muteVideo();
}

let savedVolume;

function muteVideo() {
  savedVolume = VIDEO.volume;
  VIDEO.muted = true;
  VIDEO.volume = 0;
  volumeRange.value = 0;
}

function unmuteVideo() {
  VIDEO.muted = false;
  VIDEO.volume = savedVolume;
  volumeRange.value = savedVolume;
}

function changeMuteIcon() {
  let isMuted = VIDEO.muted;
  muteButtonIcon.classList.toggle('control__icon--unmuted', !isMuted);
  muteButtonIcon.classList.toggle('control__icon--muted', isMuted);
  muteButton.classList.toggle('control__button--active', isMuted);
}

muteButton.addEventListener('click', setupMute);

// Volume
const volumeRange = CONTROLS.querySelector('.control__range--volume');

VIDEO.volume = 0.4;
volumeRange.value = 0.4;

volumeRange.addEventListener('input', () => {
  VIDEO.volume = volumeRange.value;
});

function changeVolume(volume) {
  let videoVolume = Math.max(0, Math.min(1, VIDEO.volume + volume));
  VIDEO.volume = videoVolume;
  volumeRange.value = videoVolume;
}

function updateVolume() {
  VIDEO.muted = (VIDEO.volume === 0) ? true : false;
  changeMuteIcon();
  showMessage('Гучність ' + (VIDEO.volume * 100).toFixed(0) + '%');
}

setTimeout(() => {
  VIDEO.addEventListener('volumechange', updateVolume);
}, 1000);

// Wheel volume
function wheelVolume(event) {
  event.preventDefault();
  if (typeof event.deltaY !== 'undefined' && !isNaN(event.deltaY)) {
    const delta = -Math.sign(event.deltaY);
    changeVolume(delta * 0.1);
  }
}

VIDEO.addEventListener('wheel', wheelVolume);

// Playback speed
let videoSpeed = 1.0;

const SPEED_STEP = 0.25;
const MIN_SPEED = 0.25;
const MAX_SPEED = 2.0;

const speedButton = CONTROLS.querySelector('.control__button--speed');
const speedInfo = speedButton.querySelector('.control__info');

function changeSpeed() {
  videoSpeed += SPEED_STEP;

  if (videoSpeed > MAX_SPEED) {
    videoSpeed = MIN_SPEED;
  }

  VIDEO.playbackRate = videoSpeed;

  speedInfo.classList.remove('control__info--hide');
  speedInfo.innerText = videoSpeed + 'x';

  if (videoSpeed !== 1.0) {
    speedButton.classList.add('control__button--active');
  } else {
    speedButton.classList.remove('control__button--active');
    speedInfo.classList.add('control__info--hide');
  }
}

function resetSpeed() {
  videoSpeed = 1.0;
  speedButton.classList.remove('control__button--active');
  speedInfo.classList.add('control__info--hide');
}

speedButton.addEventListener('click', changeSpeed);

// Picture in picture or PiP
const pipButton = CONTROLS.querySelector('.control__button--pip');

function setPictureInPicture() {
  if (document.pictureInPictureElement) {
    VIDEO.setAttribute('disablePictureInPicture', 'disablePictureInPicture');
    exitPictureInPicture();
  } else {
    VIDEO.removeAttribute('disablePictureInPicture');
    enterPictureInPicture();
  }
}

function enterPictureInPicture() {
  VIDEO.requestPictureInPicture()
    .then(() => {
      pipButton.classList.add('control__button--active');
      updatePipButtonAttributes('Закрити міні-програвач', 'Закрити міні-програвач (p)');
    })
    .catch((error) => {
      console.error(error);
    });
}

function exitPictureInPicture() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture()
      .then(() => {
        pipButton.classList.remove('control__button--active');
        updatePipButtonAttributes('Міні-програвач', 'Міні-програвач (p)');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function updatePipButtonAttributes(ariaLabel, title) {
  pipButton.setAttribute('aria-label', ariaLabel);
  pipButton.setAttribute('title', title);
}

pipButton.addEventListener('click', setPictureInPicture);
document.addEventListener('leavepictureinpicture', exitPictureInPicture);

// Fit Screen
const fitButton = CONTROLS.querySelector('.control__button--fit');
const fitInfo = fitButton.querySelector('.control__info');

function switchFitScreen() {
  let currentFit = VIDEO.style.objectFit;
  let changedFit = currentFit === 'cover' ? 'contain' : 'cover';
  VIDEO.style.objectFit = changedFit;
  fitButton.classList.toggle('control__button--active');

  if (changedFit === 'contain') {
    fitButton.setAttribute('aria-label', 'Ростягнути зображення');
    fitButton.setAttribute('title', 'Ростягнути зображення (x)');
    fitInfo.innerText = '';
    fitInfo.classList.add('control__info--hide');
  } else {
    fitButton.setAttribute('aria-label', 'Зменшити зображення');
    fitButton.setAttribute('title', 'Зменшити зображення (x)');
    fitInfo.innerText = 'full';
    fitInfo.classList.remove('control__info--hide');
  }
}

fitButton.addEventListener('click', switchFitScreen);

// Cinema mode
let cinemaFlag = false;

const cinemaButton = CONTROLS.querySelector('.control__button--cinema');

if (BODY.clientWidth > 1024) {
  cinemaButton.classList.remove('control__button--off');
}

function enterCinemaMode() {
  HEADER.classList.add('header--hide');
  FOOTER.classList.add('footer--hide');
  SERIES_LIST.classList.add('series--off');
  BODY.style.overflow = 'hidden';
  setTimeout(() => {
    HEADER.style.display = 'none';
    FOOTER.style.display = 'none';
    WRAPPER.classList.add('video__wrapper--cinema');
    MAIN.classList.add('main--cinema');
    VIDEO.focus();
  }, 250);
}

function exitCinemaMode() {
  if (seriesCheckbox.checked) {
    SERIES_LIST.classList.remove('series--off');
  }
  HEADER.style.display = 'flex';
  FOOTER.style.display = 'flex';
  WRAPPER.classList.remove('video__wrapper--cinema');
  MAIN.classList.remove('main--cinema');
  VIDEO.blur();
  BODY.removeAttribute('style');
  setTimeout(() => {
    HEADER.classList.remove('header--hide');
    FOOTER.classList.remove('footer--hide');
  }, 250);
}

function setCinemaMode() {
  cinemaFlag = !cinemaFlag;
  cinemaButton.classList.toggle('control__button--active');
  if (cinemaFlag) {
    cinemaButton.setAttribute('aria-label', 'Вийти з режиму кінотеатра');
    cinemaButton.setAttribute('title', 'Вийти з режиму кінотеатра (t)');
    enterCinemaMode();
  } else {
    cinemaButton.setAttribute('aria-label', 'Режим кінотеатру');
    cinemaButton.setAttribute('title', 'Режим кінотеатру (t)');
    exitCinemaMode();
  }
}

cinemaButton.addEventListener('click', setCinemaMode);

// Full screen
const fullButton = CONTROLS.querySelector('.control__button--size');
const fullButtonSize = CONTROLS.querySelector('.control__icon--size');
const fullButtonMin = CONTROLS.querySelector('.control__icon--min');

function setFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement) {
    if (WRAPPER.requestFullscreen) {
      WRAPPER.requestFullscreen();
    } else if (WRAPPER.mozRequestFullScreen) {
      WRAPPER.mozRequestFullScreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
  }
}

function updateFullscreenButton() {
  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
  fullButton.setAttribute('aria-label', isFullscreen ? 'Закрити повний екран' : 'На весь екран');
  fullButton.setAttribute('title', isFullscreen ? 'Закрити повний екран (esc)' : 'На весь екран (f)');
  fullButtonSize.classList.toggle('control__icon--hide', isFullscreen);
  fullButtonMin.classList.toggle('control__icon--hide', !isFullscreen);
}

fullButton.addEventListener('click', setFullscreen);
WRAPPER.addEventListener('dblclick', setFullscreen);
document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
document.addEventListener('mozfullscreenchange', updateFullscreenButton);

// Disable download option
VIDEO.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

// Episode, generating episode button
let episodeButtons;

function renderEpisode() {
  EPISODE.innerText = '';

  Array.from(uploadedVideo).forEach((file, index) => {
    let li = document.createElement('li');
    li.className = 'episode__item';

    let button = document.createElement('button');
    button.className = 'button episode__button';
    button.type = 'button';
    button.textContent = file.name;
    button.addEventListener('click', () => {
      setEpisode(button);
			currentVideoIndex = index;
      VIDEO.src = file.url;
    });

    if (index === 0) {
      button.classList.add('episode__button--active');
    }

    EPISODE.appendChild(li);
    li.appendChild(button);
  });

  episodeButtons = EPISODE.querySelectorAll('.episode__button');
}

function setEpisode(button) {
  episodeButtons.forEach(btn => {
    btn.classList.remove('episode__button--active');
  });

  button.classList.add('episode__button--active');
}

// File
const MAX_FILE_SIZE = 5368709120;
const INPUTFILE = SETTINGS.querySelector('.settings__file');
const INPUTFILE_OUTPUT = SETTINGS.querySelector('.settings__output');
const INPUTFILE_COUNTER = SETTINGS.querySelector('.settings__counter');
const supportedFormats = ['video/mp4', 'video/webm', 'video/mkv', 'video/x-matroska'];

// Check and save uploaded files
let uploadedVideo = [];

function handleFiles(event) {
  const files = Array.from(event.target.files);

  files.forEach(file => {
    const fileUrl = URL.createObjectURL(file);
    uploadedVideo.push({
      file,
      url: fileUrl,
      src: fileUrl,
      name: file.name,
      type: file.type,
      size: file.size
    });
  });

  validateFiles(uploadedVideo);

  clearVideoButtons();
}

INPUTFILE.addEventListener('change', resetVideo);
INPUTFILE.addEventListener('change', handleFiles);

// Validate files
function validateFiles(uploadedVideo) {
  let showSuccessMessage = true;

  uploadedVideo.forEach(video => {
    let fileSize = video.file.size;
    let fileType = video.file.type;

    if (fileSize > MAX_FILE_SIZE) {
      showMessage('Файл завеликий &#128548;');
      showSuccessMessage = false;
    } else if (!isSupportedFileType(fileType)) {
      showMessage('Непідтримуваний тип файлу &#128552;');
      showSuccessMessage = false;
    }
  });

  if (showSuccessMessage) {
    if (uploadedVideo.length > 1) {
      INPUTFILE_COUNTER.innerText = '+' + uploadedVideo.length;
      INPUTFILE_COUNTER.classList.remove('settings__counter--hide');
      episodeLabel.classList.remove('settings__option--hide');
    }

    let lastUploadedVideo = uploadedVideo[uploadedVideo.length - 1];
    INPUTFILE_OUTPUT.innerText = lastUploadedVideo.name;
    VIDEO.setAttribute('crossorigin', 'anonymous');
    renderEpisode();
    setupCurrentVideo();
    showMessage('Кінострічка готова &#128252;');
  }

  INPUTFILE.value = '';
}

function isSupportedFileType(fileType) {
  return supportedFormats.includes(fileType);
}

// JSON setup
let data = null;
let currentCategory = 'bonus';
let currentSubcategory = 'Assassins Creed 2';
let currentVideoIndex = 0;

fetch('video.json')
  .then(response => {
    if (!response.ok) {
      showMessage('Помилка загрузки json &#128531;');
      throw Error('Failed to load video.json');
    }
    return response.json();
  })
  .then(videoData => {
    data = videoData;
    setupCurrentVideo();
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

let currentVideo = null;

function setupCurrentVideo() {
  // autoplay
  if (!autoplayFlag) {
    resetVideo();
  }

  // current data
  if (uploadedVideo.length > 0) {
    currentVideo = uploadedVideo[currentVideoIndex];
  } else {
    currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];
  }

  // name
  videoName = currentVideo.name;

  if (currentVideo.year) {
    videoName += ' / ' + currentVideo.year;
  }

  statisticName.innerText = videoName;

  // src
  VIDEO.setAttribute('src', currentVideo.src);
  VIDEO.setAttribute('alt', currentVideo.description);
  VIDEO.preload = 'auto';

  // subtitle
  if (currentVideo.subtitle) {
    subtitleButton.classList.remove('control__button--off');
  } else {
    subtitleButton.classList.add('control__button--off');
  }
}

const prevButton = CONTROLS.querySelector('.control__button--prev');
const nextButton = CONTROLS.querySelector('.control__button--next');

function changeVideoIndex(delta) {
  if (uploadedVideo.length > 0) {
    currentVideoIndex += delta;

    if (currentVideoIndex >= uploadedVideo.length) {
      currentVideoIndex = 0;
    } else if (currentVideoIndex < 0) {
      currentVideoIndex = uploadedVideo.length - 1;
    }

    setEpisode(episodeButtons[currentVideoIndex]);
  } else {
    currentVideoIndex += delta;

    if (currentVideoIndex < 0) {
      const subcategories = Object.keys(data[currentCategory]);
      const currentSubcategoryIndex = subcategories.indexOf(currentSubcategory);

      if (currentSubcategoryIndex > 0) {
        currentSubcategory = subcategories[currentSubcategoryIndex - 1];
        currentVideoIndex = data[currentCategory][currentSubcategory].length - 1;
      } else {
        const categories = Object.keys(data);
        const currentCategoryIndex = categories.indexOf(currentCategory);

        if (currentCategoryIndex > 0) {
          currentCategory = categories[currentCategoryIndex - 1];
          const previousSubcategory = Object.keys(data[currentCategory]).pop();
          currentSubcategory = previousSubcategory;
          currentVideoIndex = data[currentCategory][previousSubcategory].length - 1;
        } else {
          currentCategory = categories[categories.length - 1];
          const previousSubcategory = Object.keys(data[currentCategory]).pop();
          currentSubcategory = previousSubcategory;
          currentVideoIndex = data[currentCategory][previousSubcategory].length - 1;
        }
      }
    } else if (currentVideoIndex >= data[currentCategory][currentSubcategory].length) {
      const subcategories = Object.keys(data[currentCategory]);
      const currentSubcategoryIndex = subcategories.indexOf(currentSubcategory);

      if (currentSubcategoryIndex < subcategories.length - 1) {
        currentSubcategory = subcategories[currentSubcategoryIndex + 1];
        currentVideoIndex = 0;
      } else {
        const categories = Object.keys(data);
        const currentCategoryIndex = categories.indexOf(currentCategory);

        if (currentCategoryIndex < categories.length - 1) {
          currentCategory = categories[currentCategoryIndex + 1];
          currentSubcategory = Object.keys(data[currentCategory])[0];
          currentVideoIndex = 0;
        } else {
          currentCategory = categories[0];
          currentSubcategory = Object.keys(data[currentCategory])[0];
          currentVideoIndex = 0;
        }
      }
    }
  }
  setupCurrentVideo();
}

nextButton.addEventListener('click', () => changeVideoIndex(1));
prevButton.addEventListener('click', () => changeVideoIndex(-1));

VIDEO.addEventListener('ended', () => changeVideoIndex(1));

// Keyboard
const keyHandlers = {
  // Main
  playPause: ' ',
  nextVideoIndex: '.',
  prevVideoIndex: ',',
  skipBackward: 'ArrowLeft',
  skipForward: 'ArrowRight',
  changeVolumeUp: 'ArrowUp',
  changeVolumeDown: 'ArrowDown',
  toggleMute: 'm',
  setSubtitle: 'c',
  changeSpeed: 's',
  openPIP: 'p',
  toggleFitScreen: 'x',
  toggleFullscreen: 'f',
  showAddControls: 'b',
  // Other
  openSettings: 'i',
  closeSettings: 'Escape',
  startVideo: 'k',
  setLightScheme: 'l',
  setDarkScheme: 'd',
  setCinemaMode: 't',
  openConsole: '`'
};

function handleKey(key, handlers) {
  for (const action in handlers) {
    if (handlers[action] === key) {
      if (isVideoStarted) {
        switch (action) {
          case 'playPause':
            switchVideoState();
          break;
          case 'nextVideoIndex':
            changeVideoIndex(1);
            break;
          case 'prevVideoIndex':
            changeVideoIndex(-1);
            break;
          case 'skipBackward':
            VIDEO.currentTime -= 5;
            VIDEO_RANGE.value = VIDEO.currentTime;
            setDuration();
            break;
          case 'skipForward':
            VIDEO.currentTime += 5;
            VIDEO_RANGE.value = VIDEO.currentTime;
            setDuration();
            break;
          case 'changeVolumeUp':
            changeVolume(0.1);
            break;
          case 'changeVolumeDown':
            changeVolume(-0.1);
            break;
          case 'toggleMute':
            setupMute();
            break;
          case 'setSubtitle':
            setSubtitle();
            break;
          case 'changeSpeed':
            changeSpeed();
            break;
          case 'openPIP':
            setPictureInPicture();
            break;
          case 'toggleFitScreen':
            switchFitScreen();
            break;
          case 'toggleFullscreen':
            setFullscreen();
            break;
          case 'showAddControls':
            showAddControls();
            break;
          }
      }

      // Other
      switch (action) {
        case 'openSettings':
          openSettings();
          break;
        case 'closeSettings':
          closeSettings();
          closeConsole();
          break;
        case 'startVideo':
          startVideo();
          break;
        case 'setLightScheme':
          setScheme('light');
          break;
        case 'setDarkScheme':
          setScheme('dark');
          break;
        case 'setCinemaMode':
          setCinemaMode();
          break;
        case 'openConsole':
          openConsole();
          break;
      }
    }
  }
}

window.addEventListener('keyup', (event) => {
  const keyboardKey = event.key;
  handleKey(keyboardKey, keyHandlers);
});

// Save/Load scheme
function saveScheme(scheme) {
  localStorage.setItem('selected-scheme', scheme);
}

function getSavedScheme() {
  return localStorage.getItem('selected-scheme');
}

// function clearScheme() {
//   localStorage.removeItem('selected-scheme');
// }

// Message
let messageTimeout;
let isMessageVisible = false;

MESSAGE.addEventListener('mouseover', () => {
  if (!isMessageVisible) {
    isMessageVisible = true;
  }

  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }
});

MESSAGE.addEventListener('mouseout', () => {
  if (isMessageVisible) {
    messageTimeout = setTimeout(() => {
      clearMessage();
      isMessageVisible = false;
    }, 3000);
  }
});

function showMessage(message, duration = 3000) {
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }

  MESSAGE.classList.remove('message--hide');
  MESSAGE.innerHTML = message;

  if (!MESSAGE.classList.contains('message--animate')) {
    MESSAGE.classList.add('message--animate');
  }

  messageTimeout = setTimeout(() => {
    clearMessage();
    isMessageVisible = false;
  }, duration);
}

function clearMessage() {
  MESSAGE.classList.remove('message--animate');
  MESSAGE.classList.add('message--hide');
}

// Set Video
let game = null;

const chooseButtons = SETTINGS.querySelectorAll('.settings__video');

function selectGame() {
  clearVideoButtons();
  if (this.getAttribute('data-video') == 'customVideo') {
    return
  } else {
    this.classList.add('settings__video--active');

    game = this.getAttribute('data-video');
    currentCategory = game;
    currentVideo = data[currentCategory];

    if (currentVideo.deep) {
      deepLabel.classList.remove('settings__option--hide');
      showMessage('Доступна deep категорія');
    } else {
      deepLabel.classList.add('settings__option--hide');
    }

    setVideo();
  }
}

function setVideo() {
  currentCategory = game;
  currentSubcategory = deepFlag;
  currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];
  setupCurrentVideo();
}

function clearVideoButtons() {
  chooseButtons.forEach((element) => {
    element.classList.remove('settings__video--active');
  });
}

chooseButtons.forEach((element) => {
  element.addEventListener('click', selectGame);
});

// Reset video
function resetVideo() {
  isVideoStarted = false;
  stopProgress();
  resetDuration();
  VIDEO.src = '';
  VIDEO.removeAttribute('src');
  VIDEO.removeAttribute('preload');
  VIDEO.removeAttribute('crossorigin');
  statisticUFH.classList.add('header__ufh--off');
  WRAPPER.className = 'video__wrapper';
  START_BUTTON.classList.remove('video__start--hide');
  statisticName.classList.add('video__name--off');
  CONTROLS.classList.add('control--off');
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
}

// Start
function setupStart() {
  if (isVideoReadyToPlay()) {
    startVideo();
  } else {
    emptyError();
  }
}

function isVideoReadyToPlay() {
  return (
    VIDEO.hasAttribute('src') &&
    VIDEO.src !== '' &&
    !VIDEO.error &&
    (VIDEO.readyState >= VIDEO.HAVE_CURRENT_DATA || VIDEO.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA)
  );
}

let isVideoStarted = false;

function startVideo() {
  isVideoStarted = true;
  START_BUTTON.classList.add('video__start--hide');
  CONTROLS.classList.remove('control--off');
  statisticName.classList.remove('video__name--off');

  setAutoplay();
  playVideo();
}

function emptyError() {
  openButton.focus();
  openButton.classList.add('header__menu--error');
  setTimeout(() => {
    openButton.classList.remove('header__menu--error');
  }, 2100);

  if (VIDEO.error) {
    showMessage(VIDEO.error.message);
  }

  showMessage('Відео відсутнє, спробуйте обрати інше');
  setSettingsCategory('video');
}

// START_BUTTON.addEventListener('click', setupStart);
START_BUTTON.addEventListener('click', startVideo);

// Statistic
let videoName;
let videoWidth;
let videoHeight;
let videoFormat;
let videoDuration;
let videoCurrentTime;
let videoBuffer;
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
  videoDuration = Math.ceil(VIDEO.duration);
  VIDEO_RANGE.setAttribute('max', videoDuration);

  // format
  videoFormat = currentVideo.type ? videoFormat = currentVideo.type.replace('video/', '') : VIDEO.src.split('.').pop();
  statisticFormat.innerText = videoFormat;

  // ufh icon
  statisticUFH.classList.toggle('header__ufh--off', videoWidth < 3840);
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
    showMessage('Відео та час було відновлено');
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

// Subtitles
const subtitles = document.querySelectorAll('.video__subtitle');
const subtitlesTrack = VIDEO.textTracks;
const subtitleButton = CONTROLS.querySelector('.control__button--subtitle');
const subtitleInfo = subtitleButton.querySelector('.control__info');

let currentSubtitleIndex = -1;

function setSubtitle() {
  if (subtitles.length === 0) {
    return;
  }

  currentSubtitleIndex++;

  if (currentSubtitleIndex >= subtitles.length) {
    currentSubtitleIndex = -1;
  }

  if (currentSubtitleIndex === -1) {
    disableSubtitle();
  } else {
    const currentSubtitle = subtitles[currentSubtitleIndex];
    enableSubtitle(currentSubtitle);
  }
}

function enableSubtitle(subtitle) {
  subtitle.track.mode = 'showing';
  subtitle.mode = 'showing';
  subtitle.default = true;
  disableOtherSubtitles(subtitle);
  subtitleButton.setAttribute('aria-label', 'Вимкнути субтитри');
  subtitleButton.setAttribute('title', 'Вимкнути субтитри (c)');
  subtitleButton.classList.add('control__button--active');
  subtitleInfo.classList.remove('control__info--hide');
  subtitleInfo.innerText = subtitle.srclang;
}

function disableSubtitle() {
  for (const subtitle of subtitles) {
    subtitle.track.mode = 'disabled';
    subtitle.mode = 'disabled';
    subtitle.default = false;
  }
  subtitleButton.setAttribute('aria-label', 'Увімкнути субтитри');
  subtitleButton.setAttribute('title', 'Увімкнути субтитри (c)');
  subtitleButton.classList.remove('control__button--active');
  subtitleInfo.classList.add('control__info--hide');
}

function disableOtherSubtitles(currentSubtitle) {
  for (const subtitle of subtitles) {
    if (subtitle !== currentSubtitle) {
      subtitle.track.mode = 'disabled';
      subtitle.mode = 'disabled';
      subtitle.default = false;
    }
  }
}

subtitleButton.addEventListener('click', setSubtitle);

// Tabs
const settingsCategory = SETTINGS.querySelectorAll('.settings__tab');
const settingsButtons = SETTINGS.querySelectorAll('.settings__button');

let categoryName;

settingsButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryName = button.getAttribute('data-tab');
    setSettingsCategory(categoryName);
  });
});

function setSettingsCategory(categoryName) {
  settingsButtons.forEach(btn => btn.classList.remove('settings__button--active'));
  settingsCategory.forEach(tab => tab.classList.remove('settings__tab--active'));

  let activeButton = SETTINGS.querySelector(`[data-tab="${categoryName}"]`);
  activeButton.classList.add('settings__button--active');

  let activeCategory = SETTINGS.querySelector(`.settings__tab[data-tab="${categoryName}"]`);
  activeCategory.classList.add('settings__tab--active');
  activeCategory.focus();

  if (categoryName === 'scheme') {
    schemeSwitcher.classList.add('footer__switcher--show');
  } else {
    schemeSwitcher.classList.remove('footer__switcher--show');
  }
}

// Video
let isVideoPlaying = false;

let currentVideoPassed;
let currentVideoLeft;

function updateProgress() {
  // CurrentTime
  videoCurrentTime = VIDEO.currentTime;
  VIDEO_RANGE.value = videoCurrentTime;

  // Duration
  currentVideoPassed = formatTime(videoCurrentTime);
  currentVideoLeft = formatTime(VIDEO.duration - videoCurrentTime);
  videoPassed.innerText = currentVideoPassed;
  videoLeft.innerText = currentVideoLeft;

  // Buffer
  videoBuffer = (VIDEO.buffered.length > 0) ? VIDEO.buffered.end(0) - videoCurrentTime : 0;
  statisticBuffer.innerText = Math.floor(videoBuffer);

  updateClientTime();
  updatePayback();
}

VIDEO.addEventListener('timeupdate', updateProgress);

function startProgress() {
  isVideoPlaying = true;
}

function stopProgress() {
  isVideoPlaying = false;
}

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);

// VIDEO STATES
// Loadstart
function loadstartState() {
  stopProgress();
  resetDuration();
  resetSpeed();

  WRAPPER.classList.add('video__wrapper--loadstart');
}

function removeLoadstartState() {
  WRAPPER.classList.remove('video__wrapper--loadstart');
}

VIDEO.addEventListener('loadstart', loadstartState);
VIDEO.addEventListener('loadeddata', removeLoadstartState);

// Loadeddata
function loadeddataState() {
  getStatistic();
}

VIDEO.addEventListener('loadeddata', loadeddataState);

// Pause
function pauseState() {
  WRAPPER.classList.add('video__wrapper--pause');
}

function removePauseState() {
  WRAPPER.classList.remove('video__wrapper--pause');
}

VIDEO.addEventListener('pause', pauseState);
VIDEO.addEventListener('playing', removePauseState);

// Waiting
function waitingState() {
  WRAPPER.classList.add('video__wrapper--waiting');
}

function removeWaitingState() {
  WRAPPER.classList.remove('video__wrapper--waiting');
}

VIDEO.addEventListener('waiting', waitingState);
VIDEO.addEventListener('playing', removeWaitingState);

// Error
function errorState() {
  WRAPPER.classList.add('video__wrapper--error');
  showMessage('Помилка відео &#128528;');
  isVideoPlaying = false;
  resetVideo();
}

function removeErrorState() {
  WRAPPER.classList.remove('video__wrapper--error');
}

VIDEO.addEventListener('error', errorState);
VIDEO.addEventListener('canplay', removeErrorState);
