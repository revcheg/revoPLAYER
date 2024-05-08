// Tabs
const tabs = SETTINGS.querySelectorAll('.settings__tab');
const tabButtons = SETTINGS.querySelectorAll('.settings__button');

function activateTab(tabName) {
  tabButtons.forEach(btn => btn.classList.remove('settings__button--active'));
  tabs.forEach(tab => {
    tab.classList.remove('settings__tab--active', 'settings__tab--scroll');
  });

  let selectedButton = SETTINGS.querySelector(`[data-tab="${tabName}"]`);
  selectedButton.classList.add('settings__button--active');

  let selectedTab = SETTINGS.querySelector(`.settings__tab[data-tab="${tabName}"]`);
  selectedTab.classList.add('settings__tab--active');
  selectedTab.focus();

  checkActiveTab();
  updateSettingsHeight();
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    let tabName = button.getAttribute('data-tab');
    activateTab(tabName);
  });
});

function updateSettingsHeight() {
  let settingsButtonHeight = SETTINGS.querySelector('.settings__control').clientHeight;
  let settingsWrapper = SETTINGS.querySelector('.settings__wrapper');
  let settingsWrapperHeight = settingsWrapper.clientHeight;
  let activeTab = SETTINGS.querySelector('.settings__tab--active');
  let windowHeight = window.innerHeight;
  let activeTabHeight = activeTab.clientHeight;
  let blockOffset = 90;

  settingsWrapper.style.height = `calc(${windowHeight}px - ${settingsButtonHeight}px - ${blockOffset}px)`;
  activeTab.classList.toggle('settings__tab--scroll', activeTabHeight > settingsWrapperHeight);
}

updateSettingsHeight();

function checkActiveTab() {
  if (settingsOpen) {
    let activeTabName = SETTINGS.querySelector('.settings__tab--active').getAttribute('data-tab');

    if (activeTabName === 'scheme') {
      schemeSwitcher.classList.add('footer__switcher--show');
    } else {
      schemeSwitcher.classList.remove('footer__switcher--show');
    }
  } else {
    schemeSwitcher.classList.remove('footer__switcher--show');
  }
}

window.addEventListener('resize', updateSettingsHeight);
