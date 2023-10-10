// Keyboard
let keyboardKey;

window.addEventListener('keyup', (event) => {
  keyboardKey = event.key;

  if (isVideoPlaying) {
    switch (keyboardKey) {
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
  switch (keyboardKey) {
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

    // case 'b':
    //   showAddControls();
    //   break;
  }
});
