// Video
let progressInterval;
let playbackQuality

// Duration
const videoPassed = CONTROLS.querySelector('.control__passed');
const videoLeft = CONTROLS.querySelector('.control__left');

function formatTime (timeInSeconds) {
  let hours = Math.floor(timeInSeconds / 3600);
  let minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
  let seconds = Math.floor(timeInSeconds - (hours * 3600) - (minutes * 60));
  
  if (hours < 10) {
    hours = '0' + hours;
  };

  if (minutes < 10) {
    minutes = '0' + minutes;
  };

  if (seconds < 10) {
    seconds = '0' + seconds;
  };

  // minutes = minutes < 10 ? '0' + minutes : minutes;
  // seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
};

function startProgress () {
  progressInterval = setTimeout(updateProgress, 1000);
};

function updateProgress () {
  videoBuffer = Math.round(VIDEO.buffered.end(0));
  videoCurrentTime = VIDEO.currentTime;
  VIDEORANGE.value = videoCurrentTime;
  statisticsBuffer.innerHTML = videoBuffer;

  playbackQuality = VIDEO.getVideoPlaybackQuality();
  videoFPS = playbackQuality.totalVideoFrames / VIDEO.currentTime;
  statisticsFPS.innerHTML = videoFPS;

  let currentVideoPassed = formatTime(videoCurrentTime); 
  let currentVideoLeft = formatTime(videoDuration - videoCurrentTime); 
  videoPassed.innerHTML = currentVideoPassed; 
  videoLeft.innerHTML = currentVideoLeft; 

  startProgress();
  stayFocus();
};

function stopProgress () {
  clearTimeout(progressInterval);
};

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);