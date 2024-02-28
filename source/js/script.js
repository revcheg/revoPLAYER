const BODY = document.querySelector('.body');

const HEADER = document.querySelector('.header');
const FOOTER = document.querySelector('.footer');

const MAIN = document.querySelector('.main');
const VIDEO = document.querySelector('.video');
const WRAPPER = document.querySelector('.video__wrapper');
const SETTINGS = document.querySelector('.settings');
const STATISTICS = document.querySelector('.statistics');
const SERIES_LIST = document.querySelector('.series');

const VIDEO_RANGE = document.querySelector('.control__range--duration');
const START_BUTTON = document.querySelector('.video__start');
const CONTROLS = document.querySelector('.control');

const MESSAGE = document.querySelector('.message');

// Settings
const openButton = document.querySelector('.header__menu');
const closeButton = SETTINGS.querySelector('.settings__close');

let settingsOpen = false;

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

  checkActiveTab();
}

function closeSettings() {
  settingsOpen = false;
  SETTINGS.classList.add('settings--hide');
  SETTINGS.blur();
  checkActiveTab();
}

openButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', closeSettings);

// Statistics checkbox
const statisticsCheckbox = SETTINGS.querySelector('.settings__checkbox--statistics');
const statisticsAdditionalCheckbox = SETTINGS.querySelector('.settings__checkbox--additional');
const statisticsAdditional = SETTINGS.querySelector('.settings__label--add');
const statisticsHiddenCategory = STATISTICS.querySelectorAll('.statistics__category--hide');

function showAddCheckbox(event) {
  const checked = event.currentTarget.checked;

  STATISTICS.classList.toggle('statistics--off', !checked);
  statisticsAdditional.classList.toggle('settings__label--hide', !checked);

  if (!checked) {
    statisticsAdditionalCheckbox.checked = false;
    statisticsHiddenCategory.forEach((element) => {
      element.classList.add('statistics__category--hide');
    });
  }
}

function showAddStatistic(event) {
  const checked = event.currentTarget.checked;

  if (checked) {
    statisticsHiddenCategory.forEach((element) => {
      element.classList.remove('statistics__category--hide');
    });
  } else {
    statisticsHiddenCategory.forEach((element) => {
      element.classList.add('statistics__category--hide');
    });
  }

  if (!checked) {
    statisticsAdditionalCheckbox.checked = false;
  }
}

statisticsCheckbox.addEventListener('change', showAddCheckbox);
statisticsAdditionalCheckbox.addEventListener('change', showAddStatistic);

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
    let xPos = -(event.pageX / window.innerWidth - 0.5) * -20;
    let yPos = (event.pageY / window.innerHeight - 0.5) * -20;
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

// Extra line
let lineProgress;

const line = CONTROLS.querySelector('.control__line');
const lineCheckbox = SETTINGS.querySelector('.settings__checkbox--line');

function showExtraLine() {
  if (lineCheckbox.checked) {
    line.classList.remove('control__line--hide');
  } else {
    line.classList.add('control__line--hide');
  }
}

function extraLine() {
  lineProgress = Math.round((videoCurrentTime / videoDuration) * 100);
  line.style.width = lineProgress + '%';
  line.value = lineProgress;
}

lineCheckbox.addEventListener('change', showExtraLine);

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

// Subtitle background
// const subtitleCheckbox = SETTINGS.querySelector('.settings__checkbox--subtitle');

// function setBackgroundSubtitle() {
//   const textTracks = VIDEO.textTracks;

//   for (const track of textTracks) {
//     const cues = track.cues;

//     // Перевірка, чи `cues` визначено та чи є ітерабельним
//     if (cues && cues.length > 0) {
//       for (let i = 0; i < cues.length; i++) {
//         const cue = cues[i];
//         const cueElement = cue.getCueAsHTML();

//         // Перевірка, чи є HTML-представлення та чи має елемент стиль
//         if (cueElement && cueElement.style) {
//           cueElement.style.backgroundColor = subtitleCheckbox.checked ? 'rgba(255, 0, 0, 0.5)' : 'transparent';
//         }
//       }
//     }
//   }
// }

// subtitleCheckbox.addEventListener('change', setBackgroundSubtitle);

// Auto scheme
const autoschemeCheckbox = SETTINGS.querySelector('.settings__checkbox--autoscheme');

function setAutoscheme() {
  clearSchemeButtons();

  if (autoschemeCheckbox.checked) {
    setScheme('auto');
  }
};

