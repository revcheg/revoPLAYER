// File
let FILE;
let FILETYPE;
let FILEURL;
let FILESIZE;

const MAX_FILE_SIZE = 1073741824;

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

function validateFILE(FILE) {
  if (FILESIZE < MAX_FILE_SIZE) {
    if (!isSupportedFileType(FILE.type)) {
      console.log('Непідтримуваний тип файлу');
      INPUTFILE.value = '';
    } else {
      VIDEO.src = FILEURL; 
      VIDEO.setAttribute('crossorigin', 'anonymous');
    }
  } else {
    console.log('Файл завеликий');
    INPUTFILE.value = '';
  }
}

function isSupportedFileType(fileType) {
  let supportedFormats = ['video/mp4', 'video/webm'];
  return supportedFormats.includes(fileType);
}
