// Autoplay video list
const prevButton = CONTROLS.querySelector('.control__button--prev');
const nextButton = CONTROLS.querySelector('.control__button--next');

let data = null;
let currentCategory = 'bonus';
let currentSubcategory = 'Assassins Creed 2';
let currentVideoIndex = 0;

fetch('video.json')
  .then(response => {
    if (!response.ok) {
      showMessage('Помилка загрузки json &#128531;');
      throw Error('Failed to load video.json');
    }
    return response.json();
  })
  .then(videoData => {
    data = videoData;
    playCurrentVideo();
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

let currentVideo;

function playCurrentVideo() {
  VIDEO.preload = 'auto';

  setPlayIcon();
  stopProgress();
  resetDuration();
  updateActiveButton();
  resetPlaybackSpeed();

  if (!autoplayFlag) {
    resetVideo();
  }

  if (uploadedVideo.length > 0) {
    currentVideo = uploadedVideo[currentVideoIndex];
  } else {
    currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];
  }

  if (backgroundFlag) {
    backgroundVideo.src = currentVideo.src;
  }

  VIDEO.setAttribute('src', currentVideo.src);
  VIDEO.setAttribute('alt', currentVideo.description);

  if (currentVideo.subtitle) {
    subtitleButton.classList.remove('control__button--off');
  } else {
    subtitleButton.classList.add('control__button--off');
  }
}

function changeVideoIndex(delta) {
  if (uploadedVideo.length > 0) {
    currentVideoIndex += delta;

    if (currentVideoIndex >= uploadedVideo.length) {
      currentVideoIndex = 0;
    } else if (currentVideoIndex < 0) {
      currentVideoIndex = uploadedVideo.length - 1;
    }
  } else {
    currentVideoIndex += delta;

    if (currentVideoIndex < 0) {
      const subcategories = Object.keys(data[currentCategory]);
      const currentSubcategoryIndex = subcategories.indexOf(currentSubcategory);

      if (currentSubcategoryIndex > 0) {
        currentSubcategory = subcategories[currentSubcategoryIndex - 1];
        currentVideoIndex = data[currentCategory][currentSubcategory].length - 1;
      } else {
        const categories = Object.keys(data);
        const currentCategoryIndex = categories.indexOf(currentCategory);

        if (currentCategoryIndex > 0) {
          currentCategory = categories[currentCategoryIndex - 1];
          const previousSubcategory = Object.keys(data[currentCategory]).pop();
          currentSubcategory = previousSubcategory;
          currentVideoIndex = data[currentCategory][previousSubcategory].length - 1;
        } else {
          currentCategory = categories[categories.length - 1];
          const previousSubcategory = Object.keys(data[currentCategory]).pop();
          currentSubcategory = previousSubcategory;
          currentVideoIndex = data[currentCategory][previousSubcategory].length - 1;
        }
      }
    } else if (currentVideoIndex >= data[currentCategory][currentSubcategory].length) {
      const subcategories = Object.keys(data[currentCategory]);
      const currentSubcategoryIndex = subcategories.indexOf(currentSubcategory);

      if (currentSubcategoryIndex < subcategories.length - 1) {
        currentSubcategory = subcategories[currentSubcategoryIndex + 1];
        currentVideoIndex = 0;
      } else {
        const categories = Object.keys(data);
        const currentCategoryIndex = categories.indexOf(currentCategory);

        if (currentCategoryIndex < categories.length - 1) {
          currentCategory = categories[currentCategoryIndex + 1];
          currentSubcategory = Object.keys(data[currentCategory])[0];
          currentVideoIndex = 0;
        } else {
          currentCategory = categories[0];
          currentSubcategory = Object.keys(data[currentCategory])[0];
          currentVideoIndex = 0;
        }
      }
    }
  }

  playCurrentVideo();
}

nextButton.addEventListener('click', () => changeVideoIndex(1));
prevButton.addEventListener('click', () => changeVideoIndex(-1));
VIDEO.addEventListener('ended', () => changeVideoIndex(1));
