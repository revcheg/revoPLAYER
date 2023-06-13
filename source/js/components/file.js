// File
const INPUTFILE = document.querySelector('.settings__file');

let selectedVideos = [];

function handleFileSelection(event) {
  let files = event.target.files;

  Array.from(files).forEach(file => {
    let fileUrl = URL.createObjectURL(file);

    selectedVideos.push({
      file: file,
      url: fileUrl,
      name: file.name,
      type: file.type,
      size: file.size
    });
  });

  validateFiles(selectedVideos);
};

INPUTFILE.addEventListener('click', resetVideo);
INPUTFILE.addEventListener('change', handleFileSelection);

// Validate
let fileSize;
let fileType;
const MAX_FILE_SIZE = 5368709120;

function validateFiles(videos) {
  videos.forEach(video => {
    fileSize = video.file.size;
    fileType = video.file.type;

    if (fileSize > MAX_FILE_SIZE) {
      showError('Файл завеликий');
      INPUTFILE.value = '';
    } else {
      if (!isSupportedFileType(fileType)) {
        showError('Непідтримуваний тип файлу');
        INPUTFILE.value = '';
      } else {
        VIDEO.setAttribute('crossorigin', 'anonymous');
        playCurrentVideo();
      }
    }
  });
};

function isSupportedFileType(fileType) {
  let supportedFormats = ['video/mp4', 'video/webm', 'video/mov'];
  return supportedFormats.includes(fileType);
};
