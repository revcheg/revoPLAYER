// File
const INPUTFILE = document.querySelector('.settings__file');

let selectedVideos = [];

function handleFileSelection(event) {
  let files = event.target.files;

  SERIESLIST.innerHTML = '';

  Array.from(files).forEach((file, index) => {
    let fileUrl = URL.createObjectURL(file);
    let fileDescription = file.name;

    selectedVideos.push({
      file: file,
      url: fileUrl,
      name: file.name,
      type: file.type,
      size: file.size
    });

    const li = document.createElement('li');
    li.className = 'series__item';
    const button = document.createElement('button');
    button.className = 'button series__button';
    button.type = 'button';
    button.textContent = fileDescription;
    li.appendChild(button);
    SERIESLIST.appendChild(li);

    button.addEventListener('click', () => {
      currentVideoIndex = index;
      playCurrentVideo();
      setActiveButton(button);
      VIDEO.src = fileUrl;
    });

    if (index === 0) {
      button.classList.add('series__button--active');
    }
  });

  validateFiles(selectedVideos);
}

INPUTFILE.addEventListener('change', resetVideo);
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
      showError('Файл завеликий &#128548;');
      INPUTFILE.value = '';
    } else {
      if (!isSupportedFileType(fileType)) {
        showError('Непідтримуваний тип файлу &#128552;');
        INPUTFILE.value = '';
      } else {
        showError('Відео обрано, готові грати &#128526;');
        VIDEO.setAttribute('crossorigin', 'anonymous');
        playCurrentVideo();
      }
    }
  });
}

function isSupportedFileType(fileType) {
  let supportedFormats = ['video/mp4', 'video/webm', 'video/mkv', 'video/mov'];
  return supportedFormats.includes(fileType);
}
