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
VIDEO_RANGE.addEventListener('change', pauseVideo);

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
