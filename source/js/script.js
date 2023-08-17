const BODY = document.querySelector('.body');

const HEADER = document.querySelector('.header');
const FOOTER = document.querySelector('.footer');

const MAIN = document.querySelector('.main');
const VIDEO = document.querySelector('.video');
const WRAPPER = document.querySelector('.video__wrapper');
const SETTINGS = document.querySelector('.settings');
const STATISTICS = document.querySelector('.statistics');
const SERIESLIST = document.querySelector('.series');

const VIDEORANGE = document.querySelector('.control__range--duration');
const STARTBUTTON = document.querySelector('.video__start');
const CONTROLS = document.querySelector('.control');

const ERROR = document.querySelector('.error');

// const backgroundVideo = document.querySelector('.video__background');

// Console
const consoleContainer = document.querySelector('.console');
const consoleInput = consoleContainer.querySelector('.console__input');
const consoleBackground = consoleContainer.querySelector('.console__background');

function openConsole() {
  consoleBackground.src = 'video/console.mp4';
  consoleBackground.play();
  consoleContainer.classList.remove('console--hide');
}

function closeConsole() {
	consoleContainer.classList.add('console--hide');
	consoleInput.value = '';
}

let bonusURL;

function checkBonus(event) {
  if (event.key === 'Enter') {
    resetVideo();

    switch (consoleInput.value) {
      case 'unlimited spider man':
        bonusURL = 'video/USP-intro.mp4';
        setBonusVideo(bonusURL);
        closeConsole();
        showError('Відкрито бонусне відео &#128375;');
        break;

      case 'spider man':
        bonusURL = 'video/SP-intro.mp4';
        setBonusVideo(bonusURL);
        closeConsole();
        showError('Відкрито бонусне відео &#128375;');
        break;

      case 'vice city':
				bonusURL = 'video/GTAVC-intro.webm';
        setBonusVideo(bonusURL);
        addScheme('vice');
        closeConsole();
        showError('Розблокована нова тема &#127847;');
        break;

      default:
        showError('Команда неможлива &#128126;');
    }

    if (autoplayFlag) {
      VIDEO.addEventListener('loadeddata', startVideo);
    } else {
      VIDEO.removeEventListener('loadeddata', startVideo);
    }
  }
}

function setBonusVideo(bonusURL) {
  // currentVideo = data.bonus.main[0];
  // currentVideo.src = bonusURL;
  VIDEO.src = bonusURL;
  subtitleButton.classList.add('control__button--off');
}

function stopPropagation(event) {
  event.stopPropagation();
}

consoleInput.addEventListener('input', stopPropagation);
consoleInput.addEventListener('keyup', stopPropagation);
consoleInput.addEventListener('keyup', checkBonus);

const devButton = document.querySelector('.footer__copyright--dev');

let clickCount = 0;

function handleDevClick() {
  clickCount++;

  if (clickCount >= 10) {
    openConsole();
    clickCount = 0;
  }
}

devButton.addEventListener('click', handleDevClick);

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
  speedInfo.innerHTML = playbackRate + 'x';

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

function changeFitScreen() {
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

function checkFitScreen() {
  if (videoWidth < WRAPPER.clientWidth || videoWidth < BODY.clientWidth) {
    fitButton.classList.remove('control__button--off');
  } else {
    fitButton.classList.add('control__button--off');
  }
};

fitButton.addEventListener('click', changeFitScreen);

// Cinema mode
const cinemaButton = CONTROLS.querySelector('.control__button--cinema');

if (BODY.clientWidth > 768) {
  cinemaButton.classList.remove('control__button--off');
}

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
  CONTROLS.classList.remove('control--hide');
  STATISTICS.classList.remove('statistics--hide');
  statisticsUFH.classList.remove('statistics__ufh--hide');
  VIDEO.style.cursor = 'auto';
};

function hideControls() {
  CONTROLS.classList.add('control--hide');
  STATISTICS.classList.add('statistics--hide');
  statisticsUFH.classList.add('statistics__ufh--hide');
  VIDEO.style.cursor = 'none';
};

WRAPPER.addEventListener("mousemove", handleMouseMove);
WRAPPER.addEventListener("mouseleave", hideControls);

// Error
let errorTimeout;

function showError(errorMessage) {
  clearTimeout(errorTimeout);

  ERROR.classList.remove('error--hide');
  ERROR.innerHTML = errorMessage;

  if (!ERROR.classList.contains('error--animate')) {
    ERROR.classList.add('error--animate');
  }

  errorTimeout = setTimeout(() => {
    ERROR.classList.remove('error--animate');
    ERROR.classList.add('error--hide');
  }, 3000);
}

// File
const INPUTFILE = document.querySelector('.settings__file');

