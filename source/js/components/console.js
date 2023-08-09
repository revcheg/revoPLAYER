// Console
const consoleContainer = document.querySelector('.console');
const consoleInput = consoleContainer.querySelector('.console__input');
const consoleBackground = consoleContainer.querySelector('.console__background');

function openConsole() {
  consoleBackground.src = 'video/console.mp4';
  consoleBackground.play();
  consoleContainer.classList.remove('console--hide');
  VIDEO.blur();
  consoleInput.focus();
}

function closeConsole() {
	consoleContainer.classList.add('console--hide');
	consoleInput.value = '';
  consoleInput.blur();
}

let bonusURL;

function checkBonus(event) {
  if (event.key === 'Enter') {
    resetVideo();

    switch (consoleInput.value) {
      case 'unlimited spider man':
        bonusURL = 'video/USP-intro.mp4';
        setBonusVideo(bonusURL);
        closeConsole();
        showError('Відкрито бонусне відео &#128375;');
        break;

      case 'spider man':
        bonusURL = 'video/SP-intro.mp4';
        setBonusVideo(bonusURL);
        closeConsole();
        showError('Відкрито бонусне відео &#128375;');
        break;

      case 'vice city':
				bonusURL = 'video/GTAVC-intro.webm';
        setBonusVideo(bonusURL);
        addScheme('vice');
        closeConsole();
        showError('Розблокована нова тема &#127847;');
        break;

      default:
        showError('Команда неможлива &#128126;');
    }

    if (autoplayFlag) {
      VIDEO.addEventListener('loadeddata', startVideo);
    } else {
      VIDEO.removeEventListener('loadeddata', startVideo);
    }
  }
}

function setBonusVideo(bonusURL) {
  // currentVideo = data.bonus.main[0];
  // currentVideo.src = bonusURL;
  VIDEO.src = bonusURL;
  subtitleButton.classList.add('control__button--off');
}

function stopPropagation(event) {
  event.stopPropagation();
}

consoleInput.addEventListener('input', stopPropagation);
consoleInput.addEventListener('keyup', stopPropagation);
consoleInput.addEventListener('keyup', checkBonus);

const devButton = document.querySelector('.footer__copyright--dev');

let clickCount = 0;

function handleDevClick() {
  clickCount++;

  if (clickCount >= 10) {
    openConsole();
    clickCount = 0;
  }
}

devButton.addEventListener('click', handleDevClick);
