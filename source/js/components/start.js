// Start
function startVideo() {
  if (isVideoReadyToPlay()) {
    handleVideoPlay();
  } else {
    handleVideoError();
  }
}

function isVideoReadyToPlay() {
  return (
    VIDEO.hasAttribute('src') &&
    VIDEO.src !== '' &&
    !VIDEO.error &&
    (VIDEO.readyState >= VIDEO.HAVE_CURRENT_DATA || VIDEO.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA)
  );
}

let isVideoStarted = false;

function handleVideoPlay() {
  isVideoStarted = true;
  openButton.classList.remove('header__menu--error');
  START_BUTTON.classList.add('video__start--hide');

  playVideo();
  getStatistics();
  // VIDEO.focus();

  CONTROLS.classList.remove('control--off');

  if (autoplayFlag) {
    VIDEO.addEventListener('loadeddata', startVideo);
  }
}

function handleVideoError() {
  openButton.focus();
  openButton.classList.add('header__menu--error');
  setTimeout(() => {
    openButton.classList.remove('header__menu--error');
  }, 2100);

  activateTab('video');
  showMessage('Відео відсутнє, спробуйте обрати інше');

  if (VIDEO.error) {
    showMessage(VIDEO.error.message);
  }
}

START_BUTTON.addEventListener('click', startVideo);
