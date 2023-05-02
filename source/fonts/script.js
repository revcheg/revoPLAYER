const BODY = document.querySelector('body'); 

const VIDEO = document.querySelector('.video'); 
const STATISTICS = document.querySelector('.statistics');

const VIDEORANGE = document.querySelector('.control__range');

const STARTBUTTON = document.querySelector('.video__start');
const CONTROLS = document.querySelector('.control');

// Settings
(function () {
  const menu = document.querySelector('.settings');
  const openButton = document.querySelector('.header__menu');
  const closeButton = document.querySelector('.settings__close');

  openButton.addEventListener('click', function () {
    menu.classList.remove('settings--hide');
  });

  closeButton.addEventListener('click', function () {
    menu.classList.add('settings--hide');
  });

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      menu.classList.add('settings--hide');
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
    VIDEO.volume = "0.5";
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
  // URL.revokeObjectURL(FILEURL);
};

// File
let FILE;
let FILETYPE;
let FILEURL;

(function () {
  const INPUTFILE = document.querySelector('.settings__file');
  
  INPUTFILE.addEventListener('click', function () {
    resetVideo();
  });
  
  INPUTFILE.addEventListener('change', function () {
    FILE = INPUTFILE.files[0];
    FILEURL = URL.createObjectURL(FILE);
    FILETYPE = INPUTFILE.files[0].type;
    VIDEO.src = FILEURL; 
  });
})();

// Start 
(function () {
  const openButton = document.querySelector('.header__menu');
  
  STARTBUTTON.addEventListener('click', function () {
    if (VIDEO.src) {
      openButton.classList.remove('header__menu--error');
      STARTBUTTON.classList.add('video__start--hide');
      CONTROLS.classList.remove('control--hide');
      getStatistics();
      VIDEO.play();
    } else {
      openButton.classList.add('header__menu--error');
    };
  });

  // End
  VIDEO.addEventListener('ended', function () {
    STARTBUTTON.classList.remove('video__start--hide');
    CONTROLS.classList.add('control--hide');
    STATISTICS.classList.add('statistics--hide');
  });
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
let videoCurrentTime;

const statisticsResolution = STATISTICS.querySelector('.statistics__resolution');
const statisticsFormat = STATISTICS.querySelector('.statistics__format');
const statisticsDuration = STATISTICS.querySelector('.statistics__duration');
const statisticsBuffer = STATISTICS.querySelector('.statistics__buffer');

function getStatistics () {
  STATISTICS.classList.remove('statistics--hide');

  // VIDEO.addEventListener('loadedmetadata', function () {
    if (FILETYPE) {
      videoFormat = FILETYPE;
    } else {
      videoFormat = VIDEO.src.split('.').pop();
    }
    videoWidth = VIDEO.videoWidth;
    videoHeight = VIDEO.videoHeight;
    videoDuration = Math.round(VIDEO.duration);
    VIDEORANGE.setAttribute('max', videoDuration);
    setStatistics();
  // });
};

function setStatistics () {
  statisticsResolution.innerHTML = videoWidth + 'x' + videoHeight;
  statisticsFormat.innerHTML = videoFormat;
  statisticsDuration.innerHTML = videoDuration;

  VIDEO.addEventListener('timeupdate', function () {
    videoBuffer = Math.round(VIDEO.buffered.end(0));
    videoCurrentTime = VIDEO.currentTime;
    VIDEORANGE.value = videoCurrentTime;
    statisticsBuffer.innerHTML = videoBuffer;
  });
}

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
(function () {
  const muteButton = document.querySelector('.control__button--volume');
  const muteButtonIcon = document.querySelector('.control__mute');
  
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

// Keyboard
let videoKeyCode;
let videoWrapper = document.querySelector('.video__wrapper');

(function () {
  videoWrapper.addEventListener('keypress', (event) => {
    videoKeyCode = event.keyCode;
    console.log(videoKeyCode);

    switch (videoKeyCode) {
      case 32:
        if (VIDEO.paused) {
          VIDEO.play();
        } else {
          VIDEO.pause();
        };
        break;

      case 37:
        VIDEO.currentTime -= 5;
        break;

      case 39:
        VIDEO.currentTime += 5;
        break;

      case 77:
        if (VIDEO.muted) {
          VIDEO.muted = false;
        } else {
          VIDEO.muted = true;
        };
        break;

      case 70:
        VIDEO.requestFullscreen();
        break;
    };
  });
})();

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