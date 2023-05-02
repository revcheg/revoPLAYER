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

// Keyboard
(function () {
  VIDEO.addEventListener('keyup', (event) => {
    const videoKey = event.key;

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
})();