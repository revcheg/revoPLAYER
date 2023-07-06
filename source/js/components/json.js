// Autoplay video list
const prevButton = CONTROLS.querySelector('.control__button--prev');
const nextButton = CONTROLS.querySelector('.control__button--next');

let currentCategory = 'TheWitcher';
let currentSubcategory = 'deep';
let currentVideoIndex = 0;
let data = null;

fetch('videos.json')
  .then(response => {
    if (!response.ok) {
      showError('Помилка загрузки json &#128531;');
      throw new Error('Failed to load videos.json');
    }
    return response.json();
  })
  .then(videoData => {
    data = videoData;
    currentCategory = 'TheWitcher';
    currentSubcategory = 'deep';
    currentVideoIndex = 0;

    playCurrentVideo();
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

let currentVideo;

function playCurrentVideo() {
  playButtonIcon.classList.add('control__icon--hide');
  pauseButtonIcon.classList.remove('control__icon--hide');

  stopProgress();
  resetDuration();
  updateActiveButton();


  if (selectedVideos.length > 0) {
    currentVideo = selectedVideos[currentVideoIndex];
  } else {
    currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];
  }

  VIDEO.setAttribute('src', currentVideo.url);
  VIDEO.setAttribute('alt', currentVideo.description);

  // const uaSubtitles = currentVideo.subtitles.ua;

  // if (uaSubtitles) {
  //   subtitle.src = uaSubtitles.src;
  //   subtitle.srclang = uaSubtitles.srclang;
  //   subtitle.label = uaSubtitles.label;
  // }

  VIDEO.addEventListener('error', function() {
    showError('Не вдалось завантажити відео &#128531;');
    resetVideo();
  });
}

function nextVideo() {
  if (selectedVideos.length > 0) {
    currentVideoIndex++;

    if (currentVideoIndex >= selectedVideos.length) {
      currentVideoIndex = 0;
    }
  } else {
    currentVideoIndex++;

    if (currentVideoIndex >= data[currentCategory][currentSubcategory].length) {
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

function previousVideo() {
  if (selectedVideos.length > 0) {
    currentVideoIndex--;

    if (currentVideoIndex < 0) {
      currentVideoIndex = selectedVideos.length - 1;
    }
  } else {
    if (currentVideoIndex > 0) {
      currentVideoIndex--;
    } else {
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
    }
  }
  playCurrentVideo();
}

nextButton.addEventListener('click', nextVideo);
prevButton.addEventListener('click', previousVideo);

VIDEO.addEventListener('ended', nextVideo);
