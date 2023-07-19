// Console
const consoleContainer = document.querySelector('.console');
const consoleInput = consoleContainer.querySelector('.console__input');

let consoleFlag = false;

function openConsole() {
  consoleFlag = !consoleFlag;

  if (consoleFlag) {
    consoleContainer.classList.remove('console--hide');
    VIDEO.blur();
    consoleInput.value = '';
    consoleInput.focus();
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
    let clientText = consoleInput.value;

    switch (clientText) {
      case 'unlimited spider man':
        VIDEO.src = 'video/USP-intro.mp4';
        if (autoplayFlag) {
          VIDEO.addEventListener('loadeddata', startVideo);
        } else {
          VIDEO.removeEventListener('loadeddata', startVideo);
        }
        break;

      case 'spider man':
        VIDEO.src = 'video/SP-intro.mp4';
        if (autoplayFlag) {
          VIDEO.addEventListener('loadeddata', startVideo);
        } else {
          VIDEO.removeEventListener('loadeddata', startVideo);
        }
        break;
    }

    consoleInput.value = '';
    openConsole();
    showError('Відкрито бонусне відео &#128521;');
  }
}

consoleInput.addEventListener('input', stopPropagation);
consoleInput.addEventListener('keyup', stopPropagation);
consoleInput.addEventListener('keyup', checkBonus);
