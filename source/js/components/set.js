// Set Video
let game = null;

const chooseButtons = SETTINGS.querySelectorAll('.settings__video');

function selectGame() {
  clearVideoButtons();
  if (this.getAttribute('data-video') == 'Custom') {
    return
  } else {
    this.classList.add('settings__video--active');
    game = this.getAttribute('data-video');
    setVideo();
  }
}

function setVideo() {
  currentCategory = game;
  currentSubcategory = deepFlag;
  currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];
  playCurrentVideo();
  VIDEO.preload = 'auto';
}

function clearVideoButtons() {
  chooseButtons.forEach((element) => {
    element.classList.remove('settings__video--active');
  });
}

chooseButtons.forEach((element) => {
  element.addEventListener('click', selectGame);
});

// Reset video
function resetVideo() {
  isVideoStarted = false;
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
