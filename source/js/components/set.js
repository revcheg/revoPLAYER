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
    currentCategory = game;
    currentVideo = data[currentCategory];

    if (currentVideo.deep) {
      deepLabel.classList.remove('settings__label--hide');
      showMessage('Доступна deep категорія');
    } else {
      deepLabel.classList.add('settings__label--hide');
    }

    setVideo();
  }
}

function setVideo() {
  currentCategory = game;
  currentSubcategory = deepFlag;
  currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];
  playCurrentVideo();
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
  VIDEO.src = '';
  VIDEO.removeAttribute('src');
  VIDEO.removeAttribute('preload');
  VIDEO.removeAttribute('crossorigin');
  statisticName.classList.add('video__name--off');
  WRAPPER.className = 'video__wrapper';
  START_BUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--off');
  // STATISTIC.classList.add('statistic--off');
  statisticUFH.classList.add('header__ufh--off');
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
  // clearSubtitle();
  stopProgress();
  resetDuration();
  backgroundVideo.pause();
  backgroundVideo.src = '';
  backgroundVideo.removeAttribute('src');
}
