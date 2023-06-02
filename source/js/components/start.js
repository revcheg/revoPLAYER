// Start
function startVideo() {
  if (VIDEO.src === '' || VIDEO.src.includes('undefined')) {
    openButton.focus();
    openButton.classList.add('header__menu--error');
    setTimeout(() => {
      openButton.classList.remove('header__menu--error');
    }, 2000);
  } else if (VIDEO.src && VIDEO.readyState >= VIDEO.HAVE_CURRENT_DATA) {
    openButton.classList.remove('header__menu--error');
    STARTBUTTON.classList.add('video__start--hide');
    CONTROLS.classList.remove('control--off', 'control--hide');

    VIDEO.play();

    stayFocus();
    getStatistics();
  }
}

STARTBUTTON.addEventListener('click', startVideo);
