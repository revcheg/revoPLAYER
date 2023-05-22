// THEME
let currentTheme = 'light';
let buttonIndex;

const themeButtons = document.querySelectorAll('.footer__theme');

// Check client theme
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  currentTheme = 'dark';
} else {
  currentTheme = 'light';
};

// Set button
themeButtons.forEach(function (button, index) {
  button.addEventListener('click', function () {
    buttonIndex = Array.from(themeButtons).indexOf(button);
    currentTheme = this.getAttribute('data-theme');

    setButton(buttonIndex);
    setTheme(currentTheme);
    saveTheme(currentTheme);
  });
});

function setButton() {
  themeButtons.forEach((button) => {
    button.removeAttribute('disabled');
    button.classList.remove('footer__theme--active');
  });
  
  themeButtons[buttonIndex].setAttribute('disabled', 'disabled'); 
  themeButtons[buttonIndex].classList.add('footer__theme--active');
};

// Set theme
let favicon = document.querySelector('.favicon');

function setTheme(currentTheme) {
  BODY.className = '';

  switch (currentTheme) {
    case 'light':
      BODY.classList.add(currentTheme);
      buttonIndex = 0;
      favicon.href = 'img/favicons/favicon.svg'
      break;

    case 'dark':
      BODY.classList.add(currentTheme);
      buttonIndex = 1;
      favicon.href = 'img/favicons/favicon-dark.svg'
      break;

    case 'cyberpunk':
      BODY.classList.add(currentTheme);
      buttonIndex = 2;
      break;
  };
};

setTheme(currentTheme);
setButton(buttonIndex);

loadTheme();
