// Start
let autoplayFlag = false;

function startVideo() {
  autoplayFlag = true;

  if (!VIDEO.hasAttribute('src') || VIDEO.src === '') {
    openButton.focus();
    openButton.classList.add('header__menu--error');
    setTimeout(() => {
      openButton.classList.remove('header__menu--error');
    }, 2000);
  } else if (VIDEO.readyState >= VIDEO.HAVE_CURRENT_DATA || VIDEO.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
    openButton.classList.remove('header__menu--error');
    STARTBUTTON.classList.add('video__start--hide');
    CONTROLS.classList.remove('control--off', 'control--hide');

    getStatistics();
    // stayFocus();

    VIDEO.play();

    console.log('start');
  }
}

STARTBUTTON.addEventListener('click', startVideo);