let selectedVideos = [];

function handleFileSelection(event) {
  let files = event.target.files;

  SERIESLIST.innerHTML = '';

  Array.from(files).forEach((file, index) => {
    let fileUrl = URL.createObjectURL(file);
    let fileDescription = file.name;

    selectedVideos.push({
      file: file,
      url: fileUrl,
      name: file.name,
      type: file.type,
      size: file.size
    });

    const li = document.createElement('li');
    li.className = 'series__item';
    const button = document.createElement('button');
    button.className = 'button series__button';
    button.type = 'button';
    button.textContent = fileDescription;
    li.appendChild(button);
    SERIESLIST.appendChild(li);

    button.addEventListener('click', () => {
      currentVideoIndex = index;
      playCurrentVideo();
      setActiveButton(button);
      VIDEO.src = fileUrl;
    });

    if (index === 0) {
      button.classList.add('series__button--active');
    }
  });

  validateFiles(selectedVideos);
}

INPUTFILE.addEventListener('change', resetVideo);
INPUTFILE.addEventListener('change', handleFileSelection);

// Validate
let fileSize;
let fileType;
const MAX_FILE_SIZE = 5368709120;

function validateFiles(videos) {
  videos.forEach(video => {
    fileSize = video.file.size;
    fileType = video.file.type;

    if (fileSize > MAX_FILE_SIZE) {
      showError('Файл завеликий &#128548;');
      INPUTFILE.value = '';
    } else {
      if (!isSupportedFileType(fileType)) {
        showError('Непідтримуваний тип файлу &#128552;');
        INPUTFILE.value = '';
      } else {
        showError('Відео обрано, готові грати &#128526;');
        VIDEO.setAttribute('crossorigin', 'anonymous');
        playCurrentVideo();
      }
    }
  });
}

function isSupportedFileType(fileType) {
  let supportedFormats = ['video/mp4', 'video/webm', 'video/mkv', 'video/mov'];
  return supportedFormats.includes(fileType);
}

// Autoplay video list
const prevButton = CONTROLS.querySelector('.control__button--prev');
const nextButton = CONTROLS.querySelector('.control__button--next');

let currentCategory = 'TheWitcher';
let currentSubcategory = 'deep';
let currentVideoIndex = 0;
let data = null;

