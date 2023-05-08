const BODY = document.querySelector('.body'); 

const VIDEO = document.querySelector('.video'); 
const STATISTICS = document.querySelector('.statistics');

const VIDEORANGE = document.querySelector('.control__range');

const STARTBUTTON = document.querySelector('.video__start');
const CONTROLS = document.querySelector('.control');
// CONTROLS
// Pause
const playButtonIcon = document.querySelector('.control__icon--play');
const pauseButtonIcon = document.querySelector('.control__icon--pause');

(function () {
  const playButton = document.querySelector('.control__button--play');
  
  playButton.addEventListener('click', function() {
    playButtonIcon.classList.toggle('control__icon--hide');
    pauseButtonIcon.classList.toggle('control__icon--hide');

    if (VIDEO.paused) {
      VIDEO.play();
    } else {
      VIDEO.pause();
    };
  });
})();

// Mute
const muteButton = document.querySelector('.control__button--volume');
const muteButtonIcon = document.querySelector('.control__mute');

(function () {
  muteButton.addEventListener('click', function () {
    muteButtonIcon.classList.toggle('control__mute');
    if (VIDEO.muted) {
      VIDEO.muted = false;
    } else {
      VIDEO.muted = true;
    };
  });
})();

// Range
(function () {
  let rangeValue;

  VIDEORANGE.addEventListener('mousedown', function () {
    VIDEO.pause();
  });
  
  VIDEORANGE.addEventListener('change', function () {
    VIDEO.pause();
    // const clickPosition = event.clientX - VIDEORANGE.getBoundingClientRect().left;
    // const trackWidth = VIDEORANGE.getBoundingClientRect().width;
    // rangeValue = VIDEORANGE.min + ((VIDEORANGE.max - VIDEORANGE.min) * clickPosition / trackWidth);
    
    // if (Math.abs(rangeValue - VIDEORANGE.value) > 1) {
    //   event.preventDefault();
    //   console.log('track');
    // } else {
      rangeValue = VIDEORANGE.value;
      VIDEO.currentTime = rangeValue;
      VIDEO.play();
      // console.log('dot');
    // };
  });
})();

// Full screen
(function () {
  const fullButton = document.querySelector('.control__button--size');
  
  fullButton.addEventListener('click', function () {
    VIDEO.requestFullscreen();
  });
})();
// File
let FILE;
let FILETYPE;
let FILEURL;
let FILESIZE;

(function () {
  const INPUTFILE = document.querySelector('.settings__file');
  
  INPUTFILE.addEventListener('click', function () {
    resetVideo();
  });
  
  INPUTFILE.addEventListener('change', function () {
    FILE = INPUTFILE.files[0];
    FILEURL = URL.createObjectURL(FILE);
    FILETYPE = INPUTFILE.files[0].type.replace('video/', '');
    FILESIZE = INPUTFILE.files[0].size;
    VIDEO.src = FILEURL; 
  });
})();
// Keyboard
(function () {
  let videoKey;

  // Video
  VIDEO.addEventListener('keyup', (event) => {
    videoKey = event.key;

    switch (videoKey) {
      case ' ':
        if (VIDEO.paused) {
          VIDEO.play();
          playButtonIcon.classList.add('control__icon--hide');
          pauseButtonIcon.classList.remove('control__icon--hide');
        } else {
          VIDEO.pause();
          playButtonIcon.classList.remove('control__icon--hide');
          pauseButtonIcon.classList.add('control__icon--hide');
        };
        break;

      case 'ArrowLeft':
        VIDEO.currentTime -= 5;
        break;

      case 'ArrowRight':
        VIDEO.currentTime += 5;
        break;

      case 'ArrowUp':
        VIDEO.volume += 0.1;
        break;

      case 'ArrowDown':
        VIDEO.volume -= 0.1;
        break;

      case 'm':
        if (VIDEO.muted) {
          VIDEO.muted = false;
          muteButtonIcon.classList.add('control__mute');
        } else {
          VIDEO.muted = true;
          muteButtonIcon.classList.remove('control__mute');
        };
        break;

      case 'f':
        VIDEO.requestFullscreen();
        break;
    };
  });

  // Other
  BODY.addEventListener('keyup', (event) => {
    videoKey = event.key;

    switch (videoKey) {
      case 's':
        openSettings();
        break;

      case 'Escape':
        closeSettings();
        break;
    };
  });
})();
// Set Video
let game;

