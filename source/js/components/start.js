// Start 
(function () {
  const openButton = document.querySelector('.header__menu');
  
  STARTBUTTON.addEventListener('click', function () {
    if (VIDEO.src) {
      openButton.classList.remove('header__menu--error');
      STARTBUTTON.classList.add('video__start--hide');
      CONTROLS.classList.remove('control--hide');
      getStatistics();
      VIDEO.play();
      VIDEO.focus();
    } else {
      openButton.classList.add('header__menu--error');
    };
  });

  // End
  VIDEO.addEventListener('ended', function () {
    STARTBUTTON.classList.remove('video__start--hide');
    CONTROLS.classList.add('control--hide');
    STATISTICS.classList.add('statistics--hide');
  });

  VIDEO.addEventListener('blur', function () {
    VIDEO.focus();
  });
})();