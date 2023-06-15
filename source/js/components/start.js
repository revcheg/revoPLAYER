// Start
// const srcRegex = /^(http:|https:|file:).*/;
// const srcRegex = /^(file:).*/;

function startVideo() {
  // if (!VIDEO.src || VIDEO.src === '' || VIDEO.src.length === 0 || typeof VIDEO.src === 'undefined') {
  // if (srcRegex.test(VIDEO.src) || VIDEO.src === '' || !VIDEO.hasAttribute('src')) {
  if (!VIDEO.hasAttribute('src') || VIDEO.src === '') {
    openButton.focus();
    openButton.classList.add('header__menu--error');
    setTimeout(() => {
      openButton.classList.remove('header__menu--error');
    }, 2000);
  } else if (VIDEO.readyState >= VIDEO.HAVE_CURRENT_DATA) {
    openButton.classList.remove('header__menu--error');
    STARTBUTTON.classList.add('video__start--hide');
    CONTROLS.classList.remove('control--off', 'control--hide');

    VIDEO.play();

    stayFocus();
    getStatistics();

    console.log('start');
  }
}

STARTBUTTON.addEventListener('click', startVideo);
