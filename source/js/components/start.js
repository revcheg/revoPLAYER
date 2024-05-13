// Start
function setupStart() {
  if (isVideoReadyToPlay()) {
    startVideo();
  } else {
    emptyError();
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

function startVideo() {
  isVideoStarted = true;
  START_BUTTON.classList.add('video__start--hide');
  CONTROLS.classList.remove('control--off');
  statisticName.classList.remove('video__name--off');

  setAutoplay();
  playVideo();
}

function emptyError() {
  openButton.focus();
  openButton.classList.add('header__menu--error');
  setTimeout(() => {
    openButton.classList.remove('header__menu--error');
  }, 2100);

  if (VIDEO.error) {
    showMessage(VIDEO.error.message);
  }

  showMessage('Відео відсутнє, спробуйте обрати інше');
  setSettingsCategory('video');
}

// START_BUTTON.addEventListener('click', setupStart);
START_BUTTON.addEventListener('click', startVideo);
