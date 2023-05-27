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
const volumeWrapper = CONTROLS.querySelector('.control__box');
const volumeRange = CONTROLS.querySelector('.control__volume');

function muteVideo() {
  muteButtonIcon.classList.toggle('control__mute');
  
  if (VIDEO.muted) {
    VIDEO.muted = false;
  } else {
    VIDEO.muted = true;
  }
}

function showVolume() {
  volumeRange.classList.remove('control__volume--hide');
}

function hideVolume() {
  volumeRange.classList.add('control__volume--hide');
}

muteButton.addEventListener('click', muteVideo);
volumeWrapper.addEventListener('mousemove', showVolume);
volumeWrapper.addEventListener('mouseleave', hideVolume);

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
