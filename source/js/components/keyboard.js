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