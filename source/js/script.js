// Settings
(function () {
  let menu = document.querySelector('.settings');
  let openButton = document.querySelector('.header__menu');
  let closeButton = document.querySelector('.settings__close');

  openButton.addEventListener('click', function(){
    menu.classList.remove('settings--hide');
  });

  closeButton.addEventListener('click', function(){
    menu.classList.add('settings--hide');
  });
})();