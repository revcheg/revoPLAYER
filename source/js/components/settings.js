// Settings
const openButton = document.querySelector('.header__menu');
const closeButton = SETTINGS.querySelector('.settings__close');

let settingsOpen = false;

function openSettings() {
  if (settingsOpen) {
    settingsOpen = false;
    SETTINGS.classList.add('settings--hide');
    SETTINGS.blur();
  } else {
    settingsOpen = true;
    SETTINGS.classList.remove('settings--hide');
    SETTINGS.focus();
  }

  checkActiveTab();
}

function closeSettings() {
  settingsOpen = false;
  SETTINGS.classList.add('settings--hide');
  SETTINGS.blur();
  checkActiveTab();
}

openButton.addEventListener('click', openSettings);
closeButton.addEventListener('click', closeSettings);

// Statistics checkbox
const statisticsCheckbox = SETTINGS.querySelector('.settings__checkbox--statistics');
const statisticsAdditionalCheckbox = SETTINGS.querySelector('.settings__checkbox--additional');
const statisticsAdditional = SETTINGS.querySelector('.settings__label--add');
const statisticsHiddenCategory = STATISTICS.querySelectorAll('.statistics__category--hide');

function showAddCheckbox(event) {
  const checked = event.currentTarget.checked;

  STATISTICS.classList.toggle('statistics--off', !checked);
  statisticsAdditional.classList.toggle('settings__label--hide', !checked);

  if (!checked) {
    statisticsAdditionalCheckbox.checked = false;
    statisticsHiddenCategory.forEach((element) => {
      element.classList.add('statistics__category--hide');
    });
  }
}

function showAddStatistic(event) {
  const checked = event.currentTarget.checked;

  if (checked) {
    statisticsHiddenCategory.forEach((element) => {
      element.classList.remove('statistics__category--hide');
    });
  } else {
    statisticsHiddenCategory.forEach((element) => {
      element.classList.add('statistics__category--hide');
    });
  }

  if (!checked) {
    statisticsAdditionalCheckbox.checked = false;
  }
}

statisticsCheckbox.addEventListener('change', showAddCheckbox);
statisticsAdditionalCheckbox.addEventListener('change', showAddStatistic);

// Scale player
const scaleCheckbox = SETTINGS.querySelector('.settings__checkbox--scale');

function setupScale() {
  if (scaleCheckbox.checked) {
    BODY.addEventListener('mousemove', setScale);
  } else {
    WRAPPER.removeAttribute('style');
    BODY.removeEventListener('mousemove', setScale);
  }
}

function setScale(event) {
  if (scaleCheckbox.checked && event.isTrusted) {
    let xPos = -(event.pageX / window.innerWidth - 0.5) * -20;
    let yPos = (event.pageY / window.innerHeight - 0.5) * -20;
    let blockRect = VIDEO.getBoundingClientRect();
    let mouseX = event.clientX - blockRect.left;
    let mouseY = event.clientY - blockRect.top;

    if (!(mouseX >= 0 && mouseX < blockRect.width && mouseY >= 0 && mouseY < blockRect.height)) {
      WRAPPER.style.transform = 'perspective(1000px) rotateY(' + xPos + 'deg) rotateX(' + yPos + 'deg) scaleZ(2)';
    } else {
      WRAPPER.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scaleZ(1)';
    }
  }
}

scaleCheckbox.addEventListener('change', setupScale);

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

// Extra line
let lineProgress;

const line = CONTROLS.querySelector('.control__line');
const lineCheckbox = SETTINGS.querySelector('.settings__checkbox--line');

function showExtraLine() {
  if (lineCheckbox.checked) {
    line.classList.remove('control__line--hide');
  } else {
    line.classList.add('control__line--hide');
  }
}

function extraLine() {
  lineProgress = Math.round((videoCurrentTime / videoDuration) * 100);
  line.style.width = lineProgress + '%';
  line.value = lineProgress;
}

lineCheckbox.addEventListener('change', showExtraLine);

// Additional controls
const controlsCheckbox = SETTINGS.querySelector('.settings__checkbox--controls');
const additionalControls = CONTROLS.querySelectorAll('.control__button--hide');

function showAddControls() {
  controlsCheckbox.checked = !controlsCheckbox.checked;

  additionalControls.forEach(control => {
    if (controlsCheckbox.checked) {
      control.classList.remove('control__button--hide');
    } else {
      control.classList.add('control__button--hide');
    }
  });
}

controlsCheckbox.addEventListener('change', showAddControls);
controlsCheckbox.addEventListener('click', showAddControls);

