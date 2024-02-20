// Video
let progressInterval;
let playbackQuality;
let currentVideoPassed;
let currentVideoLeft;
let isVideoPlaying = false;

function startProgress() {
  progressInterval = setTimeout(updateProgress, 1000);
  isVideoPlaying = true;
}

function updateProgress() {
  // Buffer
  videoBuffer = Math.round(VIDEO.buffered.end(0));
  statisticsBuffer.innerHTML = videoBuffer;

  videoCurrentTime = Math.round(VIDEO.currentTime);
  VIDEO_RANGE.value = videoCurrentTime;

  // Duration
  currentVideoPassed = formatTime(videoCurrentTime);
  currentVideoLeft = formatTime(videoDuration - videoCurrentTime);
  videoPassed.innerHTML = currentVideoPassed;
  videoLeft.innerHTML = currentVideoLeft;

  startProgress();
  getTime();
  getEndTime();
  extraLine();
}

function stopProgress() {
  clearTimeout(progressInterval);
  isVideoPlaying = false;
}

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);

// Video handler
// Waiting
function waitingVideo() {
  WRAPPER.classList.remove('video__wrapper--pause');
  WRAPPER.classList.add('video__wrapper--waiting');
}

function playingVideo() {
  WRAPPER.classList.remove('video__wrapper--waiting');
}

VIDEO.addEventListener('waiting', waitingVideo);
VIDEO.addEventListener('playing', playingVideo);

// Error
function errorVideo() {
  WRAPPER.classList.add('video__wrapper--error');
  showMessage('Помилка відео &#128528;');
  isVideoPlaying = false;
  resetVideo();
}

function removeErrorVideo() {
  WRAPPER.classList.remove('video__wrapper--error');
}

VIDEO.addEventListener('error', errorVideo);
VIDEO.addEventListener('loadeddata', removeErrorVideo);

// Pause
function pauseAnimation() {
  WRAPPER.classList.add('video__wrapper--pause');
}

function removePauseAnimation() {
  WRAPPER.classList.remove('video__wrapper--pause');
}

VIDEO.addEventListener('pause', pauseAnimation);
VIDEO.addEventListener('playing', removePauseAnimation);
VIDEO.addEventListener('ended', removePauseAnimation);

// Beta frame test

// function testFramerate() {
//   const stream = VIDEO.captureStream(); // Отримуємо потік з відео
//   const mediaRecorder = new MediaRecorder(stream);

//   mediaRecorder.ondataavailable = (event) => {
//     if (event.data.size > 0) {
//       const blob = new Blob([event.data], { type: 'video/webm' });
//       const url = URL.createObjectURL(blob);

//       // Створюємо тимчасовий відео-елемент для отримання метаданих
//       const tempVideo = document.createElement('video');
//       tempVideo.src = url;

//       tempVideo.addEventListener('loadedmetadata', () => {
//         const framerate = tempVideo.webkitDecodedFrameRate || tempVideo.mozDecodedFrameRate || tempVideo.msDecodedFrameRate || tempVideo.oDecodedFrameRate || tempVideo.decodFrameRate || 'Неможливо визначити';

//         console.log('Кадрова частота відео:', framerate, 'fps');

//         // Очищаємо ресурси
//         tempVideo.remove();
//         URL.revokeObjectURL(url);
//       });
//     }
//   };

//   // Починаємо запис відео (це призведе до виклику ondataavailable)
//   mediaRecorder.start();
// }

// VIDEO.addEventListener('play', testFramerate);
