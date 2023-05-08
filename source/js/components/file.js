// File
let FILE;
let FILETYPE;
let FILEURL;
let FILESIZE;

(function () {
  const INPUTFILE = document.querySelector('.settings__file');
  
  INPUTFILE.addEventListener('click', function () {
    resetVideo();
  });
  
  INPUTFILE.addEventListener('change', function () {
    FILE = INPUTFILE.files[0];
    FILEURL = URL.createObjectURL(FILE);
    FILETYPE = INPUTFILE.files[0].type.replace('video/', '');
    FILESIZE = INPUTFILE.files[0].size;
    VIDEO.src = FILEURL; 
  });
})();