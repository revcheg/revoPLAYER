// Tabs
const tabButtons = SETTINGS.querySelectorAll('.settings__button');
const tabs = SETTINGS.querySelectorAll('.settings__tab');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('settings__button--active'));
    // tabs.forEach(tab => tab.classList.remove('settings__tab--active'));
    tabs.forEach(tab => {
      tab.classList.remove('settings__tab--active');
      tab.classList.remove('settings__tab--relative');
      tab.removeAttribute('tabIndex');
    });

    const tabName = button.getAttribute('data-tab');

    button.classList.add('settings__button--active');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).classList.add('settings__tab--active');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).setAttribute('tabIndex', '0');
    document.querySelector(`.settings__tab[data-tab="${tabName}"]`).focus();
    updateSettingsHeight();
  });
});

// Little fix mobile settings height
function updateSettingsHeight() {
  const settingsButtonHeight = SETTINGS.querySelector('.settings__control').clientHeight;
  const settingsWrapper = SETTINGS.querySelector('.settings__wrapper');
  const settingsWrapperHeight = settingsWrapper.clientHeight;
  const activeTab = document.querySelector('.settings__tab--active');
  const activeTabHeight = activeTab.clientHeight;

  if (BODY.clientWidth < 1440) {
    settingsWrapper.style.height = `calc(100vh - ${settingsButtonHeight}px - 61px)`;
    settingsWrapper.style.margin = '0';

    if (activeTabHeight > settingsWrapperHeight) {
      activeTab.classList.add('settings__tab--relative');
      settingsWrapper.style.height = activeTabHeight + 'px';
      settingsWrapper.style.margin = '15px 0 40px 0';
    } 
  }
}

updateSettingsHeight();

window.addEventListener('resize', updateSettingsHeight);
