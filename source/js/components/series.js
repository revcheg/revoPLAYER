// Series
function setActiveButton(button) {
  const buttons = SERIESLIST.querySelectorAll('.series__button');
  buttons.forEach(btn => {
    btn.classList.remove('series__button--active');
  });

  button.classList.add('series__button--active');
}

function updateActiveButton() {
  const buttons = SERIESLIST.querySelectorAll('.series__button');
  buttons.forEach((button, index) => {
    if (index === currentVideoIndex) {
      button.classList.add('series__button--active');
    } else {
      button.classList.remove('series__button--active');
    }
  });
}

function seriesEnd() {
  currentVideoIndex++;
  if (currentVideoIndex >= selectedVideos.length) {
    currentVideoIndex = 0;
  }
  playCurrentVideo(selectedVideos[currentVideoIndex].url);
  updateActiveButton();
}

// VIDEO.addEventListener('ended', seriesEnd);
