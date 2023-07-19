// Console
const consoleContainer = document.querySelector('.console');
const consoleInput = consoleContainer.querySelector('.console__input');
const consoleBackground = consoleContainer.querySelector('.console__background');

let consoleFlag = false;

function openConsole() {
  consoleFlag = !consoleFlag;

  if (consoleFlag) {
    consoleContainer.classList.remove('console--hide');
    VIDEO.blur();
    consoleInput.value = '';
    consoleInput.focus();
    consoleBackground.play();
  } else {
    consoleContainer.classList.add('console--hide');
    VIDEO.focus();
    consoleInput.blur();
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

function checkBonus(event) {
  if (event.key === 'Enter') {

    switch (consoleInput.value) {
      case 'unlimited spider man':
        VIDEO.src = 'video/USP-intro.mp4';
        openConsole();
        showError('Відкрито бонусне відео &#128375;');
        break;

      case 'spider man':
        VIDEO.src = 'video/SP-intro.mp4';
        openConsole();
        showError('Відкрито бонусне відео &#128375;');
        break;

      default:
        showError('Команда неможлива &#128126;');
    }

    if (autoplayFlag) {
      VIDEO.addEventListener('loadeddata', startVideo);
    } else {
      VIDEO.removeEventListener('loadeddata', startVideo);
    }

    consoleInput.value = '';
  }
}

consoleInput.addEventListener('input', stopPropagation);
consoleInput.addEventListener('keyup', stopPropagation);
consoleInput.addEventListener('keyup', checkBonus);
