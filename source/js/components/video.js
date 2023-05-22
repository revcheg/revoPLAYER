// Video
let progressInterval;
let playbackQuality;

function startProgress () {
  progressInterval = setTimeout(updateProgress, 1000);
};

function updateProgress () {
  // Buffer
  videoBuffer = Math.round(VIDEO.buffered.end(0));
  videoCurrentTime = VIDEO.currentTime;
  VIDEORANGE.value = videoCurrentTime;
  statisticsBuffer.innerHTML = videoBuffer;

  // Duration
  let currentVideoPassed = formatTime(videoCurrentTime); 
  let currentVideoLeft = formatTime(videoDuration - videoCurrentTime); 
  videoPassed.innerHTML = currentVideoPassed; 
  videoLeft.innerHTML = currentVideoLeft; 

  startProgress();
  stayFocus();
  getTime();
  getEndTime();
  extraLine();
};

function stopProgress () {
  clearTimeout(progressInterval);
};

function stayFocus () {
  VIDEO.addEventListener('blur', function () {
    if (VIDEO.paused) {
      VIDEO.blur();
    } else {
      VIDEO.focus();
    };
  });
};

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);

// Video handler
const waitingStatus = document.querySelector('.video__waiting'); 

function waitingVideo() {
  waitingStatus.classList.remove('video__waiting--hide');
  WRAPPER.classList.add('video__wrapper--waiting');
}

function playingVideo() {
  waitingStatus.classList.add('video__waiting--hide');
  WRAPPER.classList.remove('video__wrapper--waiting');
}

VIDEO.addEventListener('waiting', waitingVideo);
VIDEO.addEventListener('playing', playingVideo);