function clearSchemeButtons() {
  const lightSchemeLabel = FOOTER.querySelector('.footer__scheme[value="light"]').parentNode;
  const darkSchemeLabel = FOOTER.querySelector('.footer__scheme[value="dark"]').parentNode;
  const autoSchemeLabel = FOOTER.querySelector('.footer__scheme[value="auto"]').parentNode;

  if (autoschemeCheckbox.checked) {
    lightSchemeLabel.classList.add('footer__label--hide');
    darkSchemeLabel.classList.add('footer__label--hide');

    setTimeout(() => {
      lightSchemeLabel.classList.add('footer__label--off');
      darkSchemeLabel.classList.add('footer__label--off');
    }, 100);

    setTimeout(() => {
      autoSchemeLabel.classList.remove('footer__label--off');
      setTimeout(() => {
        autoSchemeLabel.classList.remove('footer__label--hide');
      }, 100);
    }, 100);
  } else {
    autoSchemeLabel.classList.add('footer__label--hide');

    setTimeout(() => {
      lightSchemeLabel.classList.remove('footer__label--off');
      darkSchemeLabel.classList.remove('footer__label--off');
      autoSchemeLabel.classList.add('footer__label--off');

      setTimeout(() => {
        lightSchemeLabel.classList.remove('footer__label--hide');
        darkSchemeLabel.classList.remove('footer__label--hide');
      }, 100);
    }, 100);
  }
}

autoschemeCheckbox.addEventListener('change', setAutoscheme);

// Blur
const blurCheckbox = SETTINGS.querySelector('.settings__checkbox--blur');

blurCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    BODY.classList.add('blur');
  } else {
    BODY.classList.remove('blur');
  }
});

// Background
const background = document.querySelector('.background');
const backgroundCheckbox = SETTINGS.querySelector('.settings__checkbox--background');
const backgroundVideo = document.querySelector('.background__video');

function showBackground() {
  if (backgroundCheckbox.checked) {
    background.classList.remove('background--off');
    backgroundVideo.src = VIDEO.src;
    if (videoCurrentTime) {
      backgroundVideo.currentTime = videoCurrentTime;
    }
  } else {
    background.classList.add('background--off');
  }
}

backgroundCheckbox.addEventListener('change', showBackground);

// Series list
const seriesCheckbox = SETTINGS.querySelector('.settings__checkbox--series');
const seriesLabel = SETTINGS.querySelector('.settings__label--series');

function showSeriesList() {
  if (seriesCheckbox.checked) {
    SERIES_LIST.classList.remove('series--off');
  } else {
    SERIES_LIST.classList.add('series--off');
  }
};

seriesCheckbox.addEventListener('change', showSeriesList);

// Scheme
const favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');
const schemeSwitcher = document.querySelector('.footer__switcher');
const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const schemeButton = document.querySelectorAll('.footer__scheme');
const darkScheme = matchMedia('(prefers-color-scheme: dark)').matches;

function setupSwitcher() {
  let savedScheme = getSavedScheme();

  if (savedScheme !== null) {
    updateRadioStates(document.querySelector(`.footer__scheme[value=${savedScheme}]`));
  }

  schemeSwitcher.addEventListener('change', (event) => {
    let selectedScheme = event.target.value;
    setScheme(selectedScheme);
  });
}

function updateRadioStates(activeRadio) {
  [...schemeButton].forEach((radio) => {
    if (radio === activeRadio) {
      radio.checked = true;
      radio.setAttribute('checked', 'checked');
    } else {
      radio.checked = false;
      radio.removeAttribute('checked');
    }
  });
}

let savedScheme;
let systemScheme;

function setupScheme() {
  savedScheme = getSavedScheme();
  systemScheme = getSystemScheme();

  if (savedScheme === null) return;

  if (savedScheme === 'vice') {
    addScheme('vice');
  } else if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
  } else if (savedScheme === 'light') {
    switchMedia('light');
  } else if (savedScheme === 'dark') {
    switchMedia('dark');
  } else if (savedScheme === 'auto') {
    clearSchemeButtons();
  }
}

function setScheme(scheme) {
  switchMedia(scheme);

  if (scheme === 'auto') {
		// clearScheme();
    saveScheme(scheme);
    autoschemeCheckbox.checked = true;
  } else {
    saveScheme(scheme);
    autoschemeCheckbox.checked = false;
  }

  clearSchemeButtons();
  updateRadioStates(document.querySelector(`.footer__scheme[value=${scheme}]`));
}

