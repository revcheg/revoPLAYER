// Start
function startVideo() {
  if (!VIDEO.hasAttribute('src') || VIDEO.src === '' || VIDEO.error) {
    openButton.focus();
    openButton.classList.add('header__menu--error');
    setTimeout(() => {
      openButton.classList.remove('header__menu--error');
    }, 2000);

    if (VIDEO.error) {
      showError(VIDEO.error.message);
    }
  } else if (VIDEO.readyState >= VIDEO.HAVE_CURRENT_DATA || VIDEO.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
    openButton.classList.remove('header__menu--error');
    STARTBUTTON.classList.add('video__start--hide');
    CONTROLS.classList.remove('control--off', 'control--hide');

    getStatistics();
    stayFocus();

    VIDEO.play();

    if (autoplayFlag && selectedVideos.length > 0) {
      VIDEO.addEventListener('loadeddata', startVideo);
    } else {
      VIDEO.removeEventListener('loadeddata', startVideo);
    }
  }
}

STARTBUTTON.addEventListener('click', startVideo);
