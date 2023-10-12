// File
const INPUTFILE = document.querySelector('.settings__file');
const MAX_FILE_SIZE = 5368709120;
const supportedFormats = ['video/mp4', 'video/webm', 'video/mkv', 'video/mov'];

// Check and save uploaded files
let selectedVideos = [];

function handleFiles(event) {
  const files = Array.from(event.target.files);

  files.forEach(file => {
    const fileUrl = URL.createObjectURL(file);
    selectedVideos.push({
      file,
      url: fileUrl,
      src: fileUrl,
      name: file.name,
      type: file.type,
      size: file.size
    });
  });

  validateFiles(selectedVideos);
}

INPUTFILE.addEventListener('change', resetVideo);
INPUTFILE.addEventListener('change', handleFiles);

// Validate files
function validateFiles(videos) {
  let showSuccessMessage = true;

  videos.forEach(video => {
    const fileSize = video.file.size;
    const fileType = video.file.type;

    if (fileSize > MAX_FILE_SIZE) {
      showMessage('Файл завеликий &#128548;');
      showSuccessMessage = false;
    } else if (!isSupportedFileType(fileType)) {
      showMessage('Непідтримуваний тип файлу &#128552;');
      showSuccessMessage = false;
    }
  });

  if (showSuccessMessage) {
    showMessage('Кіноплівка готова &#127909;');
    VIDEO.setAttribute('crossorigin', 'anonymous');
    seriesLabel.classList.remove('settings__label--hide');
    generatingSeries();
    playCurrentVideo();
  }

  INPUTFILE.value = '';
}

function isSupportedFileType(fileType) {
  return supportedFormats.includes(fileType);
}
