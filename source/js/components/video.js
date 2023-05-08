// Video
let progressInterval;
let playbackQuality

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

  startProgress();
  stayFocus();
};

function stopProgress () {
  clearTimeout(progressInterval);
};

VIDEO.addEventListener('play', startProgress);
VIDEO.addEventListener('pause', stopProgress);
VIDEO.addEventListener('ended', stopProgress);