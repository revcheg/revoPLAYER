// File
const INPUTFILE = document.querySelector('.settings__file');

let selectedVideos = [];

function handleFiles(event) {
  let files = event.target.files;

  Array.from(files).forEach((file) => {
    let fileUrl = URL.createObjectURL(file);

    selectedVideos.push({
      file: file,
      url: fileUrl,
      src: fileUrl,
      name: file.name,
      type: file.type,
      size: file.size
    });
  });

  validateFiles(selectedVideos);
}

function generatingSeries() {
  SERIESLIST.innerHTML = '';

  Array.from(selectedVideos).forEach((file, index) => {
    const li = document.createElement('li');
    li.className = 'series__item';
    const button = document.createElement('button');
    button.className = 'button series__button';
    button.type = 'button';
    button.textContent = file.name;
    li.appendChild(button);
    SERIESLIST.appendChild(li);

    button.addEventListener('click', () => {
      setActiveButton(button);
			currentVideoIndex = index;
      VIDEO.src = file.url;
      // playCurrentVideo();
    });
  });
}

INPUTFILE.addEventListener('change', resetVideo);
INPUTFILE.addEventListener('change', handleFiles);

// Validate uploaded files
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
				generatingSeries();
        playCurrentVideo();
      }
    }
  });
}

function isSupportedFileType(fileType) {
  let supportedFormats = ['video/mp4', 'video/webm', 'video/mkv', 'video/mov'];
  return supportedFormats.includes(fileType);
}
