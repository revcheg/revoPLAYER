// Set Video
let game;

(function () {
  const chooseButtons = document.querySelectorAll('.settings__button');

  chooseButtons.forEach((element) => {
    element.addEventListener('click', function () {
      game = this.getAttribute('data-video');
      resetVideo();
      setVideo(game);
      deepCheckbox.removeAttribute('disabled', 'disabled');
    });
  });

  function setVideo () {
    if (deepFlag) {
      VIDEO.src = 'video/' + game + '/deep.webm';
      VIDEO.poster = 'img/' + game + '/deep-preview.webp';
    } else {
      VIDEO.src = 'video/' + game + '/main.webm';
      VIDEO.poster = 'img/' + game + '/main-preview.webp';
    };

    VIDEO.preload = 'auto';
  };

  // Deep mode
  let deepCheckbox = document.querySelector('.settings__checkbox--deep');
  let deepFlag;

  deepCheckbox.addEventListener('change', function (event) {
    if (event.currentTarget.checked) {
      deepFlag = true;
    } else {
      deepFlag = false;
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
})();

// Reset video
function resetVideo () {
  VIDEO.pause();
  STARTBUTTON.classList.remove('video__start--hide');
  CONTROLS.classList.add('control--hide');
  STATISTICS.classList.add('statistics--hide');
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');
};