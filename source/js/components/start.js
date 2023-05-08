// Start 
(function () {
  const openButton = document.querySelector('.header__menu');
  
  STARTBUTTON.addEventListener('click', function () {
    if (VIDEO.src) {
      openButton.classList.remove('header__menu--error');
      STARTBUTTON.classList.add('video__start--hide');
      CONTROLS.classList.remove('control--off', 'control--hide');
      getStatistics();
      VIDEO.volume = 0.5;
      VIDEO.play();
      stayFocus();
      startProgress();
    } else {
      openButton.classList.add('header__menu--error');

      setTimeout(() => {
        openButton.classList.remove('header__menu--error');
      }, 2000);
    };
  });

  // End
  VIDEO.addEventListener('ended', function () {
    STARTBUTTON.classList.remove('video__start--hide');
    CONTROLS.classList.add('control--hide');
    STATISTICS.classList.add('statistics--hide');
    VIDEO.blur();
  });

  function stayFocus () {
    VIDEO.addEventListener('blur', function () {
      if (VIDEO.paused) {
        VIDEO.blur();
      } else {
        VIDEO.focus();
      };
    });
  };
})();