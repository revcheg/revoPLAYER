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

// Command list
const consoleCommands = {
  'unlimited spider man': {
    videoSrc: 'video/USP-intro.mp4',
    message: 'Відкрито бонусне відео &#128375;',
  },
  'spider man': {
    videoSrc: 'video/SP-intro.mp4',
    message: 'Відкрито бонусне відео &#128375;',
  },
  'vice city': {
    videoSrc: 'video/GTAVC-intro.webm',
    message: 'Розблокована нова тема &#127847;',
    scheme: 'vice',
  },
  'assassins creed 2': {
    videoSrc: 'video/ACII-trailer.mp4',
    message: 'Відкрито бонусне відео &#129413;',
  },
  'tmnt': {
    videoSrc: 'video/TMNT-intro.mp4',
    message: 'Кавабанга &#127829;',
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
      showMessage(commandDescription.message);
    } else {
      consoleInput.value = '';
      showMessage('Команда неможлива &#128126;');
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
    clickCount = 0;
    openConsole();
    showMessage('Консоль розробника розблокована &#129323;');
  } else {
    showMessage(`Залишилось ${MAX_DEV_CLICK_COUNT - clickCount} кліків`);
  }
}

devButton.addEventListener('click', devClicks);

// Execute dev command
// const devConsoleCheckbox = consoleContainer.querySelector('.console__input--checkbox');

// function executeCommand() {
//   let command = consoleInput.value;

//   try {
//     let result = eval(command);
//     showMessage('Результат: ' + result);
//   } catch (error) {
//     showMessage('Помилка: ' + error.message);
//   }

//   consoleInput.value = '';
// }

// function activateDevConsole() {
//   if (devConsoleCheckbox.checked) {
//     consoleInput.removeEventListener('keyup', checkBonus);
//     consoleInput.addEventListener('keyup', function(event) {
//       if (event.key === 'Enter' && !event.shiftKey) {
//         executeCommand();
//       }
//     });
//   } else {
//     consoleInput.removeEventListener('keyup', executeCommand);
//     consoleInput.addEventListener('keyup', checkBonus);
//   }
// }

// devConsoleCheckbox.addEventListener('change', activateDevConsole);
