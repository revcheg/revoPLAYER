// File
let FILE;
let FILETYPE;
let FILEURL;
let FILESIZE;

// let selectedVideos = [];

const MAX_FILE_SIZE = 5368709120;

const INPUTFILE = document.querySelector('.settings__file');

INPUTFILE.addEventListener('click', function () {
  resetVideo();
});

INPUTFILE.addEventListener('change', function () {
  FILE = INPUTFILE.files[0];
  FILEURL = URL.createObjectURL(FILE);
  FILETYPE = INPUTFILE.files[0].type.replace('video/', '');
  FILESIZE = FILE.size;
  validateFILE(FILE);
});

// function handleFileSelection(event) {
//   const files = event.target.files;
//   selectedVideos = Array.from(files);
//   currentVideoIndex = 0;
//   playSelectedVideo();
// }

// function playSelectedVideo() {
//   const selectedVideo = selectedVideos[currentVideoIndex];
//   const videoUrl = URL.createObjectURL(selectedVideo);
//   VIDEO.src = videoUrl;
// }

// INPUTFILE.addEventListener('change', handleFileSelection);

function validateFILE(FILE) {
  if (FILESIZE < MAX_FILE_SIZE) {
    if (!isSupportedFileType(FILE.type)) {
      showError('Непідтримуваний тип файлу');
      INPUTFILE.value = '';
    } else {
      VIDEO.src = FILEURL;
      VIDEO.setAttribute('crossorigin', 'anonymous');
    }
  } else {
    showError('Файл завеликий');
    INPUTFILE.value = '';
  }
}

function isSupportedFileType(fileType) {
  let supportedFormats = ['video/mp4', 'video/webm', 'video/mov'];
  return supportedFormats.includes(fileType);
}
