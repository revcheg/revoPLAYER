const video = document.querySelector('.video'); 
const statistics = document.querySelector('.statistics');
let currentTheme;
let buttonIndex;
let game;

// Settings
(function () {
  const menu = document.querySelector('.settings');
  const openButton = document.querySelector('.header__menu');
  const closeButton = document.querySelector('.settings__close');

  openButton.addEventListener('click', function() {
    menu.classList.remove('settings--hide');
  });

  closeButton.addEventListener('click', function() {
    menu.classList.add('settings--hide');
  });

  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) {
      menu.classList.add('settings--hide');
    };
  });
})();

// Set Video
(function () {
  const chooseButtons = document.querySelectorAll('.settings__button');

  let deepCheckbox = document.querySelector('.settings__checkbox--deep');
  let deepValue = deepCheckbox.checked;
  let deepFlag;

  chooseButtons.forEach((element) => {
    element.addEventListener('click', function() {
      game = this.getAttribute('data-video');
      setVideo(game);
      deepCheckbox.removeAttribute('disabled', 'disabled');
    });
  });

  function setVideo (game) {
    if (deepFlag) {
      video.src = 'video/' + game + '/deep.webm';
      video.poster = 'img/' + game + '/deep-preview.webp';
    } else {
      video.src = 'video/' + game + '/main.webm';
      video.poster = 'img/' + game + '/main-preview.webp';
    };

    video.preload = 'auto';
  };

  // Deep mode
  deepCheckbox.addEventListener('change', function(event) {
    if (event.currentTarget.checked) {
      deepFlag = true;
    } else {
      deepFlag = false;
    };

    setVideo(game);
  });
})();

// Start 
(function () {
  const startButton = document.querySelector('.video__start');
  const controls = document.querySelector('.control');
  const openButton = document.querySelector('.header__menu');
  
  startButton.addEventListener('click', function() {
    if (video.src) {
      startButton.classList.add('video__start--hide');
      controls.classList.remove('control--hide');
      statistics.classList.remove('statistics--hide');
      openButton.classList.remove('header__menu--error');
      video.play();
      video.volume = "0.5";
      getStatistics();
    } else {
      openButton.classList.add('header__menu--error');
    };
  });
})();

// CONTROLS
// Pause
(function () {
  const playButton = document.querySelector('.control__button--play');
  const playButtonIcon = document.querySelector('.control__icon--play');
  const pauseButtonIcon = document.querySelector('.control__icon--pause');
  
  playButton.addEventListener('click', function() {
    playButtonIcon.classList.toggle('control__icon--hide');
    pauseButtonIcon.classList.toggle('control__icon--hide');

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
})();

// Mute
(function () {
  const muteButton = document.querySelector('.control__button--volume');
  const muteButtonIcon = document.querySelector('.control__mute');
  
  muteButton.addEventListener('click', function() {
    muteButtonIcon.classList.toggle('control__mute');
    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    };
  });
})();

// Full screen
(function () {
  const fullButton = document.querySelector('.control__button--size');
  
  fullButton.addEventListener('click', function() {
    video.requestFullscreen();
  });
})();

// Statistics
(function () {
  const statisticsCheckbox = document.querySelector('.settings__checkbox--statistics');

  statisticsCheckbox.addEventListener('change', function(event) {
    if (event.currentTarget.checked) {
      statistics.classList.remove('statistics--off');
    } else {
      statistics.classList.add('statistics--off');
    };
  });
})();

function getStatistics () {
  let videoWidth = video.videoWidth;
  let videoHeight = video.videoHeight;
  let videoDuration = video.duration;
  let videoBuffer = video.buffered.end(0);
  
  console.log(videoWidth);
  console.log(videoHeight);
  console.log(videoDuration);
  console.log(videoBuffer);
};

// THEME
(function () {
  const body = document.querySelector('body'); 
  const themeButtons = document.querySelectorAll('.footer__theme');

  // Check client theme
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    currentTheme = 'dark';
  } else {
    currentTheme = 'light';
  };

  // Set button
  themeButtons.forEach(function (button, index) {
    button.addEventListener('click', function() {
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
    body.className = '';

    switch (currentTheme) {
      case 'light':
        body.classList.add(currentTheme);
        buttonIndex = 0;
        break;
  
      case 'dark':
        body.classList.add(currentTheme);
        buttonIndex = 1;
        break;
  
      case 'cyberpunk':
        body.classList.add(currentTheme);
        buttonIndex = 2;
        break;

      default:
        body.className = '';
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