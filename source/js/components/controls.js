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
const muteButtonIcon = CONTROLS.querySelector('.control__muted');

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
    muteButtonIcon.classList.remove('control__muted--hide');
    muteButton.classList.add('control__button--active');
  } else {
    muteButtonIcon.classList.add('control__muted--hide');
    muteButton.classList.remove('control__button--active');
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

// Wheel volume
function wheelVolume(event) {
  event.preventDefault();
  const delta = -Math.sign(event.deltaY);
  changeVolume(delta * 0.1);
};

volumeRange.addEventListener('wheel', wheelVolume);

// Duration, range
const videoPassed = CONTROLS.querySelector('.control__time--passed');
const videoLeft = CONTROLS.querySelector('.control__time--left');

let rangeValue;

VIDEORANGE.addEventListener('mousedown', function() {
  VIDEO.pause();

  if (playButtonIcon.classList.contains('control__icon--hide')) {
    changePauseIcon();
  }
});

function changeDuration() {
  VIDEO.currentTime = VIDEORANGE.value;
  VIDEO.play();

  if (pauseButtonIcon.classList.contains('control__icon--hide')) {
    changePauseIcon();
  }
};

function setDuration() {
  rangeValue = VIDEORANGE.value;
  line.value = rangeValue;
  line.style.width = Math.round((rangeValue / videoDuration) * 100) + '%';

  currentVideoPassed = formatTime(rangeValue);
  currentVideoLeft = formatTime(videoDuration - rangeValue);

  videoPassed.innerHTML = currentVideoPassed;
  videoLeft.innerHTML = currentVideoLeft;
};

function resetDuration() {
  VIDEORANGE.value = '0';
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

// function formatTime(timeInSeconds) {
//   let hours = Math.floor(timeInSeconds / 3600);
//   let minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
//   let seconds = Math.floor(timeInSeconds - (hours * 3600) - (minutes * 60));

//   let formattedTime = '';

//   if (hours > 0) {
//     formattedTime += hours < 10 ? '0' + hours + ':' : hours + ':';
//   }

//   formattedTime += minutes < 10 ? '0' + minutes + ':' : minutes + ':';
//   formattedTime += seconds < 10 ? '0' + seconds : seconds;

//   return formattedTime;
// }

VIDEORANGE.addEventListener('change', changeDuration);
VIDEORANGE.addEventListener('input', setDuration);

// Wheel duration
function wheelDuration(event) {
  event.preventDefault();
  const delta = -Math.sign(event.deltaY);
  let currentValue = parseFloat(VIDEORANGE.value);
  let changedValue = currentValue + delta;

  VIDEORANGE.value = changedValue;

  changeDuration();
};

VIDEORANGE.addEventListener('wheel', wheelDuration);

// Playback speed
let playbackRate = 1.0;

const speedButton = CONTROLS.querySelector('.control__button--speed');
const speedInfo = speedButton.querySelector('.control__info');

function changeSpeed() {
  playbackRate += 0.25;

  if (playbackRate > 2.0) {
    playbackRate = 1.0;
  }

  VIDEO.playbackRate = playbackRate;

  speedInfo.classList.remove('control__info--hide');
  speedInfo.innerHTML = playbackRate;

  if (playbackRate !== 1.0) {
    speedButton.classList.add('control__button--active');
  } else {
    speedButton.classList.remove('control__button--active');
    speedInfo.classList.add('control__info--hide');
  }
};

speedButton.addEventListener('click', changeSpeed);

// Picture in picture
const pipButton = CONTROLS.querySelector('.control__button--pip');

function openPip() {
  if (document.pictureInPictureElement) {
    VIDEO.setAttribute('disablePictureInPicture', 'disablePictureInPicture');
    document.exitPictureInPicture()
      .then(() => {
        pipButton.classList.remove('control__button--active');
        pipButton.setAttribute('aria-label', 'Міні-програвач');
        pipButton.setAttribute('title', 'Міні-програвач (q)');
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    VIDEO.removeAttribute('disablePictureInPicture');
    VIDEO.requestPictureInPicture()
      .then(() => {
        pipButton.classList.add('control__button--active');
        pipButton.setAttribute('aria-label', 'Закрити міні-програвач');
        pipButton.setAttribute('title', 'Закрити міні-програвач (q)');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function closePip() {
  pipButton.classList.remove('control__button--active');
  VIDEO.setAttribute('disablePictureInPicture', 'disablePictureInPicture');

  if (VIDEO.paused) {
    playButtonIcon.classList.remove('control__icon--hide');
    pauseButtonIcon.classList.add('control__icon--hide');
  } else {
    playButtonIcon.classList.add('control__icon--hide');
    pauseButtonIcon.classList.remove('control__icon--hide');
  }
}

pipButton.addEventListener('click', openPip);
document.addEventListener('leavepictureinpicture', closePip);

// Fit
const fitButton = CONTROLS.querySelector('.control__button--fit');

function changeFitscreen() {
  let currentFit = VIDEO.style.objectFit;
  let changedFit = currentFit === 'cover' ? 'contain' : 'cover';
  VIDEO.style.objectFit = changedFit;

  if (changedFit === 'contain') {
    fitButton.setAttribute('aria-label', 'Ростягнути зображення');
    fitButton.setAttribute('title', 'Ростягнути зображення (x)');
    fitButton.classList.remove('control__button--active');
  } else {
    fitButton.setAttribute('aria-label', 'Зменшити зображення');
    fitButton.setAttribute('title', 'Зменшити зображення (x)');
    fitButton.classList.add('control__button--active');
  }
};

fitButton.addEventListener('click', changeFitscreen);

// Cinema mode
const cinemaButton = CONTROLS.querySelector('.control__button--cinema');

let cinemaFlag = false;

function setCinema() {
  cinemaFlag = !cinemaFlag;

  if (cinemaFlag) {
    cinemaButton.classList.add('control__button--active');
    cinemaButton.setAttribute('aria-label', 'Вийти з режиму кінотеатра');
    cinemaButton.setAttribute('title', 'Вийти з режиму кінотеатра (t)');
    HEADER.classList.add('header--hide');
    FOOTER.classList.add('footer--hide');
    SERIESLIST.classList.add('series--off');
    BODY.style.overflow = 'hidden';
    setTimeout(() => {
      HEADER.style.display = 'none';
      FOOTER.style.display = 'none';
      WRAPPER.classList.add('video__wrapper--cinema');
      MAIN.classList.add('main--cinema');
      VIDEO.focus();
    }, 250);
  } else {
    cinemaButton.classList.remove('control__button--active');
    cinemaButton.setAttribute('aria-label', 'Режим кінотеатру');
    cinemaButton.setAttribute('title', 'Режим кінотеатру (t)');
    HEADER.style.display = 'flex';
    FOOTER.style.display = 'flex';
    if (seriesCheckbox.checked) {
      SERIESLIST.classList.remove('series--off');
    }
    setTimeout(() => {
      HEADER.classList.remove('header--hide');
      FOOTER.classList.remove('footer--hide');
    }, 150);
    BODY.removeAttribute('style');
    WRAPPER.classList.remove('video__wrapper--cinema');
    MAIN.classList.remove('main--cinema');
    VIDEO.blur();
  }
}

cinemaButton.addEventListener('click', setCinema);

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