fetch('videos.json')
  .then(response => {
    if (!response.ok) {
      showError('Помилка загрузки json &#128531;');
      throw new Error('Failed to load videos.json');
    }
    return response.json();
  })
  .then(videoData => {
    data = videoData;
    currentCategory = 'TheWitcher';
    currentSubcategory = 'deep';
    currentVideoIndex = 0;

    playCurrentVideo();
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

let currentVideo;

function playCurrentVideo() {
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');

  stopProgress();
  resetDuration();
  updateActiveButton();

  if (selectedVideos.length > 0) {
    currentVideo = selectedVideos[currentVideoIndex];
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

function nextVideo() {
  if (selectedVideos.length > 0) {
    currentVideoIndex++;

    if (currentVideoIndex >= selectedVideos.length) {
      currentVideoIndex = 0;
    }
  } else {
    currentVideoIndex++;

    if (currentVideoIndex >= data[currentCategory][currentSubcategory].length) {
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

function previousVideo() {
  if (selectedVideos.length > 0) {
    currentVideoIndex--;

    if (currentVideoIndex < 0) {
      currentVideoIndex = selectedVideos.length - 1;
    }
  } else {
    if (currentVideoIndex > 0) {
      currentVideoIndex--;
    } else {
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
    }
  }
  playCurrentVideo();
}

nextButton.addEventListener('click', nextVideo);
prevButton.addEventListener('click', previousVideo);

VIDEO.addEventListener('ended', nextVideo);

// Keyboard
let videoKey;

window.addEventListener('keyup', (event) => {
  videoKey = event.key;

  if (isVideoPlaying) {
    switch (videoKey) {
      // Video
      case ' ':
        pauseVideo();
        changePauseIcon();
        break;

      case 'ArrowLeft':
        VIDEO.currentTime -= 5;
        VIDEORANGE.value = VIDEO.currentTime;
        setDuration();
        break;

      case 'ArrowRight':
        VIDEO.currentTime += 5;
        VIDEORANGE.value = VIDEO.currentTime;
        setDuration();
        break;

      case 'ArrowUp':
        changeVolume(0.1);
        break;

      case 'ArrowDown':
        changeVolume(-0.1);
        break;

      case 'm':
        muteVideo();
        changeMuteIcon();
        break;

      case 'c':
        changeSubtitle();
        break;

      case 's':
        changeSpeed();
        break;

      case 'q':
        openPip();
        break;

      case 'x':
        changeFitScreen();
        break;

      case 'f':
        changeFullscreen();
        break;

      case ',':
        previousVideo();
        break;

      case '.':
        nextVideo();
        break;
    }
  }

  // Other
  switch (videoKey) {
    case 'i':
      openSettings();
      break;

    case 'Escape':
      closeSettings();
      closeConsole();
      break;

    case 'p':
      startVideo();
      break;

    case 'l':
      setScheme('light');
      break;

    case 'd':
      setScheme('dark');
      break;

    case 'a':
      setScheme('auto');
      break;

    case 't':
      setCinema();
      break;

    case '`':
      openConsole();
      break;
  }
});

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

// Scheme
const favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');
const schemeSwitcher = document.querySelector('.footer__switcher');
const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const schemeRadios = document.querySelectorAll('.footer__scheme');
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

  [...schemeRadios].forEach((radio) => {
    radio.addEventListener('change', (event) => {
      let selectedScheme = event.target.value;
      setScheme(selectedScheme);
    });
  });
}

function updateRadioStates(activeRadio) {
  [...schemeRadios].forEach((radio) => {
    if (radio === activeRadio) {
      radio.checked = true;
      radio.setAttribute('checked', 'checked');
      radio.disabled = true;
    } else {
      radio.checked = false;
      radio.removeAttribute('checked');
      radio.disabled = false;
    }
  });
}

function setupScheme() {
  const savedScheme = getSavedScheme();
  const systemScheme = getSystemScheme();

  if (savedScheme === null) return;

  if (savedScheme === 'vice') {
    addScheme('vice');
  } else if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
  } else if (savedScheme === 'light') {
    switchMedia('light');
  } else if (savedScheme === 'dark') {
    switchMedia('dark');
  }
}

function setScheme(scheme) {
  switchMedia(scheme);

  if (scheme === 'auto') {
    clearScheme();
  } else {
    saveScheme(scheme);
  }

  updateRadioStates(document.querySelector(`.footer__scheme[value=${scheme}]`));
}

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

// Series
function setActiveButton(button) {
  const buttons = SERIESLIST.querySelectorAll('.series__button');
  buttons.forEach(btn => {
    btn.classList.remove('series__button--active');
  });

  button.classList.add('series__button--active');
}

function updateActiveButton() {
  const buttons = SERIESLIST.querySelectorAll('.series__button');
  buttons.forEach((button, index) => {
    if (index === currentVideoIndex) {
      button.classList.add('series__button--active');
    } else {
      button.classList.remove('series__button--active');
    }
  });
}

// Set Video
let game;

const chooseButtons = document.querySelectorAll('.settings__video');

chooseButtons.forEach((element) => {
  element.addEventListener('click', function () {
    game = this.getAttribute('data-video');
    // resetVideo();
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
  WRAPPER.className = 'video__wrapper';
  STARTBUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--off');
  STATISTICS.classList.add('statistics--off');
  statisticsUFH.classList.add('statistics--off');
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
  clearSubtitle();
  stopProgress();
  resetDuration();
}

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
}

function closeSettings() {
  settingsOpen = false;
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

function showAddCheckbox(event) {
  const checked = event.currentTarget.checked;

  STATISTICS.classList.toggle('statistics--off', !checked);
  statisticsAdditional.classList.toggle('settings__label--hide', !checked);
  statisticsAdditionalCheckbox.disabled = !checked;

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

// Blur
const blurCheckbox = SETTINGS.querySelector('.settings__checkbox--blur');

blurCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    BODY.classList.add('blur');
  } else {
    BODY.classList.remove('blur');
  }
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
  additionalControls.forEach(control => {
    if (controlsCheckbox.checked) {
      control.classList.remove('control__button--hide');
      control.removeAttribute('disabled');
    } else {
      control.classList.add('control__button--hide');
      control.setAttribute('disabled', 'disabled');
    }
  });
};

controlsCheckbox.addEventListener('change', showAddControls);

// Autoplay
let autoplayFlag = true;
const autoplayCheckbox = SETTINGS.querySelector('.settings__checkbox--autoplay');

function setAutoplay() {
  if (autoplayCheckbox.checked) {
    autoplayFlag = true;
  } else {
    autoplayFlag = false;
  }
};

autoplayCheckbox.addEventListener('change', setAutoplay);

// Series list
const seriesCheckbox = SETTINGS.querySelector('.settings__checkbox--series');

function showSeriesList() {
  if (seriesCheckbox.checked) {
    SERIESLIST.classList.remove('series--off');
  } else {
    SERIESLIST.classList.add('series--off');
  }
};

seriesCheckbox.addEventListener('change', showSeriesList);

// Start
let isVideoPlaying = false;

function startVideo() {
  if (!VIDEO.hasAttribute('src') || VIDEO.src === '' || VIDEO.error) {
    openButton.focus();
    openButton.classList.add('header__menu--error');
    setTimeout(() => {
      openButton.classList.remove('header__menu--error');
    }, 2000);

    if (VIDEO.error) {
      showError(VIDEO.error.message);
    }
  } else if (VIDEO.readyState >= VIDEO.HAVE_CURRENT_DATA || VIDEO.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
    openButton.classList.remove('header__menu--error');
    STARTBUTTON.classList.add('video__start--hide');
    CONTROLS.classList.remove('control--off');

    VIDEO.play();
    VIDEO.focus();

    isVideoPlaying = true;

    getStatistics();

    if (autoplayFlag) {
      VIDEO.addEventListener('loadeddata', startVideo);
    } else {
      VIDEO.removeEventListener('loadeddata', startVideo);
    }
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
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

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

  if (fileType) {
    videoFormat = fileType.replace('video/', '');
  } else {
    videoFormat = VIDEO.src.split('.').pop();
  }

  videoWidth = VIDEO.videoWidth;
  videoHeight = VIDEO.videoHeight;
  videoDuration = Math.round(VIDEO.duration);
  VIDEORANGE.setAttribute('max', videoDuration);

  checkFitScreen();
  setStatistics();
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

// FPS
// let framesRendered = 0;
// let startTime = null;

// function countFrames() {
//   if (!startTime) {
//     startTime = performance.now();
//   }

//   framesRendered++;

//   if (performance.now() - startTime >= 1000) {
//     videoFPS = framesRendered / ((performance.now() - startTime) / 1000);
//     statisticsFPS.innerHTML = Math.round(videoFPS);
//     framesRendered = 0;
//     startTime = null;
//   }

//   requestAnimationFrame(countFrames);
// }

// VIDEO.addEventListener('play', countFrames);

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
const subtitles = document.querySelectorAll('.video__subtitle');
const subtitleButton = CONTROLS.querySelector('.control__button--subtitle');
const subtitleInfo = subtitleButton.querySelector('.control__info');

let currentSubtitleIndex = -1;

function changeSubtitle() {
  currentSubtitleIndex++;

  if (currentSubtitleIndex >= subtitles.length) {
    currentSubtitleIndex = -1;
    clearSubtitle();
    return;
  }

  clearSubtitle();

  const currentSubtitle = subtitles[currentSubtitleIndex];

  currentSubtitle.track.mode = 'showing';
  currentSubtitle.mode = 'showing';
  currentSubtitle.default = true;

  subtitleButton.setAttribute('aria-label', 'Вимкнути субтитри');
  subtitleButton.setAttribute('title', 'Вимкнути субтитри (c)');
  subtitleButton.classList.add('control__button--active');
  subtitleInfo.classList.remove('control__info--hide');
  subtitleInfo.innerHTML = currentSubtitle.srclang;
}

function clearSubtitle() {
  for (const subtitle of subtitles) {
    subtitle.track.mode = 'hidden';
    subtitle.mode = 'hidden';
    subtitle.default = false;
  }

  if (currentSubtitleIndex === -1) {
    subtitleButton.setAttribute('aria-label', 'Увімкнути субтитри');
    subtitleButton.setAttribute('title', 'Увімкнути субтитри (c)');
    subtitleButton.classList.remove('control__button--active');
    subtitleInfo.classList.add('control__info--hide');
  }
}

subtitleButton.addEventListener('click', changeSubtitle);

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

  // if (windowWidth > 768) {
  //   blockOffset = 0;
  // }

  settingsWrapper.style.height = `calc(100vh - ${settingsButtonHeight}px - ${blockOffset}px)`;

  if (activeTabHeight > settingsWrapperHeight) {
    activeTab.classList.add('settings__tab--scroll');
  } else {
    activeTab.classList.remove('settings__tab--scroll');
  }
}

updateSettingsHeight();

window.addEventListener('resize', updateSettingsHeight);

// Video
let progressInterval;
let playbackQuality;
let currentVideoPassed;
let currentVideoLeft;

function startProgress() {
  progressInterval = setTimeout(updateProgress, 1000);
}

function updateProgress() {
  // Buffer
  videoBuffer = Math.round(VIDEO.buffered.end(0));
  statisticsBuffer.innerHTML = videoBuffer;

  videoCurrentTime = Math.round(VIDEO.currentTime);
  VIDEORANGE.value = videoCurrentTime;

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
}

function stopPlaying() {
  isVideoPlaying = false;
}

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);
VIDEO.addEventListener('ended', stopPlaying);

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
  showError('Помилка відео &#128528;');
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
