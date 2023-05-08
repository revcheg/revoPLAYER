// Settings
const openButton = document.querySelector('.header__menu');
const closeButton = document.querySelector('.settings__close');

function openSettings () {
  SETTINGS.classList.remove('settings--hide');
  SETTINGS.focus();
};

function closeSettings (event) {
  SETTINGS.classList.add('settings--hide');
  SETTINGS.blur();
};

openButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', closeSettings);