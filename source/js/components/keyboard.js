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

    case 'z':
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
