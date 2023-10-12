// Set Video
let game = null;

const chooseButtons = document.querySelectorAll('.settings__video');

chooseButtons.forEach((element) => {
  element.addEventListener('click', function () {
    game = this.getAttribute('data-video');
    setVideo();
    deepCheckbox.removeAttribute('disabled', 'disabled');
  });
});

function setVideo() {
  VIDEO.src = 'video/' + game + '/' + deepFlag + '.webm';
  VIDEO.preload = 'auto';
}

// Reset video
function resetVideo() {
  VIDEO.pause();
  VIDEO.removeAttribute('src');
  VIDEO.removeAttribute('crossorigin');
  WRAPPER.className = 'video__wrapper';
  START_BUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--off');
  // STATISTICS.classList.add('statistics--off');
  statisticsUFH.classList.add('statistics--off');
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
  // clearSubtitle();
  stopProgress();
  resetDuration();
}
