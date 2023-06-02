// // Autoplay video list
// const prevButton = CONTROLS.querySelector('.control__button--prev');
// const nextButton = CONTROLS.querySelector('.control__button--next');

// fetch('videos.json')
//   .then(response => response.json())
//   .then (data => {
//     let currentCategory = 'TheWitcher';
//     let currentSubcategory = 'main';
//     let currentVideoIndex = 0;

//     function playCurrentVideo() {
//       const currentVideo = data[currentCategory][currentSubcategory][currentVideoIndex];
//       const videoTitle = currentVideo.title;
//       const videoUrl = currentVideo.url;
//     }

//     function nextVideo() {
//       currentVideoIndex++;
//       if (currentVideoIndex >= data[currentCategory][currentSubcategory].length) {
//         const subcategories = Object.keys(data[currentCategory]);
//         const currentSubcategoryIndex = subcategories.indexOf(currentSubcategory);

//         if (currentSubcategoryIndex < subcategories.length - 1) {
//           currentSubcategory = subcategories[currentSubcategoryIndex + 1];
//           currentVideoIndex = 0;
//         } else {
//           const categories = Object.keys(data);
//           const currentCategoryIndex = categories.indexOf(currentCategory);

//           if (currentCategoryIndex < categories.length - 1) {
//             currentCategory = categories[currentCategoryIndex + 1];
//             currentSubcategory = Object.keys(data[currentCategory])[0];
//             currentVideoIndex = 0;
//           } else {
//             currentCategory = categories[0];
//             currentSubcategory = Object.keys(data[currentCategory])[0];
//             currentVideoIndex = 0;
//           }
//         }
//       }

//       playCurrentVideo();
//     }

//     function prevVideo() {
//       if (currentVideoIndex > 0) {
//         currentVideoIndex--;
//       } else {
//         const subcategories = Object.keys(data[currentCategory]);
//         const currentSubcategoryIndex = subcategories.indexOf(currentSubcategory);

//         if (currentSubcategoryIndex > 0) {
//           currentSubcategory = subcategories[currentSubcategoryIndex - 1];
//           currentVideoIndex = data[currentCategory][currentSubcategory].legth - 1;
//         } else {
//           const categories = Object.keys(data);
//           const currentCategoryIndex = categories.indexOf(currentCategory);

//           if (currentCategoryIndex > 0) {
//             currentCategory = categories[currentCategoryIndex - 1];
//             const previousSubcategory = Object.keys(data[currentCategory]).pop();
//             currentSubcategory = previousSubcategory;
//             currentVideoIndex = data[currentCategory][previousSubcategory].lengt - 1;
//           } else {
//             currentCategory = categories[categories.length - 1];
//             const previousSubcategory = Object.keys(data[currentCategory]).pop();
//             currentSubcategory = previousSubcategory;
//             currentVideoIndex = data[currentCategory][previousSubcategory].length - 1;
//           }
//         }
//       }

//       playCurrentVideo();
//     }

//     playCurrentVideo();

//     prevButton.addEventListener('click', prevVideo);
//     nextButton.addEventListener('click', nextVideo);
//   });
