// Settings
const settings = document.querySelector('.settings');
const openButton = document.querySelector('.header__menu');
const closeButton = document.querySelector('.settings__close');

function openSettings () {
  settings.classList.remove('settings--hide');
  settings.focus();
};

function closeSettings (event) {
  settings.classList.add('settings--hide');
  settings.blur();
};

openButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', closeSettings);

// settings.addEventListener('keyup', (event) => {
//   if (event.key === 'Escape') {
//     closeSettings();
//   };
// });
