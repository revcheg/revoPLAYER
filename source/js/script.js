const BODY = document.querySelector('.body');

const VIDEO = document.querySelector('.video');
const WRAPPER = document.querySelector('.video__wrapper');
const SETTINGS = document.querySelector('.settings');
const STATISTICS = document.querySelector('.statistics');

const VIDEORANGE = document.querySelector('.control__range--duration');

const STARTBUTTON = document.querySelector('.video__start');
const CONTROLS = document.querySelector('.control');

const ERROR = document.querySelector('.error');

// const backgroundVideo = document.querySelector('.video__background');

// const castButton = CONTROLS.querySelector('.control__button--cast');

// function castVideo () {
//   const castSessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
//   chrome.cast.requestSession(
//     (castSession) => {
//       const mediaInfo = new chrome.cast.media.MediaInfo(videoPlayer.src);
//       const request = new chrome.cast.media.LoadRequest(mediaInfo);
//       castSession.loadMedia(request);
//     },
//     (error) => {
//       console.log(error);
//     },
//     castSessionRequest
//   );
// };

// castButton.addEventListener('click', castVideo);

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

// Playback speed
const speedButton = CONTROLS.querySelector('.control__button--speed');
let playbackRate = 1.0;

function changeSpeed() {
  playbackRate += 0.25;

  if (playbackRate > 2.0) {
    playbackRate = 1.0;
  }

  VIDEO.playbackRate = playbackRate;
};

speedButton.addEventListener('click', changeSpeed);

// Fit
const fitButton = CONTROLS.querySelector('.control__button--fit');

function changeFitscreen() {
  let currentFit = VIDEO.style.objectFit;
  let changedFit = currentFit === 'cover' ? 'contain' : 'cover';
  VIDEO.style.objectFit = changedFit;

  if (changedFit === 'contain') {
    fitButton.setAttribute('aria-label', 'Ростягнути зображення');
    fitButton.setAttribute('title', 'Ростягнути зображення (x)');
  } else {
    fitButton.setAttribute('aria-label', 'Зменшити зображення');
    fitButton.setAttribute('title', 'Зменшити зображення (x)');
  }
};

fitButton.addEventListener('click', changeFitscreen);

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

// Error
function showError(errorMessage) {
  ERROR.classList.remove('error--hide');
  ERROR.innerHTML = errorMessage;

  setTimeout(() => {
    ERROR.classList.add('error--hide');
  }, 2000)
}

// File
const INPUTFILE = document.querySelector('.settings__file');

let selectedVideos = [];

function handleFileSelection(event) {
  let files = event.target.files;

  Array.from(files).forEach(file => {
    let fileUrl = URL.createObjectURL(file);

    selectedVideos.push({
      file: file,
      url: fileUrl,
      name: file.name,
      type: file.type,
      size: file.size
    });
  });

  validateFiles(selectedVideos);
};

INPUTFILE.addEventListener('click', resetVideo);
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
      showError('Файл завеликий');
      INPUTFILE.value = '';
    } else {
      if (!isSupportedFileType(fileType)) {
        showError('Непідтримуваний тип файлу');
        INPUTFILE.value = '';
      } else {
        VIDEO.setAttribute('crossorigin', 'anonymous');
        playCurrentVideo();
      }
    }
  });
};

function isSupportedFileType(fileType) {
  let supportedFormats = ['video/mp4', 'video/webm', 'video/mov'];
  return supportedFormats.includes(fileType);
};

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


function playCurrentVideo() {
  let currentVideo;

  if (selectedVideos.length > 0) {
    currentVideo = selectedVideos[currentVideoIndex];
  } else {
    currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];
  }

  VIDEO.setAttribute('src', currentVideo.url);
  VIDEO.setAttribute('alt', currentVideo.description);

  VIDEO.addEventListener('error', () => {
    showError('Не вдалося завантажити відео &#128531;');
  });
};