// Switch media
function switchMedia(scheme) {
  let lightMedia;
  let darkMedia;

  if (scheme === 'auto') {
    lightMedia = '(prefers-color-scheme: light)';
    darkMedia = '(prefers-color-scheme: dark)';
  } else if (scheme === 'light') {
    lightMedia = 'all';
    darkMedia = 'not all';
  } else if (scheme === 'dark') {
    lightMedia = 'not all';
    darkMedia = 'all';
  } else {
    lightMedia = 'not all';
    darkMedia = 'not all';
  }

  [...lightStyles].forEach((link) => {
    link.media = lightMedia;
  });

  [...darkStyles].forEach((link) => {
    link.media = darkMedia;
  });

  if (scheme === 'dark') {
    favicon.href = 'img/favicons/favicon-dark.svg';
  } else {
    favicon.href = 'img/favicons/favicon.svg';
  }

  if (newScheme) {
    newScheme.media = (scheme === 'vice') ? 'all' : 'not all';
  }
}

function getSystemScheme() {
  return darkScheme ? 'dark' : 'light';
}

setupSwitcher();
setupScheme();

// New scheme
let newScheme;

function addScheme(scheme) {
  let newButton = document.querySelector(`.footer__scheme[value=${scheme}]`);
  let newLabel = newButton.parentNode;

  updateRadioStates(newButton);
  newLabel.classList.remove('footer__label--hide');

  newScheme = document.createElement('link');
  newScheme.setAttribute('rel', 'stylesheet');
  newScheme.href = `css/${scheme}.css`;
  document.head.appendChild(newScheme);

  switchMedia(scheme);
  newScheme.setAttribute('media', 'all');

  saveScheme(scheme);
}

// Background
function playBackgroundVideo() {
  backgroundVideo.play();
}

function pauseBackgroundVideo() {
  backgroundVideo.pause();
}

// function updateBackgroundVideo() {
//   backgroundVideo.currentTime = videoCurrentTime;
// }

VIDEO.addEventListener('play', playBackgroundVideo);
VIDEO.addEventListener('pause', pauseBackgroundVideo);
// VIDEO.addEventListener('timeupdate', updateBackgroundVideo);

// Console
const consoleContainer = document.querySelector('.console');
const consoleClose = consoleContainer.querySelector('.console__close');
const consoleBackground = consoleContainer.querySelector('.console__background');
const consoleInput = consoleContainer.querySelector('.console__input');

