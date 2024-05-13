// CONTROLS
VIDEO.controls = false;

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

  backgroundVideo.currentTime = rangeValue;
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

let savedVolume;

function setupMute() {
  if (VIDEO.muted) {
    unmuteVideo();
  } else {
    muteVideo();
  }

  changeMuteIcon();
}

function muteVideo() {
  savedVolume = VIDEO.volume;
  VIDEO.muted = true;
  VIDEO.volume = 0;
  volumeRange.value = 0;
}

function unmuteVideo() {
  VIDEO.muted = false;
  VIDEO.volume = savedVolume || 0.4;
  volumeRange.value = savedVolume;
}

function changeMuteIcon() {
  const isMuted = VIDEO.muted;
  muteButtonIcon.classList.toggle('control__icon--unmuted', !isMuted);
  muteButtonIcon.classList.toggle('control__icon--muted', isMuted);
  muteButton.classList.toggle('control__button--active', isMuted);
}

muteButton.addEventListener('click', setupMute);

// Volume
VIDEO.volume = 0.4;

const volumeRange = CONTROLS.querySelector('.control__range--volume');

function changeVolume(volume) {
  let videoVolume = Math.max(0, Math.min(1, VIDEO.volume + volume));
  VIDEO.volume = videoVolume;
  volumeRange.value = videoVolume;
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

function formatVolume(volume) {
  return (volume * 100).toFixed(0) + '%';
}

function showVolume() {
  showMessage('Гучність ' + formatVolume(VIDEO.volume));
}

volumeRange.addEventListener('input', updateVolume);
VIDEO.addEventListener('volumechange', showVolume);

// Wheel volume
function wheelVolume(event) {
  event.preventDefault();
  if (typeof event.deltaY !== 'undefined' && !isNaN(event.deltaY)) {
    const delta = -Math.sign(event.deltaY);
    changeVolume(delta * 0.1);
  }
}

volumeRange.addEventListener('wheel', wheelVolume);
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
    fitInfo.classList.add('control__info--hide');
  } else {
    fitButton.setAttribute('aria-label', 'Зменшити зображення');
    fitButton.setAttribute('title', 'Зменшити зображення (x)');
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

// Mouse, hide/show controls
let hideControlsTimer;

function handleMouseMove() {
  clearTimeout(hideControlsTimer);
  showControls();

  hideControlsTimer = setTimeout(() => {
    hideControls();
  }, 5000);
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

function resetHideControlsTimer() {
  clearTimeout(hideControlsTimer);
  hideControlsTimer = setTimeout(() => {
    hideControls();
  }, 5000);
}

WRAPPER.addEventListener('touchstart', handleMouseMove);
WRAPPER.addEventListener('touchmove', handleMouseMove);
WRAPPER.addEventListener('touchend', resetHideControlsTimer);

WRAPPER.addEventListener('mouseenter', resetHideControlsTimer);
WRAPPER.addEventListener('mousemove', handleMouseMove);
WRAPPER.addEventListener('mouseleave', hideControls);