(function () {
  const chooseButtons = document.querySelectorAll('.settings__button');

  chooseButtons.forEach((element) => {
    element.addEventListener('click', function () {
      game = this.getAttribute('data-video');
      resetVideo();
      setVideo(game);
      deepCheckbox.removeAttribute('disabled', 'disabled');
    });
  });

  function setVideo () {
    if (deepFlag) {
      VIDEO.src = 'video/' + game + '/deep.webm';
      VIDEO.poster = 'img/' + game + '/deep-preview.webp';
    } else {
      VIDEO.src = 'video/' + game + '/main.webm';
      VIDEO.poster = 'img/' + game + '/main-preview.webp';
    };

    VIDEO.preload = 'auto';
  };

  // Deep mode
  let deepCheckbox = document.querySelector('.settings__checkbox--deep');
  let deepFlag;

  deepCheckbox.addEventListener('change', function (event) {
    if (event.currentTarget.checked) {
      deepFlag = true;
    } else {
      deepFlag = false;
    };

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
})();

// Reset video
function resetVideo () {
  VIDEO.pause();
  STARTBUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--hide');
  STATISTICS.classList.add('statistics--hide');
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
};
// Settings
const settings = document.querySelector('.settings');
const openButton = document.querySelector('.header__menu');
const closeButton = document.querySelector('.settings__close');

function openSettings () {
  settings.classList.remove('settings--hide');
  settings.focus();
};

function closeSettings (event) {
  settings.classList.add('settings--hide');
  settings.blur();
};

openButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', closeSettings);

// settings.addEventListener('keyup', (event) => {
//   if (event.key === 'Escape') {
//     closeSettings();
//   };
// });

// Start 
(function () {
  const openButton = document.querySelector('.header__menu');
  
  STARTBUTTON.addEventListener('click', function () {
    if (VIDEO.src) {
      openButton.classList.remove('header__menu--error');
      STARTBUTTON.classList.add('video__start--hide');
      CONTROLS.classList.remove('control--off', 'control--hide');
      getStatistics();
      VIDEO.volume = 0.5;
      VIDEO.play();
      stayFocus();
      startProgress();
    } else {
      openButton.classList.add('header__menu--error');

      setTimeout(() => {
        openButton.classList.remove('header__menu--error');
      }, 2000);
    };
  });

  // End
  VIDEO.addEventListener('ended', function () {
    STARTBUTTON.classList.remove('video__start--hide');
    CONTROLS.classList.add('control--hide');
    STATISTICS.classList.add('statistics--hide');
    VIDEO.blur();
  });

  function stayFocus () {
    VIDEO.addEventListener('blur', function () {
      if (VIDEO.paused) {
        VIDEO.blur();
      } else {
        VIDEO.focus();
      };
    });
  };
})();
// STATISTICS
(function () {
  const statisticsCheckbox = document.querySelector('.settings__checkbox--statistics');

  statisticsCheckbox.addEventListener('change', function (event) {
    if (event.currentTarget.checked) {
      STATISTICS.classList.remove('statistics--off');
    } else {
      STATISTICS.classList.add('statistics--off');
    };
  });
})();

let videoWidth;
let videoHeight;
let videoFormat;
let videoDuration;
let videoBuffer;
// let videoFPS;
let videoCurrentTime;

const statisticsResolution = STATISTICS.querySelector('.statistics__resolution');
const statisticsUFH = document.querySelector('.statistics__ufh');
const statisticsFormat = STATISTICS.querySelector('.statistics__format');
const statisticsDuration = STATISTICS.querySelector('.statistics__duration');
// const statisticsFPS = STATISTICS.querySelector('.statistics__fps');
const statisticsBuffer = STATISTICS.querySelector('.statistics__buffer');

function getStatistics () {
  STATISTICS.classList.remove('statistics--hide');

  if (FILETYPE) {
    videoFormat = FILETYPE;
  } else {
    videoFormat = VIDEO.src.split('.').pop();
  };

  videoWidth = VIDEO.videoWidth;
  videoHeight = VIDEO.videoHeight;
  // videoFPS = VIDEO.fps;
  videoDuration = Math.round(VIDEO.duration);
  VIDEORANGE.setAttribute('max', videoDuration);

  setStatistics();
};

function setStatistics () {
  statisticsResolution.innerHTML = videoWidth + 'x' + videoHeight;
  statisticsFormat.innerHTML = videoFormat;
  statisticsDuration.innerHTML = videoDuration;
  // statisticsFPS.innerHTML = videoFPS;

  if (videoWidth >= 3840) {
    statisticsUFH.classList.remove('statistics--off');
  };
};
// THEME
let currentTheme;
let buttonIndex;

(function () {
  const themeButtons = document.querySelectorAll('.footer__theme');

  // Check client theme
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    currentTheme = 'dark';
  } else {
    currentTheme = 'light';
  };

  // Set button
  themeButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      buttonIndex = Array.from(themeButtons).indexOf(button);
      currentTheme = this.getAttribute('data-theme');

      setButton(buttonIndex);
      setTheme(currentTheme);
      saveTheme(currentTheme);
    });
  });

  function setButton() {
    themeButtons.forEach((button) => {
      button.removeAttribute('disabled');
      button.classList.remove('footer__theme--active');
    });
    
    themeButtons[buttonIndex].setAttribute('disabled', 'disabled'); 
    themeButtons[buttonIndex].classList.add('footer__theme--active');
  };

  // Set theme
  function setTheme(currentTheme) {
    BODY.className = '';

    switch (currentTheme) {
      case 'light':
        BODY.classList.add(currentTheme);
        buttonIndex = 0;
        break;
  
      case 'dark':
        BODY.classList.add(currentTheme);
        buttonIndex = 1;
        break;
  
      case 'cyberpunk':
        BODY.classList.add(currentTheme);
        buttonIndex = 2;
        break;

      default:
        BODY.className = '';
    };
  };

  setTheme(currentTheme);
  setButton();

  // Save theme
  function saveTheme(currentTheme) {
    localStorage.setItem('localTheme', currentTheme);
    localStorage.setItem('localButton', buttonIndex);
  };

  // Load theme
  function loadTheme() {
    if (localStorage) {
      const localTheme = localStorage.getItem('localTheme');
      const localButton = localStorage.getItem('localButton');
      setTheme(localTheme);
      setButton(localButton);
    };
  };

  loadTheme();
})();
// Video
let progressInterval;

function startProgress () {
  progressInterval = setTimeout(updateProgress, 1000);
};

function updateProgress () {
  videoBuffer = Math.round(VIDEO.buffered.end(0));
  videoCurrentTime = VIDEO.currentTime;
  VIDEORANGE.value = videoCurrentTime;
  statisticsBuffer.innerHTML = videoBuffer;
  startProgress();
};

function stopProgress () {
  clearTimeout(progressInterval);
};

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);