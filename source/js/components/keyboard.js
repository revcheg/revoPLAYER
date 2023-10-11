// Keyboard
let keyboardKey;

window.addEventListener('keyup', (event) => {
  keyboardKey = event.key;

  if (isVideoPlaying) {
    switch (keyboardKey) {
      // Video
      case ' ':
        pauseVideo();
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
        setMute();
        break;

      case 'c':
        changeSubtitle();
        break;

      case 's':
        changeSpeed();
        break;

      case 'p':
        openPictureInPicture();
        break;

      case 'x':
        changeFitScreen();
        break;

      case 'f':
        setFullscreen();
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

    case 'k':
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
      setCinemaMode();
      break;

    case '`':
      openConsole();
      break;

    case 'b':
      showAddControls();
      break;
  }
});
