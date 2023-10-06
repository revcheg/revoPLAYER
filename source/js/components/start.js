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
    CONTROLS.classList.remove('control--off');

    VIDEO.play();
    VIDEO.focus();

    getStatistics();

    if (autoplayFlag) {
      VIDEO.addEventListener('loadeddata', startVideo);
    }
  }
}

STARTBUTTON.addEventListener('click', startVideo);
