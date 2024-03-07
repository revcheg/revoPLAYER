// Set Video
let game = null;

const chooseButtons = SETTINGS.querySelectorAll('.settings__video');

chooseButtons.forEach((element) => {
  element.addEventListener('click', selectGame);
});

function selectGame() {
  game = this.getAttribute('data-video');
  setVideo();
}

function setVideo() {
  VIDEO.src = 'video/' + game + '/' + deepFlag + '.webm';
  VIDEO.preload = 'auto';
}

// Delete choose event from upload button
const fileButton = SETTINGS.querySelector('.settings__video--file');

fileButton.removeEventListener('click', selectGame);

// Reset video
function resetVideo() {
  pauseVideo();
  VIDEO.src = '';
  VIDEO.removeAttribute('src');
  VIDEO.removeAttribute('preload');
  VIDEO.removeAttribute('crossorigin');
  statisticsName.classList.add('statistics__name--off');
  WRAPPER.className = 'video__wrapper';
  START_BUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--off');
  // STATISTICS.classList.add('statistics--off');
  statisticsUFH.classList.add('header__ufh--off');
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
  // clearSubtitle();
  stopProgress();
  resetDuration();
  backgroundVideo.pause();
  backgroundVideo.src = '';
  backgroundVideo.removeAttribute('src');
}
