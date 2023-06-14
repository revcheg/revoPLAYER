// Tabs
const tabButtons = SETTINGS.querySelectorAll('.settings__button');
const tabs = SETTINGS.querySelectorAll('.settings__tab');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('settings__button--active'));
    tabs.forEach(tab => {
      tab.classList.remove('settings__tab--active');
      tab.classList.remove('settings__tab--scroll');
      tab.removeAttribute('tabIndex');
    });

    button.classList.add('settings__button--active');

    const tabName = button.getAttribute('data-tab');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).classList.add('settings__tab--active');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).setAttribute('tabIndex', '0');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).focus();

    updateSettingsHeight();
  });
});

function updateSettingsHeight() {
  const settingsButtonHeight = SETTINGS.querySelector('.settings__control').clientHeight;
  const settingsWrapper = SETTINGS.querySelector('.settings__wrapper');
  const settingsWrapperHeight = settingsWrapper.clientHeight;
  const activeTab = document.querySelector('.settings__tab--active');
  const activeTabHeight = activeTab.clientHeight;

  if (BODY.clientWidth < 1440) {
    settingsWrapper.style.height = `calc(100vh - ${settingsButtonHeight}px - 61px)`;

    if (activeTabHeight >= settingsWrapperHeight) {
      activeTab.style.height = settingsWrapperHeight + 'px';
      activeTab.classList.add('settings__tab--scroll');
      activeTab.style.height = settingsWrapperHeight + 'px';
    }
  }
}

updateSettingsHeight();

window.addEventListener('resize', updateSettingsHeight);
