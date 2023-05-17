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
