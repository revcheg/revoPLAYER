// Settings
(function () {
  const menu = document.querySelector('.settings');
  const openButton = document.querySelector('.header__menu');
  const closeButton = document.querySelector('.settings__close');

  openButton.addEventListener('click', function () {
    menu.classList.remove('settings--hide');
  });

  closeButton.addEventListener('click', function () {
    menu.classList.add('settings--hide');
  });

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      menu.classList.add('settings--hide');
    };
  });
})();