function openConsole() {
  if (consoleBackground.paused) {
    consoleBackground.play();
  }
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

// Command list
const consoleCommands = {
  'unlimited spider man': {
    videoSrc: 'video/USP-intro.mp4',
    message: 'Відкрито бонусне відео &#128375;',
  },
  'spider man': {
    videoSrc: 'video/SP-intro.mp4',
    message: 'Відкрито бонусне відео &#128375;',
  },
  'vice city': {
    videoSrc: 'video/GTAVC-intro.webm',
    message: 'Розблокована нова тема &#127847;',
    scheme: 'vice',
  },
  'assassins creed 2': {
    videoSrc: 'video/ACII-trailer.mp4',
    message: 'Відкрито бонусне відео &#129413;',
  },
  'tmnt': {
    videoSrc: 'video/TMNT-intro.mp4',
    message: 'Кавабанга &#127829;',
  },
};

function checkBonus(event) {
  if (event.key === 'Enter') {
    resetVideo();

    let command = consoleInput.value.toLowerCase();
    let commandDescription = consoleCommands[command];

    if (commandDescription) {
      VIDEO.src = commandDescription.videoSrc;
      if (commandDescription.scheme) {
        addScheme(commandDescription.scheme);
      }
      closeConsole();
      showMessage(commandDescription.message);
    } else {
      showMessage('Команда неможлива &#128126;');
    }

    if (autoplayFlag) {
      VIDEO.addEventListener('loadeddata', startVideo);
    } else {
      VIDEO.removeEventListener('loadeddata', startVideo);
    }
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

consoleInput.addEventListener('input', stopPropagation);
consoleInput.addEventListener('keyup', stopPropagation);
consoleInput.addEventListener('keyup', checkBonus);

// Open console, dev button
const devButton = FOOTER.querySelector('.footer__copyright--dev');
const MAX_DEV_CLICK_COUNT = 10;
let clickCount = 0;

function devClicks() {
  if (++clickCount >= MAX_DEV_CLICK_COUNT) {
    openConsole();
    clickCount = 0;
  }
}

devButton.addEventListener('click', devClicks);

// CONTROLS
VIDEO.controls = false;

// Pause and play
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

function playVideo() {
  VIDEO.play();
}

function stopVideo() {
  VIDEO.pause();
}

function setPauseIcon() {
  playButtonIcon.classList.remove('control__icon--hide');
  pauseButtonIcon.classList.add('control__icon--hide');
}

function setPlayIcon() {
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
}

playButton.addEventListener('click', pauseVideo);
VIDEO.addEventListener('click', pauseVideo);
VIDEO.addEventListener('pause', setPauseIcon);
VIDEO.addEventListener('play', setPlayIcon);

// Mute
const muteButton = CONTROLS.querySelector('.control__button--mute');
const muteButtonIcon = CONTROLS.querySelector('#muted');

function setMute() {
  if (VIDEO.muted) {
    unmuteVideo();
  } else {
    muteVideo();
  }

  changeMuteIcon();
}

function muteVideo() {
  let savedVolume = VIDEO.volume;

  VIDEO.muted = true;
  volumeRange.value = 0;

  if (savedVolume > 0) {
    savedVolumeBeforeMute = savedVolume;
  }
}

function unmuteVideo() {
  if (savedVolumeBeforeMute >= 0) {
    VIDEO.muted = false;
    VIDEO.volume = savedVolumeBeforeMute;
    volumeRange.value = savedVolumeBeforeMute;
  }
}

function changeMuteIcon() {
  const isMuted = VIDEO.muted;
  muteButtonIcon.classList.toggle('control__icon--unmuted', !isMuted);
  muteButtonIcon.classList.toggle('control__icon--muted', isMuted);
  muteButton.classList.toggle('control__button--active', isMuted);
}

// function changeMuteIcon() {
//   if (VIDEO.muted) {
//     muteButtonIcon.classList.remove('control__icon--unmuted');
//     muteButtonIcon.classList.add('control__icon--muted');
//     muteButton.classList.add('control__button--active');
//   } else {
//     muteButtonIcon.classList.add('control__icon--unmuted');
//     muteButtonIcon.classList.remove('control__icon--muted');
//     muteButton.classList.remove('control__button--active');
//   }
// }

muteButton.addEventListener('click', setMute);

// Volume
VIDEO.volume = 0.5;

const volumeRange = CONTROLS.querySelector('.control__range--volume');

function changeVolume(amount) {
  let changedVolume = Math.max(0, Math.min(1, VIDEO.volume + amount));
  VIDEO.volume = changedVolume;
  volumeRange.value = changedVolume;
  updateVolume();
}

function updateVolume() {
  VIDEO.volume = volumeRange.value;

  if (VIDEO.volume === 0) {
    VIDEO.muted = true;
  } else {
    VIDEO.muted = false;
  }

  changeMuteIcon();
}

volumeRange.addEventListener('input', updateVolume);

// Wheel volume
function wheelVolume(event) {
  event.preventDefault();
  if (typeof event.deltaY !== 'undefined' && !isNaN(event.deltaY)) {
    const delta = -Math.sign(event.deltaY);
    changeVolume(delta * 0.1);
  }
}

volumeRange.addEventListener('wheel', wheelVolume);

// function wheelVolume(event) {
//   event.preventDefault();
//   const delta = -Math.sign(event.deltaY);
//   changeVolume(delta * 0.1);
// };

// volumeRange.addEventListener('wheel', wheelVolume);

// Duration, range
const videoPassed = CONTROLS.querySelector('.control__time--passed');
const videoLeft = CONTROLS.querySelector('.control__time--left');

// function changeDuration() {
//   pauseVideo();
// };

function setDuration() {
  let rangeValue = VIDEO_RANGE.value;

  VIDEO.currentTime = rangeValue;

  videoPassed.innerHTML = formatTime(rangeValue);
  videoLeft.innerHTML = formatTime(videoDuration - rangeValue);

  line.value = rangeValue;
  line.style.width = Math.round((rangeValue / videoDuration) * 100) + '%';
};

function resetDuration() {
  VIDEO_RANGE.value = '0';
  videoPassed.innerHTML = formatTime(0);
  videoLeft.innerHTML = formatTime(0);
  line.style.width = '0%';
  line.value = 0;
}

function formatTime(timeInSeconds) {
  let hours = Math.floor(timeInSeconds / 3600);
  let minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
  let seconds = Math.floor(timeInSeconds - (hours * 3600) - (minutes * 60));

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
}

VIDEO_RANGE.addEventListener('mousedown', stopVideo);
VIDEO_RANGE.addEventListener('input', setDuration);
VIDEO_RANGE.addEventListener('change', playVideo);

// Wheel duration
function wheelDuration(event) {
  event.preventDefault();
  const delta = -Math.sign(event.deltaY);
  let currentValue = parseFloat(VIDEO_RANGE.value);
  let changedValue = currentValue + delta;

  VIDEO_RANGE.value = changedValue;
  VIDEO.currentTime = VIDEO_RANGE.value;
  setDuration();
};

VIDEO_RANGE.addEventListener('wheel', wheelDuration);

// Playback speed
let playbackRate = 1.0;

const SPEED_INCREMENT = 0.25;
const MIN_SPEED = 0.25;
const MAX_SPEED = 2.0;

const speedButton = CONTROLS.querySelector('.control__button--speed');
const speedInfo = speedButton.querySelector('.control__info');

function changeSpeed() {
  playbackRate += SPEED_INCREMENT;

  if (playbackRate > MAX_SPEED) {
    playbackRate = MIN_SPEED;
  }

  VIDEO.playbackRate = playbackRate;

  speedInfo.classList.remove('control__info--hide');
  speedInfo.innerHTML = playbackRate + 'x';

  if (playbackRate !== 1.0) {
    speedButton.classList.add('control__button--active');
  } else {
    speedButton.classList.remove('control__button--active');
    speedInfo.classList.add('control__info--hide');
  }
};

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

// Fit
const fitButton = CONTROLS.querySelector('.control__button--fit');

function changeFitScreen() {
  let currentFit = VIDEO.style.objectFit;
  let changedFit = currentFit === 'cover' ? 'contain' : 'cover';
  VIDEO.style.objectFit = changedFit;

  if (changedFit === 'contain') {
    fitButton.classList.toggle('control__button--active');
    fitButton.setAttribute('aria-label', 'Ростягнути зображення');
    fitButton.setAttribute('title', 'Ростягнути зображення (x)');
  } else {
    fitButton.classList.toggle('control__button--active');
    fitButton.setAttribute('aria-label', 'Зменшити зображення');
    fitButton.setAttribute('title', 'Зменшити зображення (x)');
  }
};

fitButton.addEventListener('click', changeFitScreen);

// Cinema mode
let cinemaFlag = false;

const cinemaButton = CONTROLS.querySelector('.control__button--cinema');

if (BODY.clientWidth > 768) {
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

// Mouse
let hideControlsTimer;

function handleMouseMove() {
  clearTimeout(hideControlsTimer);
  showControls();

  hideControlsTimer = setTimeout(() => {
    hideControls();
  }, 3000);
}

function showControls() {
  statisticsName.classList.remove('video__name--hide');
  VIDEO.style.cursor = 'auto';
  STATISTICS.classList.remove('statistics--hide');
  CONTROLS.classList.remove('control--hide');
}

function hideControls() {
  statisticsName.classList.add('video__name--hide');
  VIDEO.style.cursor = 'none';
  STATISTICS.classList.add('statistics--hide');
  CONTROLS.classList.add('control--hide');
}

function resetHideControlsTimer() {
  clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    hideControls();
  }, 3000);
}

WRAPPER.addEventListener('mousemove', handleMouseMove);
WRAPPER.addEventListener('mouseleave', hideControls);
WRAPPER.addEventListener('mouseenter', resetHideControlsTimer);

// File
const MAX_FILE_SIZE = 5368709120;
const INPUTFILE = document.querySelector('.settings__file');
const INPUTFILE_OUTPUT = document.querySelector('.settings__output');
const supportedFormats = ['video/mp4', 'video/webm', 'video/mkv', 'video/mov'];

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
      seriesLabel.classList.remove('settings__label--hide');
    }
    INPUTFILE_OUTPUT.innerHTML = uploadedVideo[0].name;
    VIDEO.setAttribute('crossorigin', 'anonymous');
    generatingSeries();
    playCurrentVideo();
    showMessage('Кінострічка готова &#127909;');
  }

  INPUTFILE.value = '';
}

