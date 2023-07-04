// Subtitle
const subtitle = VIDEO.querySelector('.video__subtitle');
const subtitleTrack = VIDEO.querySelector('.video__subtitle').track;
const subtitleButton = CONTROLS.querySelector('.control__button--subtitle');

subtitle.default = false;
subtitleTrack.mode = 'hidden';

function showSubtitle() {
  if (subtitle.default) {
    subtitle.default = false;
    subtitleTrack.mode = 'hidden';
    subtitleButton.classList.remove('control__button--active');
  } else {
    subtitle.default = true;
    subtitleTrack.mode = 'showing';
    subtitleButton.classList.add('control__button--active');
  }
}

subtitleButton.addEventListener('click', showSubtitle);
