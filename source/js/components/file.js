// File
const MAX_FILE_SIZE = 5368709120;
const INPUTFILE = SETTINGS.querySelector('.settings__file');
const INPUTFILE_OUTPUT = SETTINGS.querySelector('.settings__output');
const INPUTFILE_COUNTER = SETTINGS.querySelector('.settings__counter');
const supportedFormats = ['video/mp4', 'video/webm'];

// Check and save uploaded files
let uploadedVideo = [];

function handleFiles(event) {
  const files = Array.from(event.target.files);

  files.forEach(file => {
    const fileUrl = URL.createObjectURL(file);
    uploadedVideo.push({
      file,
      url: fileUrl,
      src: fileUrl,
      name: file.name,
      type: file.type,
      size: file.size
    });
  });

  validateFiles(uploadedVideo);

  clearVideoButtons();
}

INPUTFILE.addEventListener('change', resetVideo);
INPUTFILE.addEventListener('change', handleFiles);

// Validate files
function validateFiles(uploadedVideo) {
  let showSuccessMessage = true;

  uploadedVideo.forEach(video => {
    let fileSize = video.file.size;
    let fileType = video.file.type;

    if (fileSize > MAX_FILE_SIZE) {
      showMessage('Файл завеликий &#128548;');
      showSuccessMessage = false;
    } else if (!isSupportedFileType(fileType)) {
      showMessage('Непідтримуваний тип файлу &#128552;');
      showSuccessMessage = false;
    }
  });

  if (showSuccessMessage) {
    if (uploadedVideo.length > 1) {
      INPUTFILE_COUNTER.innerText = '+' + uploadedVideo.length;
      INPUTFILE_COUNTER.classList.remove('settings__counter--hide');
      seriesLabel.classList.remove('settings__option--hide');
    }

    let lastUploadedVideo = uploadedVideo[uploadedVideo.length - 1];
    INPUTFILE_OUTPUT.innerText = lastUploadedVideo.name;
    VIDEO.setAttribute('crossorigin', 'anonymous');
    generatingSeries();
    setupCurrentVideo();
    showMessage('Кінострічка готова &#128252;');
  }

  INPUTFILE.value = '';
}

function isSupportedFileType(fileType) {
  return supportedFormats.includes(fileType);
}