function isSupportedFileType(fileType) {
  return supportedFormats.includes(fileType);
}

// Autoplay video list
const prevButton = CONTROLS.querySelector('.control__button--prev');
const nextButton = CONTROLS.querySelector('.control__button--next');

let currentCategory = 'TheWitcher';
let currentSubcategory = 'deep';
let currentVideoIndex = 0;
let data = null;

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
    playCurrentVideo();
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

let currentVideo;

function playCurrentVideo() {
  setPlayIcon();
  stopProgress();
  resetDuration();
  updateActiveButton();

  if (!autoplayFlag) {
    resetVideo();
  }

  if (uploadedVideo.length > 0) {
    currentVideo = uploadedVideo[currentVideoIndex];
  } else {
    currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];
  }

  VIDEO.setAttribute('src', currentVideo.src);
  VIDEO.setAttribute('alt', currentVideo.description);

  if (currentVideo.subtitles) {
    subtitleButton.classList.remove('control__button--off');
  } else {
    subtitleButton.classList.add('control__button--off');
  }
}

function changeVideoIndex(delta) {
  if (uploadedVideo.length > 0) {
    currentVideoIndex += delta;

    if (currentVideoIndex >= uploadedVideo.length) {
      currentVideoIndex = 0;
    } else if (currentVideoIndex < 0) {
      currentVideoIndex = uploadedVideo.length - 1;
    }
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

  playCurrentVideo();
}

nextButton.addEventListener('click', () => changeVideoIndex(1));
prevButton.addEventListener('click', () => changeVideoIndex(-1));
VIDEO.addEventListener('ended', () => changeVideoIndex(1));

// Keyboard
// let keyboardKey;

// window.addEventListener('keyup', (event) => {
//   keyboardKey = event.key;

//   if (isVideoPlaying) {
//     switch (keyboardKey) {
//       // Video
//       case ' ':
//         pauseVideo();
//         break;

//       case 'ArrowLeft':
//         VIDEO.currentTime -= 5;
//         VIDEO_RANGE.value = VIDEO.currentTime;
//         setDuration();
//         break;

//       case 'ArrowRight':
//         VIDEO.currentTime += 5;
//         VIDEO_RANGE.value = VIDEO.currentTime;
//         setDuration();
//         break;

//       case 'ArrowUp':
//         changeVolume(0.1);
//         break;

//       case 'ArrowDown':
//         changeVolume(-0.1);
//         break;

//       case 'm':
//         setMute();
//         break;

//       case 'c':
//         changeSubtitle();
//         break;

//       case 's':
//         changeSpeed();
//         break;

//       case 'p':
//         openPictureInPicture();
//         break;

//       case 'x':
//         changeFitScreen();
//         break;

//       case 'f':
//         setFullscreen();
//         break;
//     }
//   }

//   // Other
//   switch (keyboardKey) {
//     case 'i':
//       openSettings();
//       break;

//     case 'Escape':
//       closeSettings();
//       closeConsole();
//       break;

//     case 'k':
//       startVideo();
//       break;

//     case 'l':
//       setScheme('light');
//       break;

//     case 'd':
//       setScheme('dark');
//       break;

//     case 'a':
//       setScheme('auto');
//       break;

//     case 't':
//       setCinemaMode();
//       break;

//     case '`':
//       openConsole();
//       break;

//     case 'b':
//       showAddControls();
//       break;

//     case '.':
//       changeVideoIndex(1);
//       break;

//     case ',':
//       changeVideoIndex(-1);
//       break;
//   }
// });

const keyHandlers = {
  playPause: ' ',
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
  // Other
  openSettings: 'i',
  closeSettings: 'Escape',
  startVideo: 'k',
  setLightScheme: 'l',
  setDarkScheme: 'd',
  setAutoScheme: 'a',
  setCinemaMode: 't',
  openConsole: '`',
  showAddControls: 'b',
  nextVideoIndex: '.',
  prevVideoIndex: ',',
};

window.addEventListener('keyup', (event) => {
  const keyboardKey = event.key;
  handleKey(keyboardKey, keyHandlers);
});

function handleKey(key, handlers) {
  for (const action in handlers) {
    if (handlers[action] === key) {
      switch (action) {
        case 'playPause':
          pauseVideo();
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
          setMute();
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
          changeFitScreen();
          break;
        case 'toggleFullscreen':
          setFullscreen();
          break;
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
        case 'setAutoScheme':
          setScheme('auto');
          break;
        case 'setCinemaMode':
          setCinemaMode();
          break;
        case 'openConsole':
          openConsole();
          break;
        case 'showAddControls':
          showAddControls();
          break;
        case 'nextVideoIndex':
          changeVideoIndex(1);
          break;
        case 'prevVideoIndex':
          changeVideoIndex(-1);
          break;
      }
    }
  }
}

// Save/Load theme
function saveScheme(scheme) {
	localStorage.setItem('color-scheme', scheme);
}

function clearScheme() {
	localStorage.removeItem('color-scheme');
}

function getSavedScheme() {
	return localStorage.getItem('color-scheme');
}

// Message
let messageTimeout;

function showMessage(message, duration = 3000) {
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }

  // if (VIDEO.error) {
  //   MESSAGE.classList.add('message--error');
  // } else {
  //   MESSAGE.classList.remove('message--error');
  // }

  MESSAGE.classList.remove('message--hide');
  MESSAGE.innerHTML = message;

  if (!MESSAGE.classList.contains('message--animate')) {
    MESSAGE.classList.add('message--animate');
  }

  messageTimeout = setTimeout(clearMessage, duration);
}

