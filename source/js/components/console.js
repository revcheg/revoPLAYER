// Console
const consoleContainer = document.querySelector('.console');
const consoleClose = consoleContainer.querySelector('.console__close');
const consoleBackground = consoleContainer.querySelector('.console__background');
const consoleInput = consoleContainer.querySelector('.console__input');

function openConsole() {
  if (consoleBackground.paused) {
    consoleBackground.play();
  }
  consoleContainer.classList.remove('console--hide');
  consoleInput.focus();
}

function closeConsole() {
  consoleBackground.pause();
	consoleContainer.classList.add('console--hide');
	consoleInput.value = '';
  consoleInput.blur();
}

consoleClose.addEventListener('click', closeConsole);

// Check command and bonus video
const consoleCommands = {
  'unlimited spider man': {
    videoSrc: 'video/USP-intro.mp4',
    message: 'Відкрито бонусне відео &#128375;',
    scheme: null,
  },
  'spider man': {
    videoSrc: 'video/SP-intro.mp4',
    message: 'Відкрито бонусне відео &#128375;',
    scheme: null,
  },
  'vice city': {
    videoSrc: 'video/GTAVC-intro.webm',
    message: 'Розблокована нова тема &#127847;',
    scheme: 'vice',
  },
};

function checkBonus(event) {
  if (event.key === 'Enter') {
    resetVideo();

    let command = consoleInput.value.toLowerCase();
    let commandDescription = consoleCommands[command];

    if (commandDescription) {
      VIDEO.src = commandDescription.videoSrc;
      if (commandDescription.scheme) {
        addScheme(commandDescription.scheme);
      }
      closeConsole();
      showError(commandDescription.message);
    } else {
      showError('Команда неможлива &#128126;');
    }

    if (autoplayFlag) {
      VIDEO.addEventListener('loadeddata', startVideo);
    } else {
      VIDEO.removeEventListener('loadeddata', startVideo);
    }
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

consoleInput.addEventListener('input', stopPropagation);
consoleInput.addEventListener('keyup', stopPropagation);
consoleInput.addEventListener('keyup', checkBonus);

// Open console, dev button
const devButton = FOOTER.querySelector('.footer__copyright--dev');
const MAX_DEV_CLICK_COUNT = 10;
let clickCount = 0;

function devClicks() {
  if (++clickCount >= MAX_DEV_CLICK_COUNT) {
    openConsole();
    clickCount = 0;
  }
}

devButton.addEventListener('click', devClicks);
