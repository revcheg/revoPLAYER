// Video
let progressInterval;
let playbackQuality;

function startProgress() {
  progressInterval = setTimeout(updateProgress, 1000);
}

function updateProgress() {
  // Buffer
  videoBuffer = Math.round(VIDEO.buffered.end(0));
  videoCurrentTime = Math.round(VIDEO.currentTime);
  VIDEORANGE.value = videoCurrentTime;
  statisticsBuffer.innerHTML = videoBuffer;

  // Duration
  let currentVideoPassed = formatTime(videoCurrentTime); 
  let currentVideoLeft = formatTime(videoDuration - videoCurrentTime); 
  videoPassed.innerHTML = currentVideoPassed; 
  videoLeft.innerHTML = currentVideoLeft; 

  startProgress();
  getTime();
  getEndTime();
  extraLine();
}

function stopProgress() {
  clearTimeout(progressInterval);
}

function stayFocus() {
  if (VIDEO.paused) {
    VIDEO.blur();
  } else {
    VIDEO.focus();
  }
}

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);
VIDEO.addEventListener('blur', stayFocus);

// Duration
const videoPassed = CONTROLS.querySelector('.control__time--passed');
const videoLeft = CONTROLS.querySelector('.control__time--left');

function resetDuration() {
  VIDEORANGE.value = '0';

  videoPassed.innerHTML = formatTime(0); 
  videoLeft.innerHTML = formatTime(0); 
}

function formatTime(timeInSeconds) {
  let hours = Math.floor(timeInSeconds / 3600);
  let minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
  let seconds = Math.floor(timeInSeconds - (hours * 3600) - (minutes * 60));
  
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;

// if (hours < 10) {
//   hours = '0' + hours;
// }

// if (minutes < 10) {
//   minutes = '0' + minutes;
// }

// if (seconds < 10) {
//   seconds = '0' + seconds;
// }
}

// Video handler
// Waiting
function waitingVideo() {
  WRAPPER.classList.add('video__wrapper--waiting');
}

function playingVideo() {
  WRAPPER.classList.remove('video__wrapper--waiting');
}

VIDEO.addEventListener('waiting', waitingVideo);
VIDEO.addEventListener('playing', playingVideo);

// End
function endVideo() {
  resetVideo();
  VIDEO.blur();
}

VIDEO.addEventListener('ended', endVideo);

// Error
function errorVideo() {
  WRAPPER.classList.add('video__wrapper--error');

  errorText.innerHTML = 'Помилка відео';
  showError();
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

// 3D transform
function movingVideo(event) {
  if (scaleCheckbox.checked) {
    let xPos = -(event.pageX / window.innerWidth - 0.5) * -20;
    let yPos = (event.pageY / window.innerHeight - 0.5) * -20;
    let blockRect = VIDEO.getBoundingClientRect();
    let mouseX = event.clientX - blockRect.left;
    let mouseY = event.clientY - blockRect.top;
  
    if (!(mouseX >= 0 && mouseX < blockRect.width && mouseY >= 0 && mouseY < blockRect.height)) {
      WRAPPER.style.transform = 'perspective(1000px) rotateY(' + xPos + 'deg) rotateX(' + yPos + 'deg) scaleZ(2)';
    }
  } else {
    WRAPPER.style.transform = 'none';
  }
}

// function movingMobileVideo(event) {
//   if (scaleCheckbox.checked) {
//     let tiltX = event.beta;
//     let tiltY = event.gamma;
//     let rotateX = (tiltX / 45) * -30;
//     let rotateY = (tiltY / 45) * 30;
  
//     WRAPPER.style.transform = 'perspective(1000px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg) scaleZ(2)';
//   }
// }

BODY.addEventListener('mousemove', movingVideo);
// BODY.addEventListener('deviceorientation', movingMobileVideo);