function clearMessage() {
  MESSAGE.classList.remove('message--animate');
  MESSAGE.classList.add('message--hide');
}

// Series
// Generating series button
function generatingSeries() {
  SERIES_LIST.innerHTML = '';

  Array.from(uploadedVideo).forEach((file, index) => {
    const li = document.createElement('li');
    li.className = 'series__item';
    const button = document.createElement('button');
    button.className = 'button series__button';
    button.type = 'button';
    button.textContent = file.name;
    li.appendChild(button);
    SERIES_LIST.appendChild(li);

    button.addEventListener('click', () => {
      setActiveButton(button);
			currentVideoIndex = index;
      VIDEO.src = file.url;
    });
  });
}

function setActiveButton(button) {
  const buttons = SERIES_LIST.querySelectorAll('.series__button');
  buttons.forEach(btn => {
    btn.classList.remove('series__button--active');
  });

  button.classList.add('series__button--active');
}

function updateActiveButton() {
  const buttons = SERIES_LIST.querySelectorAll('.series__button');
  buttons.forEach((button, index) => {
    if (index === currentVideoIndex) {
      button.classList.add('series__button--active');
    } else {
      button.classList.remove('series__button--active');
    }
  });
}

// Set Video
let game = null;

const chooseButtons = document.querySelectorAll('.settings__video');

