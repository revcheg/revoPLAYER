// Settings
const openButton = document.querySelector('.header__menu');
const closeButton = document.querySelector('.settings__close');

function openSettings () {
  SETTINGS.classList.remove('settings--hide');
  SETTINGS.focus();
};

function closeSettings () {
  SETTINGS.classList.add('settings--hide');
  SETTINGS.blur();
};

openButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', closeSettings);

// Statistics checkbox
const statisticsCheckbox = document.querySelector('.settings__checkbox--statistics');
const statisticsAdditionalCheckbox = document.querySelector('.settings__checkbox--additional');
const statisticsAdditional = document.querySelector('.settings__label--add');
const statisticsHiddenCategory = document.querySelectorAll('.statistics__category--hide');

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
  };
});

statisticsAdditionalCheckbox.addEventListener('change', function (event) {
  statisticsHiddenCategory.forEach((element) => {
    element.classList.remove('statistics__category--hide');
  });
});

// Deep mode
let deepFlag;
const deepCheckbox = document.querySelector('.settings__checkbox--deep');

deepCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    deepFlag = 'deep';
  } else {
    deepFlag = 'main';
  };

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
const extraline = document.querySelector('.control__extraline');
const extralineCheckbox = document.querySelector('.settings__checkbox--extraline');

extralineCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    extraline.classList.remove('control__extraline--hide');
  } else {
    extraline.classList.add('control__extraline--hide');
  };
});
