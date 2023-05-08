// Set Video
let game;

const chooseButtons = document.querySelectorAll('.settings__button');

chooseButtons.forEach((element) => {
  element.addEventListener('click', function () {
    game = this.getAttribute('data-video');
    resetVideo();
    setVideo();
    deepCheckbox.removeAttribute('disabled', 'disabled');
  });
});

function setVideo () {
  VIDEO.src = 'video/' + game + '/' + deepFlag + '.webm';
  VIDEO.preload = 'auto';
  VIDEO.volume = 0.5;
};

// Deep mode
let deepFlag;
let deepCheckbox = document.querySelector('.settings__checkbox--deep');

deepCheckbox.addEventListener('change', function (event) {
  if (event.currentTarget.checked) {
    deepFlag = 'deep';
  } else {
    deepFlag = 'main';
  };

  setVideo();
});

// HQ mode
// let hqCheckbox = document.querySelector('.settings__checkbox--hq');
// let hqFlag;

// hqCheckbox.addEventListener('change', function (event) {
//   if (event.currentTarget.checked) {
//     hqFlag = true;
//   } else {
//     hqFlag = false;
//   };
// });

// Reset video
function resetVideo () {
  VIDEO.pause();
  STARTBUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--hide');
  STATISTICS.classList.add('statistics--hide');
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
};