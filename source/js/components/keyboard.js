// Keyboard
let videoKey;

// Video
VIDEO.addEventListener('keyup', (event) => {
  videoKey = event.key;

  switch (videoKey) {
    case ' ':
      pauseVideo();
      pauseIcon();
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
      muteVideo();
      break;

    case 'f':
      fullscreenVideo();
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

    case 'p':
      startVideo();
      break;

    case 'l':
      setTheme('light');
      setButton();
      saveTheme('light');
      break;

    case 'd':
      setTheme('dark');
      setButton();
      saveTheme('dark');
      break;
  };
});