// Autoplay
let autoplayFlag = true;
const autoplayCheckbox = SETTINGS.querySelector('.settings__checkbox--autoplay');

function setAutoplay() {
  if (autoplayCheckbox.checked) {
    autoplayFlag = true;
    VIDEO.addEventListener('loadeddata', startVideo);
  } else {
    autoplayFlag = false;
    VIDEO.removeEventListener('loadeddata', startVideo);
  }
}

autoplayCheckbox.addEventListener('change', setAutoplay);

// Subtitle background
// const subtitleCheckbox = SETTINGS.querySelector('.settings__checkbox--subtitle');

// function setBackgroundSubtitle() {
//   const textTracks = VIDEO.textTracks;

//   for (const track of textTracks) {
//     const cues = track.cues;

//     // Перевірка, чи `cues` визначено та чи є ітерабельним
//     if (cues && cues.length > 0) {
//       for (let i = 0; i < cues.length; i++) {
//         const cue = cues[i];
//         const cueElement = cue.getCueAsHTML();

//         // Перевірка, чи є HTML-представлення та чи має елемент стиль
//         if (cueElement && cueElement.style) {
//           cueElement.style.backgroundColor = subtitleCheckbox.checked ? 'rgba(255, 0, 0, 0.5)' : 'transparent';
//         }
//       }
//     }
//   }
// }

// subtitleCheckbox.addEventListener('change', setBackgroundSubtitle);

// Auto scheme
const autoschemeCheckbox = SETTINGS.querySelector('.settings__checkbox--autoscheme');

function setAutoscheme() {
  clearSchemeButtons();

  if (autoschemeCheckbox.checked) {
    setScheme('auto');
  }
};

function clearSchemeButtons() {
  const lightSchemeLabel = FOOTER.querySelector('.footer__scheme[value="light"]').parentNode;
  const darkSchemeLabel = FOOTER.querySelector('.footer__scheme[value="dark"]').parentNode;
  const autoSchemeLabel = FOOTER.querySelector('.footer__scheme[value="auto"]').parentNode;

  if (autoschemeCheckbox.checked) {
    lightSchemeLabel.classList.add('footer__label--hide');
    darkSchemeLabel.classList.add('footer__label--hide');

    setTimeout(() => {
      lightSchemeLabel.classList.add('footer__label--off');
      darkSchemeLabel.classList.add('footer__label--off');
    }, 100);

    setTimeout(() => {
      autoSchemeLabel.classList.remove('footer__label--off');
      setTimeout(() => {
        autoSchemeLabel.classList.remove('footer__label--hide');
      }, 100);
    }, 100);
  } else {
    autoSchemeLabel.classList.add('footer__label--hide');

    setTimeout(() => {
      lightSchemeLabel.classList.remove('footer__label--off');
      darkSchemeLabel.classList.remove('footer__label--off');
      autoSchemeLabel.classList.add('footer__label--off');

      setTimeout(() => {
        lightSchemeLabel.classList.remove('footer__label--hide');
        darkSchemeLabel.classList.remove('footer__label--hide');
      }, 100);
    }, 100);
  }
}

autoschemeCheckbox.addEventListener('change', setAutoscheme);

// Blur
const blurCheckbox = SETTINGS.querySelector('.settings__checkbox--blur');

blurCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    BODY.classList.add('blur');
  } else {
    BODY.classList.remove('blur');
  }
});

// Background video
let backgroundFlag = false;

const background = document.querySelector('.background');
const backgroundCheckbox = SETTINGS.querySelector('.settings__checkbox--background');
const backgroundVideo = document.querySelector('.background__video');

function showBackground() {
  if (backgroundCheckbox.checked) {
    backgroundFlag = true;
    background.classList.remove('background--off');

    if (VIDEO.src) {
      backgroundVideo.src = VIDEO.src;
    }

    if (videoCurrentTime) {
      backgroundVideo.currentTime = videoCurrentTime;
    }
  } else {
    backgroundFlag = false;
    background.classList.add('background--off');
    backgroundVideo.removeAttribute('src');
  }
}

backgroundCheckbox.addEventListener('change', showBackground);

// Series list
const seriesCheckbox = SETTINGS.querySelector('.settings__checkbox--series');
const seriesLabel = SETTINGS.querySelector('.settings__label--series');

function showSeriesList() {
  if (seriesCheckbox.checked) {
    SERIES_LIST.classList.remove('series--off');
  } else {
    SERIES_LIST.classList.add('series--off');
  }
};

seriesCheckbox.addEventListener('change', showSeriesList);
