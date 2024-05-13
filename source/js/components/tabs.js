// Tabs
const settingsCategory = SETTINGS.querySelectorAll('.settings__tab');
const settingsButtons = SETTINGS.querySelectorAll('.settings__button');

let categoryName;

settingsButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryName = button.getAttribute('data-tab');
    setSettingsCategory(categoryName);
  });
});

function setSettingsCategory(categoryName) {
  settingsButtons.forEach(btn => btn.classList.remove('settings__button--active'));
  settingsCategory.forEach(tab => tab.classList.remove('settings__tab--active'));

  let activeButton = SETTINGS.querySelector(`[data-tab="${categoryName}"]`);
  activeButton.classList.add('settings__button--active');

  let activeCategory = SETTINGS.querySelector(`.settings__tab[data-tab="${categoryName}"]`);
  activeCategory.classList.add('settings__tab--active');
  activeCategory.focus();

  if (categoryName === 'scheme') {
    schemeSwitcher.classList.add('footer__switcher--show');
  } else {
    schemeSwitcher.classList.remove('footer__switcher--show');
  }
}
