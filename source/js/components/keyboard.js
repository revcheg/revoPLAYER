// Keyboard
// let keyboardKey;

// window.addEventListener('keyup', (event) => {
//   keyboardKey = event.key;

//   if (isVideoPlaying) {
//     switch (keyboardKey) {
//       // Video
//       case ' ':
//         pauseVideo();
//         break;

//       case 'ArrowLeft':
//         VIDEO.currentTime -= 5;
//         VIDEO_RANGE.value = VIDEO.currentTime;
//         setDuration();
//         break;

//       case 'ArrowRight':
//         VIDEO.currentTime += 5;
//         VIDEO_RANGE.value = VIDEO.currentTime;
//         setDuration();
//         break;

//       case 'ArrowUp':
//         changeVolume(0.1);
//         break;

//       case 'ArrowDown':
//         changeVolume(-0.1);
//         break;

//       case 'm':
//         setMute();
//         break;

//       case 'c':
//         changeSubtitle();
//         break;

//       case 's':
//         changeSpeed();
//         break;

//       case 'p':
//         openPictureInPicture();
//         break;

//       case 'x':
//         changeFitScreen();
//         break;

//       case 'f':
//         setFullscreen();
//         break;
//     }
//   }

//   // Other
//   switch (keyboardKey) {
//     case 'i':
//       openSettings();
//       break;

//     case 'Escape':
//       closeSettings();
//       closeConsole();
//       break;

//     case 'k':
//       startVideo();
//       break;

//     case 'l':
//       setScheme('light');
//       break;

//     case 'd':
//       setScheme('dark');
//       break;

//     case 'a':
//       setScheme('auto');
//       break;

//     case 't':
//       setCinemaMode();
//       break;

//     case '`':
//       openConsole();
//       break;

//     case 'b':
//       showAddControls();
//       break;

//     case '.':
//       changeVideoIndex(1);
//       break;

//     case ',':
//       changeVideoIndex(-1);
//       break;
//   }
// });

const keyHandlers = {
  playPause: ' ',
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
  // Other
  openSettings: 'i',
  closeSettings: 'Escape',
  startVideo: 'k',
  setLightScheme: 'l',
  setDarkScheme: 'd',
  setAutoScheme: 'a',
  setCinemaMode: 't',
  openConsole: '`',
  showAddControls: 'b',
  nextVideoIndex: '.',
  prevVideoIndex: ',',
};

window.addEventListener('keyup', (event) => {
  const keyboardKey = event.key;
  handleKey(keyboardKey, keyHandlers);
});

function handleKey(key, handlers) {
  for (const action in handlers) {
    if (handlers[action] === key) {
      switch (action) {
        case 'playPause':
          toggleVideo();
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
          setMute();
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
          changeFitScreen();
          break;
        case 'toggleFullscreen':
          setFullscreen();
          break;
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
        case 'setAutoScheme':
          setScheme('auto');
          break;
        case 'setCinemaMode':
          setCinemaMode();
          break;
        case 'openConsole':
          openConsole();
          break;
        case 'showAddControls':
          showAddControls();
          break;
        case 'nextVideoIndex':
          changeVideoIndex(1);
          break;
        case 'prevVideoIndex':
          changeVideoIndex(-1);
          break;
      }
    }
  }
}
