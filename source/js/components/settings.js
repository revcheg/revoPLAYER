// Settings
const openButton = document.querySelector('.header__menu');
const closeButton = SETTINGS.querySelector('.settings__close');

function openSettings() {
  SETTINGS.classList.remove('settings--hide');
  SETTINGS.focus();
}

function closeSettings() {
  SETTINGS.classList.add('settings--hide');
  SETTINGS.blur();
}

openButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', closeSettings);

// Statistics checkbox
const statisticsCheckbox = SETTINGS.querySelector('.settings__checkbox--statistics');
const statisticsAdditionalCheckbox = SETTINGS.querySelector('.settings__checkbox--additional');
const statisticsAdditional = SETTINGS.querySelector('.settings__label--add');
const statisticsHiddenCategory = STATISTICS.querySelectorAll('.statistics__category--hide');

statisticsCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    STATISTICS.classList.remove('statistics--off');
    statisticsAdditional.classList.remove('settings__label--hide');
    statisticsAdditionalCheckbox.removeAttribute('disabled');
  } else {
    STATISTICS.classList.add('statistics--off');
    statisticsAdditional.classList.add('settings__label--hide');
    statisticsAdditionalCheckbox.checked = false;
    statisticsAdditionalCheckbox.setAttribute('disabled', 'disabled');
  }
});

statisticsAdditionalCheckbox.addEventListener('change', function (event) {
  statisticsHiddenCategory.forEach((element) => {
    element.classList.remove('statistics__category--hide');
  });
});

// Deep mode
let deepFlag = 'main';
const deepCheckbox = SETTINGS.querySelector('.settings__checkbox--deep');

deepCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    deepFlag = 'deep';
  } else {
    deepFlag = 'main';
  }

  setVideo();
});

// HQ mode
// let hqCheckbox = document.querySelector('.settings__checkbox--hq');
// let hqFlag;

// hqCheckbox.addEventListener('change', function (event) {
//   if (event.currentTarget.checked) {
//     hqFlag = true;
//   } else {
//     hqFlag = false;
//   };
// });

// Extra line
const line = CONTROLS.querySelector('.control__line');
const lineCheckbox = SETTINGS.querySelector('.settings__checkbox--line');

lineCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    line.classList.remove('control__line--hide');
  } else {
    line.classList.add('control__line--hide');
  }
});

// 3D scale
const scaleCheckbox = SETTINGS.querySelector('.settings__checkbox--scale');

// Little fix mobile settings height
const settingsButtonHeight = SETTINGS.querySelector('.settings__control').clientHeight;
const settingsWrapper = SETTINGS.querySelector('.settings__wrapper');
if (BODY.clientWidth < 1440) {
  settingsWrapper.style.height = `calc(100vh - ${settingsButtonHeight}px - 60px)`;
}
