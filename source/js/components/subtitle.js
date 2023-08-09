// Subtitles
const subtitles = document.querySelectorAll('.video__subtitle');
const subtitleButton = CONTROLS.querySelector('.control__button--subtitle');
const subtitleInfo = subtitleButton.querySelector('.control__info');

let currentSubtitleIndex = -1;

function changeSubtitle() {
  currentSubtitleIndex++;

  if (currentSubtitleIndex >= subtitles.length) {
    currentSubtitleIndex = -1;
    clearSubtitle();
    return;
  }

  clearSubtitle();

  const currentSubtitle = subtitles[currentSubtitleIndex];

  currentSubtitle.track.mode = 'showing';
  currentSubtitle.mode = 'showing';
  currentSubtitle.default = true;

  subtitleButton.setAttribute('aria-label', 'Вимкнути субтитри');
  subtitleButton.setAttribute('title', 'Вимкнути субтитри (c)');
  subtitleButton.classList.add('control__button--active');
  subtitleInfo.classList.remove('control__info--hide');
  subtitleInfo.innerHTML = currentSubtitle.srclang;
}

function clearSubtitle() {
  for (const subtitle of subtitles) {
    subtitle.track.mode = 'hidden';
    subtitle.mode = 'hidden';
    subtitle.default = false;
  }

  if (currentSubtitleIndex === -1) {
    subtitleButton.setAttribute('aria-label', 'Увімкнути субтитри');
    subtitleButton.setAttribute('title', 'Увімкнути субтитри (c)');
    subtitleButton.classList.remove('control__button--active');
    subtitleInfo.classList.add('control__info--hide');
  }
}

subtitleButton.addEventListener('click', changeSubtitle);
