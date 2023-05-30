// CONTROLS
VIDEO.controls = false;

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
const muteButton = CONTROLS.querySelector('.control__button--mute');
const muteButtonIcon = CONTROLS.querySelector('.control__mute');

function muteVideo() {
  let currentVolume = VIDEO.volume;

  if (VIDEO.muted) {
    VIDEO.muted = false;
    VIDEO.volume = currentVolume;
    volumeRange.value = VIDEO.volume;
    
    if (currentVolume <= 0) {
      VIDEO.volume = 0.5;
      volumeRange.value = 0.5;
    }
  } else {
    VIDEO.muted = true;
    volumeRange.value = '0';
  }
}

function changeMuteIcon() {
  if (VIDEO.muted) {
    muteButtonIcon.classList.remove('control__mute');
  } else {
    muteButtonIcon.classList.add('control__mute');
  }
}

muteButton.addEventListener('click', muteVideo);
muteButton.addEventListener('click', changeMuteIcon);

// Volume
VIDEO.volume = 0.5;

const volumeRange = CONTROLS.querySelector('.control__range--volume');

function changeVolume(amount) {
  let newVolume = VIDEO.volume + amount;
  newVolume = Math.max(0, Math.min(1, newVolume));
  VIDEO.volume = newVolume;
  volumeRange.value = newVolume;
  updateVolume();
}

function updateVolume() {
  VIDEO.volume = volumeRange.value;

  if (VIDEO.volume === 0) {
    VIDEO.muted = true;
    changeMuteIcon();
  } else {
    VIDEO.muted = false;
    changeMuteIcon();
  }
}

volumeRange.addEventListener('input', updateVolume);

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

// function fullscreenVideo() {
//   VIDEO.requestFullscreen();
// }

function openFullscreen() {
  if (VIDEO.requestFullscreen) {
    VIDEO.requestFullscreen();
  } else if (VIDEO.mozRequestFullScreen) {
    VIDEO.mozRequestFullScreen();
  } else if (VIDEO.webkitRequestFullscreen) {
    VIDEO.webkitRequestFullscreen();
  } else if (VIDEO.msRequestFullscreen) {
    VIDEO.msRequestFullscreen();
  }
}

// function setupFullscreen() {
//   if (document.fullscreenElement) {
//     CONTROLS.classList.remove('control--hide');
//   } else {
//     CONTROLS.classList.add('control--hide');
//   }
// }

fullButton.addEventListener('click', openFullscreen);
// BODY.addEventListener('fullscreenchange', setupFullscreen);