chooseButtons.forEach((element) => {
  element.addEventListener('click', function () {
    game = this.getAttribute('data-video');
    setVideo();
    deepCheckbox.removeAttribute('disabled', 'disabled');
  });
});

function setVideo() {
  VIDEO.src = 'video/' + game + '/' + deepFlag + '.webm';
  VIDEO.preload = 'auto';
}

// Reset video
function resetVideo() {
  VIDEO.pause();
  VIDEO.removeAttribute('src');
  VIDEO.removeAttribute('crossorigin');
  statisticsName.classList.add('video__name--off');
  WRAPPER.className = 'video__wrapper';
  START_BUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--off');
  // STATISTICS.classList.add('statistics--off');
  statisticsUFH.classList.add('header__ufh--off');
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
  // clearSubtitle();
  stopProgress();
  resetDuration();
}

// Start
function startVideo() {
  if (isVideoReadyToPlay()) {
    handleVideoPlay();
  } else {
    handleVideoError();
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

function handleVideoPlay() {
  openButton.classList.remove('header__menu--error');
  START_BUTTON.classList.add('video__start--hide');
  CONTROLS.classList.remove('control--off');

  VIDEO.play();
  VIDEO.focus();

  getStatistics();

  if (autoplayFlag) {
    VIDEO.addEventListener('loadeddata', startVideo);
  }
}

function handleVideoError() {
  openButton.focus();
  openButton.classList.add('header__menu--error');
  setTimeout(() => {
    openButton.classList.remove('header__menu--error');
  }, 2000);

  if (VIDEO.error) {
    showMessage(VIDEO.error.message);
  }
}

START_BUTTON.addEventListener('click', startVideo);

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

// Subtitles
// const subtitles = document.querySelectorAll('.video__subtitle');
// const subtitleButton = CONTROLS.querySelector('.control__button--subtitle');
// const subtitleInfo = subtitleButton.querySelector('.control__info');

// let currentSubtitleIndex = -1;

// function changeSubtitle() {
//   currentSubtitleIndex++;

//   if (currentSubtitleIndex >= subtitles.length) {
//     currentSubtitleIndex = -1;
//     clearSubtitle();
//     return;
//   }

//   clearSubtitle();

//   const currentSubtitle = subtitles[currentSubtitleIndex];

//   currentSubtitle.track.mode = 'showing';
//   currentSubtitle.mode = 'showing';
//   currentSubtitle.default = true;

//   subtitleButton.setAttribute('aria-label', 'Вимкнути субтитри');
//   subtitleButton.setAttribute('title', 'Вимкнути субтитри (c)');
//   subtitleButton.classList.add('control__button--active');
//   subtitleInfo.classList.remove('control__info--hide');
//   subtitleInfo.innerHTML = currentSubtitle.srclang;
// }

// function clearSubtitle() {
//   for (const subtitle of subtitles) {
//     subtitle.track.mode = 'hidden';
//     subtitle.mode = 'hidden';
//     subtitle.default = false;
//   }

//   if (currentSubtitleIndex === -1) {
//     subtitleButton.setAttribute('aria-label', 'Увімкнути субтитри');
//     subtitleButton.setAttribute('title', 'Увімкнути субтитри (c)');
//     subtitleButton.classList.remove('control__button--active');
//     subtitleInfo.classList.add('control__info--hide');
//   }
// }

// subtitleButton.addEventListener('click', changeSubtitle);

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
  subtitleInfo.innerHTML = subtitle.srclang;
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
const tabButtons = SETTINGS.querySelectorAll('.settings__button');
const tabs = SETTINGS.querySelectorAll('.settings__tab');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('settings__button--active'));
    tabs.forEach(tab => {
      tab.classList.remove('settings__tab--active');
      tab.classList.remove('settings__tab--scroll');
      tab.removeAttribute('tabIndex');
    });

    button.classList.add('settings__button--active');

    const tabName = button.getAttribute('data-tab');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).classList.add('settings__tab--active');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).setAttribute('tabIndex', '0');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).focus();

    checkActiveTab();
    updateSettingsHeight();
  });
});

