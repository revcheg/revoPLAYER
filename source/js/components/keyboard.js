// Keyboard
const keyHandlers = {
  // Main
  playPause: ' ',
  nextVideoIndex: '.',
  prevVideoIndex: ',',
  skipBackward: 'ArrowLeft',
  skipForward: 'ArrowRight',
  changeVolumeUp: 'ArrowUp',
  changeVolumeDown: 'ArrowDown',
  toggleMute: 'm',
  setSubtitle: 'c',
  changeSpeed: 's',
  openPIP: 'p',
  toggleFitScreen: 'x',
  toggleFullscreen: 'f',
  showAddControls: 'b',
  // Other
  openSettings: 'i',
  closeSettings: 'Escape',
  startVideo: 'k',
  setLightScheme: 'l',
  setDarkScheme: 'd',
  setCinemaMode: 't',
  openConsole: '`'
};

function handleKey(key, handlers) {
  for (const action in handlers) {
    if (handlers[action] === key) {
      if (isVideoStarted) {
        switch (action) {
          case 'playPause':
            switchVideoState();
          break;
          case 'nextVideoIndex':
            changeVideoIndex(1);
            break;
          case 'prevVideoIndex':
            changeVideoIndex(-1);
            break;
          case 'skipBackward':
            VIDEO.currentTime -= 5;
            VIDEO_RANGE.value = VIDEO.currentTime;
            setDuration();
            break;
          case 'skipForward':
            VIDEO.currentTime += 5;
            VIDEO_RANGE.value = VIDEO.currentTime;
            setDuration();
            break;
          case 'changeVolumeUp':
            changeVolume(0.1);
            break;
          case 'changeVolumeDown':
            changeVolume(-0.1);
            break;
          case 'toggleMute':
            setupMute();
            break;
          case 'setSubtitle':
            setSubtitle();
            break;
          case 'changeSpeed':
            changeSpeed();
            break;
          case 'openPIP':
            setPictureInPicture();
            break;
          case 'toggleFitScreen':
            switchFitScreen();
            break;
          case 'toggleFullscreen':
            setFullscreen();
            break;
          case 'showAddControls':
            showAddControls();
            break;
          }
      }

      // Other
      switch (action) {
        case 'openSettings':
          openSettings();
          break;
        case 'closeSettings':
          closeSettings();
          closeConsole();
          break;
        case 'startVideo':
          startVideo();
          break;
        case 'setLightScheme':
          setScheme('light');
          break;
        case 'setDarkScheme':
          setScheme('dark');
          break;
        case 'setCinemaMode':
          setCinemaMode();
          break;
        case 'openConsole':
          openConsole();
          break;
      }
    }
  }
}

window.addEventListener('keyup', (event) => {
  const keyboardKey = event.key;
  handleKey(keyboardKey, keyHandlers);
});
