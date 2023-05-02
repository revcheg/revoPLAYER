// File
let FILE;
let FILETYPE;
let FILEURL;

(function () {
  const INPUTFILE = document.querySelector('.settings__file');
  
  INPUTFILE.addEventListener('click', function () {
    resetVideo();
  });
  
  INPUTFILE.addEventListener('change', function () {
    FILE = INPUTFILE.files[0];
    FILEURL = URL.createObjectURL(FILE);
    FILETYPE = INPUTFILE.files[0].type;
    VIDEO.src = FILEURL; 
  });
})();