function updateSettingsHeight() {
  let settingsButtonHeight = SETTINGS.querySelector('.settings__control').clientHeight;
  const settingsWrapper = SETTINGS.querySelector('.settings__wrapper');
  let settingsWrapperHeight = settingsWrapper.clientHeight;
  const activeTab = SETTINGS.querySelector('.settings__tab--active');
  let activeTabHeight = activeTab.clientHeight;
  let blockOffset = 90;

  settingsWrapper.style.height = `calc(100vh - ${settingsButtonHeight}px - ${blockOffset}px)`;

  if (activeTabHeight > settingsWrapperHeight) {
    activeTab.classList.add('settings__tab--scroll');
  } else {
    activeTab.classList.remove('settings__tab--scroll');
  }
}

updateSettingsHeight();

function checkActiveTab() {
  if (settingsOpen) {
    let activeTabName = SETTINGS.querySelector('.settings__tab--active').getAttribute('data-tab');

    if (activeTabName === 'scheme') {
      // setTimeout(() => {
        schemeSwitcher.classList.add('footer__switcher--show');
      // }, 200);
    } else {
      schemeSwitcher.classList.remove('footer__switcher--show');
    }
  } else {
    schemeSwitcher.classList.remove('footer__switcher--show');
  }
}

window.addEventListener('resize', updateSettingsHeight);

// Video
let progressInterval;
let playbackQuality;
let currentVideoPassed;
let currentVideoLeft;
let isVideoPlaying = false;

function startProgress() {
  progressInterval = setTimeout(updateProgress, 1000);
  isVideoPlaying = true;
}

function updateProgress() {
  // Buffer
  videoBuffer = Math.round(VIDEO.buffered.end(0));
  statisticsBuffer.innerHTML = videoBuffer;

  videoCurrentTime = Math.round(VIDEO.currentTime);
  VIDEO_RANGE.value = videoCurrentTime;

  // Duration
  currentVideoPassed = formatTime(videoCurrentTime);
  currentVideoLeft = formatTime(videoDuration - videoCurrentTime);
  videoPassed.innerHTML = currentVideoPassed;
  videoLeft.innerHTML = currentVideoLeft;

  startProgress();
  getTime();
  getEndTime();
  extraLine();
}

function stopProgress() {
  clearTimeout(progressInterval);
  isVideoPlaying = false;
}

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);

// Video handler
// Waiting
function waitingVideo() {
  WRAPPER.classList.remove('video__wrapper--pause');
  WRAPPER.classList.add('video__wrapper--waiting');
}

function playingVideo() {
  WRAPPER.classList.remove('video__wrapper--waiting');
}

VIDEO.addEventListener('waiting', waitingVideo);
VIDEO.addEventListener('playing', playingVideo);

// Error
function errorVideo() {
  WRAPPER.classList.add('video__wrapper--error');
  showMessage('Помилка відео &#128528;');
  isVideoPlaying = false;
  resetVideo();
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
