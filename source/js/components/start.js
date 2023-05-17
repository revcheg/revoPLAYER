// Start 
function startVideo (event) {
  event.stopPropagation();

  if (VIDEO.src) {
    openButton.classList.remove('header__menu--error');
    STARTBUTTON.classList.add('video__start--hide');
    CONTROLS.classList.remove('control--off', 'control--hide');
    
    VIDEO.play();

    getStatistics();
    startProgress();
  } else {
    openButton.focus();
    openButton.classList.add('header__menu--error');
    setTimeout(() => {
      openButton.classList.remove('header__menu--error');
    }, 2000);
  };
};

STARTBUTTON.addEventListener('click', startVideo);

// End
VIDEO.addEventListener('ended', function () {
  STARTBUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--hide');
  STATISTICS.classList.add('statistics--hide');
  VIDEO.blur();
});
