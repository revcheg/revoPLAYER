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
  let settingsButtonHeight = SETTINGS.querySelector('.settings__control').clientHeight;
  const settingsWrapper = SETTINGS.querySelector('.settings__wrapper');
  let settingsWrapperHeight = settingsWrapper.clientHeight;
  const activeTab = SETTINGS.querySelector('.settings__tab--active');
  let activeTabHeight = activeTab.clientHeight;
  let blockOffset = 90;

  // if (windowWidth > 768) {
  //   blockOffset = 0;
  // }

  settingsWrapper.style.height = `calc(100vh - ${settingsButtonHeight}px - ${blockOffset}px)`;

  if (activeTabHeight > settingsWrapperHeight) {
    activeTab.classList.add('settings__tab--scroll');
  } else {
    activeTab.classList.remove('settings__tab--scroll');
  }
}

updateSettingsHeight();

window.addEventListener('resize', updateSettingsHeight);
