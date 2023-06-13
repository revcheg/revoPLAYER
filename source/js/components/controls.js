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
  let savedVolume = VIDEO.volume;

  if (VIDEO.muted) {
    VIDEO.muted = false;
    VIDEO.volume = savedVolume;
    volumeRange.value = VIDEO.volume;

    if (savedVolume <= 0) {
      VIDEO.volume = 0.5;
      volumeRange.value = 0.5;
    }
  } else {
    VIDEO.muted = true;
    volumeRange.value = 0;
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
  let changedVolume = VIDEO.volume + amount;
  changedVolume = Math.max(0, Math.min(1, changedVolume));
  VIDEO.volume = changedVolume;
  volumeRange.value = changedVolume;
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
  VIDEO.currentTime = VIDEORANGE.value;
  VIDEO.play();

  if (pauseButtonIcon.classList.contains('control__icon--hide')) {
    changePauseIcon();
  }
});

VIDEORANGE.addEventListener('input', function () {
  rangeValue = VIDEORANGE.value;

  currentVideoPassed = formatTime(rangeValue);
  currentVideoLeft = formatTime(videoDuration - rangeValue);

  videoPassed.innerHTML = currentVideoPassed;
  videoLeft.innerHTML = currentVideoLeft;
});

// Zoom
const fillButton = CONTROLS.querySelector('.control__button--fit');

function changeFitscreen() {
  let currentFit = VIDEO.style.objectFit;
  let newFit = currentFit === 'cover' ? 'contain' : 'cover';
  VIDEO.style.objectFit = newFit;

  if (newFit === 'contain') {
    fillButton.setAttribute('aria-label', 'Збільшити зображення');
    fillButton.setAttribute('title', 'Збільшити зображення (z)');
  } else {
    fillButton.setAttribute('aria-label', 'Зменшити зображення');
    fillButton.setAttribute('title', 'Зменшити зображення (z)');
  }
};

fillButton.addEventListener('click', changeFitscreen);

// Full screen
const fullButton = CONTROLS.querySelector('.control__button--size');
const fullButtonSize = CONTROLS.querySelector('.control__icon--size');
const fullButtonMin = CONTROLS.querySelector('.control__icon--min');

function openFullscreen() {
  if (WRAPPER.requestFullscreen) {
    WRAPPER.requestFullscreen();
  } else if (WRAPPER.mozRequestFullScreen) {
    WRAPPER.mozRequestFullScreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  }
}

function changeFullscreen() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
    exitFullscreen();
    fullButton.setAttribute('aria-label', 'На весь екран');
    fullButton.setAttribute('title', 'На весь екран (f)');
    fullButtonSize.classList.toggle('control__icon--hide');
    fullButtonMin.classList.toggle('control__icon--hide');
  } else {
    openFullscreen();
    fullButton.setAttribute('aria-label', 'Закрити повний екран');
    fullButton.setAttribute('title', 'Закрити повний екран (esc)');
    fullButtonSize.classList.toggle('control__icon--hide');
    fullButtonMin.classList.toggle('control__icon--hide');
  }
}

fullButton.addEventListener('click', changeFullscreen);
VIDEO.addEventListener('dblclick', changeFullscreen);

// Mouse
let mouseStoppedTimer;

function handleMouseMove(event) {
  clearTimeout(mouseStoppedTimer);

  const isMouseOnControls = event.target === CONTROLS || CONTROLS.contains(event.target);

  if (!isMouseOnControls) {
    showControls();

    mouseStoppedTimer = setTimeout(() => {
      hideControls();
    }, 3000);
  }
};

function showControls() {
  CONTROLS.style.transform = 'translateY(0)';
  STATISTICS.style.transform = 'translateY(0)';
  statisticsUFH.style.transform = 'translateY(0)';
  VIDEO.style.cursor = 'auto';
};

function hideControls() {
  CONTROLS.style.transform = 'translateY(100%)';
  STATISTICS.style.transform = 'translateY(-100%)';
  statisticsUFH.style.transform = 'translateY(-150%)';
  VIDEO.style.cursor = 'none';
};

WRAPPER.addEventListener("mousemove", handleMouseMove);
WRAPPER.addEventListener("mouseleave", hideControls);

// Touch, object fit
let startX = null;
let startY = null;
let direction;

function handleTouchStart(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
};

function handleTouchMove (event) {
  let currentX = event.touches[0].clientX;
  let currentY = event.touches[0].clientY;

  let deltaX = currentX - startX;
  let deltaY = currentY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      direction = 'right';
    } else {
      direction = 'left';
    }
  } else {
    if (deltaY > 0) {
      direction = 'down';
    } else {
      direction = 'up';
    }
  }

  if (direction === 'right') {
    VIDEO.style.objectFit = 'contain';
  } else if (direction === 'left') {
    VIDEO.style.objectFit = 'cover';
  }

  startX = currentX;
  startY = currentY;
};

function handleTouchEnd() {
  startX = null;
  startY = null;
};

VIDEO.addEventListener('touchstart', handleTouchStart);
VIDEO.addEventListener('touchmove', handleTouchMove);
VIDEO.addEventListener('touchend', handleTouchEnd);
