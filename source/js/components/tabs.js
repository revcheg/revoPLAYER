// Tabs
const tabButtons = SETTINGS.querySelectorAll('.settings__button');
const tabs = SETTINGS.querySelectorAll('.settings__tab');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('settings__button--active'));
    tabs.forEach(tab => tab.classList.remove('settings__tab--active'));

    const tabName = button.getAttribute('data-tab');

    button.classList.add('settings__button--active');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).classList.add('settings__tab--active');
  });
});
