// Start
function setupVideo() {
  if (isVideoReadyToPlay()) {
    startVideo();
  } else {
    emptyVideoError();
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
  openButton.classList.remove('header__menu--error');
  START_BUTTON.classList.add('video__start--hide');

  playVideo();
  getStatistic();

  CONTROLS.classList.remove('control--off');
}

function emptyVideoError() {
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