function nextVideo() {
  resetVideo();
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
  resetVideo();
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

prevButton.addEventListener('click', previousVideo);
nextButton.addEventListener('click', nextVideo);

// // Autoplay video list
// const prevButton = CONTROLS.querySelector('.control__button--prev');
// const nextButton = CONTROLS.querySelector('.control__button--next');

// let currentCategory = 'TheWitcher';
// let currentSubcategory = 'deep';
// let currentVideoIndex = 0;
// let data = null;

// fetch('videos.json')
//   .then(response => {
//     if (!response.ok) {
//       showError('Помилка загрузки json &#128531;');
//       throw new Error('Failed to load videos.json');
//     }
//     return response.json();
//   })
//   .then(videoData => {
//     data = videoData;
//     currentCategory = 'TheWitcher';
//     currentSubcategory = 'deep';
//     currentVideoIndex = 0;

//     playCurrentVideo();
//   })
//   .catch(error => {
//     console.error('An error occurred:', error);
//   });

// function nextVideo() {
//   resetVideo();
//   if (selectedVideos.length > 0) {
//     currentVideoIndex++;

//     if (currentVideoIndex >= selectedVideos.length) {
//       currentVideoIndex = 0;
//     }

//     playSelectedVideo();
//   } else {
//     currentVideoIndex++;

//     if (currentVideoIndex >= data[currentCategory][currentSubcategory].length) {
//       const subcategories = Object.keys(data[currentCategory]);
//       const currentSubcategoryIndex = subcategories.indexOf(currentSubcategory);

//       if (currentSubcategoryIndex < subcategories.length - 1) {
//         currentSubcategory = subcategories[currentSubcategoryIndex + 1];
//         currentVideoIndex = 0;
//       } else {
//         const categories = Object.keys(data);
//         const currentCategoryIndex = categories.indexOf(currentCategory);

//         if (currentCategoryIndex < categories.length - 1) {
//           currentCategory = categories[currentCategoryIndex + 1];
//           currentSubcategory = Object.keys(data[currentCategory])[0];
//           currentVideoIndex = 0;
//         } else {
//           currentCategory = categories[0];
//           currentSubcategory = Object.keys(data[currentCategory])[0];
//           currentVideoIndex = 0;
//         }
//       }
//     }
//     playCurrentVideo();
//   }
// }

// function previousVideo() {
//   resetVideo();
//   if (selectedVideos.length > 0) {
//     currentVideoIndex--;

//     if (currentVideoIndex < 0) {
//       currentVideoIndex = selectedVideos.length - 1;
//     }

//     playSelectedVideo();
//   } else {

//     if (currentVideoIndex > 0) {
//       currentVideoIndex--;
//     } else {
//       const subcategories = Object.keys(data[currentCategory]);
//       const currentSubcategoryIndex = subcategories.indexOf(currentSubcategory);

//       if (currentSubcategoryIndex > 0) {
//         currentSubcategory = subcategories[currentSubcategoryIndex - 1];
//         currentVideoIndex = data[currentCategory][currentSubcategory].length - 1;
//       } else {
//         const categories = Object.keys(data);
//         const currentCategoryIndex = categories.indexOf(currentCategory);

//         if (currentCategoryIndex > 0) {
//           currentCategory = categories[currentCategoryIndex - 1];
//           const previousSubcategory = Object.keys(data[currentCategory]).pop();
//           currentSubcategory = previousSubcategory;
//           currentVideoIndex = data[currentCategory][previousSubcategory].length - 1;
//         } else {
//           currentCategory = categories[categories.length - 1];
//           const previousSubcategory = Object.keys(data[currentCategory]).pop();
//           currentSubcategory = previousSubcategory;
//           currentVideoIndex = data[currentCategory][previousSubcategory].length - 1;
//         }
//       }
//     }
//     playCurrentVideo();
//   }
// }

// function playCurrentVideo() {
//   const currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];
//   // const videoTitle = currentVideo.title;
//   const videoUrl = currentVideo.url;
//   const videoDescription = currentVideo.description;

//   // VIDEO.setAttribute('title', videoTitle);
//   VIDEO.setAttribute('src', videoUrl);
//   VIDEO.setAttribute('alt', videoDescription);
// }

// prevButton.addEventListener('click', previousVideo);
// nextButton.addEventListener('click', nextVideo);

// Keyboard
let videoKey;

// Video
VIDEO.addEventListener('keyup', (event) => {
  videoKey = event.key;

  switch (videoKey) {
    case ' ':
      pauseVideo();
      changePauseIcon();
      break;

    case 'ArrowLeft':
      VIDEO.currentTime -= 5;
      VIDEORANGE.value = VIDEO.currentTime;
      break;

    case 'ArrowRight':
      VIDEO.currentTime += 5;
      VIDEORANGE.value = VIDEO.currentTime;
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

    case 's':
      changeSpeed();
      break;

    case 'x':
      changeFitscreen();
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
});

// Other
BODY.addEventListener('keyup', (event) => {
  videoKey = event.key;

  switch (videoKey) {
    case 'i':
      openSettings();
      break;

    case 'Escape':
      closeSettings();
      break;

    case 'p':
      startVideo();
      break;

    case 'l':
      setScheme('light');
      setupSwitcher();
      break;

    case 'd':
      setScheme('dark');
      setupSwitcher();
      break;

    case 'a':
      setScheme('auto');
      setupSwitcher();
      break;
  }
});

// Save/Load theme
function saveScheme(scheme) {
	localStorage.setItem('color-scheme', scheme);
}

function getSavedScheme() {
	return localStorage.getItem('color-scheme');
}

function clearScheme() {
	localStorage.removeItem('color-scheme');
}

// // Scheme
// let scheme = 'light';
// let buttonIndex;

// const themeButtons = document.querySelectorAll('.footer__theme');

// // Check client scheme
// if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//   scheme = 'dark';
// } else {
//   scheme = 'light';
// }

// // Set button
// themeButtons.forEach(function (button, index) {
//   button.addEventListener('click', function () {
//     buttonIndex = Array.from(themeButtons).indexOf(button);
//     scheme = this.getAttribute('data-theme');

//     setButton(buttonIndex);
//     setScheme(scheme);
//     saveScheme(scheme);
//   });
// });

// function setButton() {
//   themeButtons.forEach((button) => {
//     button.removeAttribute('disabled');
//     button.classList.remove('footer__theme--active');
//   });

//   themeButtons[buttonIndex].setAttribute('disabled', 'disabled');
//   themeButtons[buttonIndex].classList.add('footer__theme--active');
// }

// // Set scheme
// let favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');

// function setScheme(scheme) {
//   BODY.className = '';

//   switch (scheme) {
//     case 'light':
//       BODY.classList.add(scheme);
//       buttonIndex = 0;
//       favicon.href = 'img/favicons/favicon.svg'
//       break;

//     case 'dark':
//       BODY.classList.add(scheme);
//       buttonIndex = 1;
//       favicon.href = 'img/favicons/favicon-dark.svg'
//       break;

//     case 'cyberpunk':
//       BODY.classList.add(scheme);
//       buttonIndex = 2;
//       break;
//   }
// }

// setScheme(scheme);
// setButton(buttonIndex);

// loadScheme();

// Scheme BETA
const favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');

const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');

const schemeRadios = document.querySelectorAll('.footer__scheme');
const darkScheme = matchMedia('(prefers-color-scheme: dark)').matches;

function setupSwitcher() {
  const savedScheme = getSavedScheme();

  if (savedScheme !== null) {
    const currentRadio = document.querySelector(`.footer__scheme[value=${savedScheme}]`);
    currentRadio.checked = true;
  } else {
		const currentRadio = document.querySelector(`.footer__scheme[value=auto]`);
		currentRadio.checked = true;
	}

  [...schemeRadios].forEach((radio) => {
    radio.addEventListener('change', (event) => {
			setScheme(event.target.value);
    });
  });
}

function setupScheme() {
  const savedScheme = getSavedScheme();
  const systemScheme = getSystemScheme();

  if (savedScheme === null) return;

  if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
  }
}

function setScheme(scheme) {
  switchMedia(scheme);

  if (scheme === 'auto') {
    clearScheme();
  } else {
    saveScheme(scheme);
  }
}

function switchMedia(scheme) {
	let lightMedia;
	let darkMedia;

	if (scheme === 'auto') {
		lightMedia = '(prefers-color-scheme: light)';
		darkMedia = '(prefers-color-scheme: dark)';
	} else {
		lightMedia = (scheme === 'light') ? 'all' : 'not all';
		darkMedia = (scheme === 'dark') ? 'all' : 'not all';
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
}

function getSystemScheme() {
	return darkScheme ? 'dark' : 'light';
}

setupSwitcher();
setupScheme();

// Set Video
let game;

const chooseButtons = document.querySelectorAll('.settings__video');

chooseButtons.forEach((element) => {
  element.addEventListener('click', function () {
    game = this.getAttribute('data-video');
    resetVideo();
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
  VIDEO.load();
  VIDEO.removeAttribute('crossorigin');
  WRAPPER.className = 'video__wrapper';
  STARTBUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--hide');
  STATISTICS.classList.add('statistics--hide');
  statisticsUFH.classList.add('statistics--off');

  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');

  stopProgress();
  resetDuration();
}

// Settings
const openButton = document.querySelector('.header__menu');
const closeButton = SETTINGS.querySelector('.settings__close');

function openSettings() {
  SETTINGS.classList.remove('settings--hide');
  SETTINGS.focus();
}

function closeSettings() {
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

statisticsCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    STATISTICS.classList.remove('statistics--off');
    statisticsAdditional.classList.remove('settings__label--hide');
    statisticsAdditionalCheckbox.removeAttribute('disabled');
  } else {
    STATISTICS.classList.add('statistics--off');
    statisticsAdditional.classList.add('settings__label--hide');
    statisticsAdditionalCheckbox.checked = false;
    statisticsAdditionalCheckbox.setAttribute('disabled', 'disabled');
  }
});

statisticsAdditionalCheckbox.addEventListener('change', function (event) {
  statisticsHiddenCategory.forEach((element) => {
    element.classList.remove('statistics__category--hide');
  });
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

// HQ mode
// let hqCheckbox = document.querySelector('.settings__checkbox--hq');
// let hqFlag;

// hqCheckbox.addEventListener('change', function (event) {
//   if (event.currentTarget.checked) {
//     hqFlag = true;
//   } else {
//     hqFlag = false;
//   };
// });

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

// function movingMobileVideo(event) {
//   if (scaleCheckbox.checked) {
//     let tiltX = event.beta;
//     let tiltY = event.gamma;
//     let rotateX = (tiltX / 45) * -30;
//     let rotateY = (tiltY / 45) * 30;

//     WRAPPER.style.transform = 'perspective(1000px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg) scaleZ(2)';
//   }
// }

// BODY.addEventListener('mousemove', setScale);
// BODY.addEventListener('deviceorientation', movingMobileVideo);

// Start
// const srcRegex = /^(http:|https:|file:).*/;
const srcRegex = /^(file:).*/;

function startVideo() {
  // if (!VIDEO.src || VIDEO.src === '' || VIDEO.src.length === 0 || typeof VIDEO.src === 'undefined') {
  // if (srcRegex.test(VIDEO.src) || VIDEO.src === '' || !VIDEO.hasAttribute('src')) {
  if (!VIDEO.hasAttribute('src') || VIDEO.src === '') {
    openButton.focus();
    openButton.classList.add('header__menu--error');
    setTimeout(() => {
      openButton.classList.remove('header__menu--error');
    }, 2000);
  } else if (VIDEO.readyState >= VIDEO.HAVE_CURRENT_DATA) {
    openButton.classList.remove('header__menu--error');
    STARTBUTTON.classList.add('video__start--hide');
    CONTROLS.classList.remove('control--off', 'control--hide');

    VIDEO.play();

    stayFocus();
    getStatistics();
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

  setStatistics();
}

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
  const settingsButtonHeight = SETTINGS.querySelector('.settings__control').clientHeight;
  const settingsWrapper = SETTINGS.querySelector('.settings__wrapper');
  const settingsWrapperHeight = settingsWrapper.clientHeight;
  const activeTab = document.querySelector('.settings__tab--active');
  const activeTabHeight = activeTab.clientHeight;

  if (BODY.clientWidth < 1440) {
    settingsWrapper.style.height = `calc(100vh - ${settingsButtonHeight}px - 61px)`;

    if (activeTabHeight >= settingsWrapperHeight) {
      activeTab.style.height = settingsWrapperHeight + 'px';
      activeTab.classList.add('settings__tab--scroll');
      activeTab.style.height = settingsWrapperHeight + 'px';
    }
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

function stayFocus() {
  if (VIDEO.paused) {
    VIDEO.blur();
  } else {
    VIDEO.focus();
  }
}

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);
VIDEO.addEventListener('blur', stayFocus);

// Duration
const videoPassed = CONTROLS.querySelector('.control__time--passed');
const videoLeft = CONTROLS.querySelector('.control__time--left');

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

// Video handler
// Waiting
function waitingVideo() {
  WRAPPER.classList.add('video__wrapper--waiting');
}

function playingVideo() {
  WRAPPER.classList.remove('video__wrapper--waiting');
}

VIDEO.addEventListener('waiting', waitingVideo);
VIDEO.addEventListener('playing', playingVideo);

// End
function endVideo() {
  resetVideo();
  VIDEO.blur();
}

VIDEO.addEventListener('ended', endVideo);

// Error
function errorVideo() {
  WRAPPER.classList.add('video__wrapper--error');

  showError('Помилка відео &#128528;');
}

function removeErrorVideo() {
  WRAPPER.classList.remove('video__wrapper--error');
}

// VIDEO.addEventListener('error', errorVideo);
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
