// Subtitle
const subtitle = VIDEO.querySelector('.video__subtitle');
const subtitleTrack = subtitle.track;
const subtitleButton = CONTROLS.querySelector('.control__button--subtitle');
const subtitleInfo = subtitleButton.querySelector('.control__info');

subtitle.default = false;
subtitleTrack.mode = 'hidden';

let currentSubtitleIndex = -1;

function changeSubtitle() {
  currentSubtitleIndex++;

  const availableSubtitles = Object.keys(currentVideo.subtitles);

  if (currentSubtitleIndex >= availableSubtitles.length) {
    currentSubtitleIndex = -1;
    clearSubtitle();
    return;
  }

  const nextSubtitleLang = availableSubtitles[currentSubtitleIndex];
  const nextSubtitle = currentVideo.subtitles[nextSubtitleLang];

  subtitle.src = nextSubtitle.src;
  subtitle.srclang = nextSubtitle.srclang;
  subtitle.label = nextSubtitle.label;
  subtitle.default = true;
  subtitleTrack.mode = 'showing';
  subtitleButton.setAttribute('aria-label', 'Вимкнути субтитри');
  subtitleButton.setAttribute('title', 'Вимкнути субтитри (c)');
  subtitleButton.classList.add('control__button--active');
  subtitleInfo.classList.remove('control__info--hide');
  subtitleInfo.innerHTML = nextSubtitle.srclang;
}

function clearSubtitle() {
  subtitle.src = '';
  subtitle.srclang = '';
  subtitle.label = '';
  subtitle.default = false;
  subtitleTrack.mode = 'hidden';
  subtitleButton.setAttribute('aria-label', 'Увімкнути субтитри');
  subtitleButton.setAttribute('title', 'Увімкнути субтитри (c)');
  subtitleButton.classList.remove('control__button--active');
  subtitleInfo.classList.add('control__info--hide');
}

subtitleButton.addEventListener('click', changeSubtitle);
