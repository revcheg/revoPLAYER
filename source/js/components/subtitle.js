// Subtitles
const subtitles = document.querySelectorAll('.video__subtitle');
const subtitlesTrack = VIDEO.textTracks;
const subtitleButton = CONTROLS.querySelector('.control__button--subtitle');
const subtitleInfo = subtitleButton.querySelector('.control__info');

let currentSubtitleIndex = -1;

function setSubtitle() {
  if (subtitles.length === 0) {
    return;
  }

  currentSubtitleIndex++;

  if (currentSubtitleIndex >= subtitles.length) {
    currentSubtitleIndex = -1;
  }

  if (currentSubtitleIndex === -1) {
    disableSubtitle();
  } else {
    const currentSubtitle = subtitles[currentSubtitleIndex];
    enableSubtitle(currentSubtitle);
  }
}

function enableSubtitle(subtitle) {
  subtitle.track.mode = 'showing';
  subtitle.mode = 'showing';
  subtitle.default = true;
  disableOtherSubtitles(subtitle);
  subtitleButton.setAttribute('aria-label', 'Вимкнути субтитри');
  subtitleButton.setAttribute('title', 'Вимкнути субтитри (c)');
  subtitleButton.classList.add('control__button--active');
  subtitleInfo.classList.remove('control__info--hide');
  subtitleInfo.innerText = subtitle.srclang;
}

function disableSubtitle() {
  for (const subtitle of subtitles) {
    subtitle.track.mode = 'disabled';
    subtitle.mode = 'disabled';
    subtitle.default = false;
  }
  subtitleButton.setAttribute('aria-label', 'Увімкнути субтитри');
  subtitleButton.setAttribute('title', 'Увімкнути субтитри (c)');
  subtitleButton.classList.remove('control__button--active');
  subtitleInfo.classList.add('control__info--hide');
}

function disableOtherSubtitles(currentSubtitle) {
  for (const subtitle of subtitles) {
    if (subtitle !== currentSubtitle) {
      subtitle.track.mode = 'disabled';
      subtitle.mode = 'disabled';
      subtitle.default = false;
    }
  }
}

subtitleButton.addEventListener('click', setSubtitle);
