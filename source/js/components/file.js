// File
const MAX_FILE_SIZE = 5368709120;
const INPUTFILE = document.querySelector('.settings__file');
const INPUTFILE_OUTPUT = document.querySelector('.settings__output');
const supportedFormats = ['video/mp4', 'video/webm', 'video/mkv', 'video/mov'];

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
      seriesLabel.classList.remove('settings__label--hide');
    }
    INPUTFILE_OUTPUT.innerHTML = uploadedVideo[0].name;
    VIDEO.setAttribute('crossorigin', 'anonymous');
    generatingSeries();
    playCurrentVideo();
    showMessage('Кінострічка готова &#127909;');
  }

  INPUTFILE.value = '';
}

function isSupportedFileType(fileType) {
  return supportedFormats.includes(fileType);
}
