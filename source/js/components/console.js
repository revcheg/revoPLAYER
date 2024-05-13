// Console
const consoleContainer = document.querySelector('.console');
const consoleBackground = consoleContainer.querySelector('.console__background');
const consoleClose = consoleContainer.querySelector('.console__close');
const consoleInput = consoleContainer.querySelector('.console__input');

function openConsole() {
  if (!consoleBackground.src) {
    consoleBackground.src = 'video/console.mp4';
  }
  consoleBackground.play();
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

// Open console, dev button
const devButton = FOOTER.querySelector('.footer__copyright--dev');
const MAX_DEV_CLICK = 10;
let clickCount = 0;

function devClicks() {
  if (++clickCount >= MAX_DEV_CLICK) {
    clickCount = 0;
    openConsole();
    showMessage('Консоль розробника розблокована &#129323;');
  } else {
    showMessage(`Залишилось ${MAX_DEV_CLICK - clickCount} кліків`);
  }
}

devButton.addEventListener('click', devClicks);

// Command list
const consoleCommands = {
  'unlimited spider man': {
    currentCategory: 'bonus',
    currentSubcategory: 'Unlimited Spider Man',
    message: 'Відкрито бонусне відео &#128375;',
  },
  'spider man': {
    currentCategory: 'bonus',
    currentSubcategory: 'Spider Man',
    message: 'Відкрито бонусне відео &#128375;',
  },
  'vice city': {
    currentCategory: 'bonus',
    currentSubcategory: 'Vice City',
    message: 'Розблокована нова тема &#127847;',
    scheme: 'vice',
  },
  'assassins creed 2': {
    currentCategory: 'bonus',
    currentSubcategory: 'Assassins Creed 2',
    message: 'Відкрито бонусне відео &#129413;',
  },
  'tmnt': {
    currentCategory: 'bonus',
    currentSubcategory: 'TMNT',
    message: 'Кавабанга &#127829;',
  },
};

function executeCommand(event) {
  if (event.key === 'Enter') {
    let command = consoleInput.value.trim().toLowerCase();
    let commandDescription = consoleCommands[command];

    if (commandDescription) {
      deepLabel.classList.add('settings__option--hide');

      currentCategory = commandDescription.currentCategory;
      currentSubcategory = commandDescription.currentSubcategory;
      currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];

      resetVideo();
      setupCurrentVideo();
      closeConsole();
      showMessage(commandDescription.message);

      if (autoplayFlag) {
        startVideo();
      }

      if (commandDescription.scheme) {
        createScheme(commandDescription.scheme);
      }
    } else {
      showMessage('Команда неможлива &#128126;');
    }

    consoleInput.value = '';
    consoleInput.blur();
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

consoleInput.addEventListener('input', stopPropagation);
consoleInput.addEventListener('keyup', stopPropagation);
consoleInput.addEventListener('keyup', executeCommand);

// Execute dev command
const devConsoleCheckbox = consoleContainer.querySelector('.console__input--checkbox');

function executeDevCommand(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    let command = consoleInput.value;

    try {
      let result = eval(command);
      showMessage('Результат: ' + result);
    } catch (error) {
      showMessage('Помилка: ' + error.message);
    }

    consoleInput.value = '';
    consoleInput.blur();
  }
}

function activateDevConsole() {
  if (devConsoleCheckbox.checked) {
    consoleInput.removeEventListener('keyup', executeCommand);
    consoleInput.addEventListener('keyup', executeDevCommand);
  } else {
    consoleInput.removeEventListener('keyup', executeDevCommand);
    consoleInput.addEventListener('keyup', executeCommand);
  }
}

devConsoleCheckbox.addEventListener('change', activateDevConsole);
