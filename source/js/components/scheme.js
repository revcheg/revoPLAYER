// Scheme
let scheme = 'light';
let buttonIndex;

const themeButtons = document.querySelectorAll('.footer__theme');

// Check client scheme
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  scheme = 'dark';
} else {
  scheme = 'light';
}

// Set button
themeButtons.forEach(function (button, index) {
  button.addEventListener('click', function () {
    buttonIndex = Array.from(themeButtons).indexOf(button);
    scheme = this.getAttribute('data-theme');

    setButton(buttonIndex);
    setScheme(scheme);
    saveScheme(scheme);
  });
});

function setButton() {
  themeButtons.forEach((button) => {
    button.removeAttribute('disabled');
    button.classList.remove('footer__theme--active');
  });
  
  themeButtons[buttonIndex].setAttribute('disabled', 'disabled'); 
  themeButtons[buttonIndex].classList.add('footer__theme--active');
}

// Set scheme
let favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');

function setScheme(scheme) {
  BODY.className = '';

  switch (scheme) {
    case 'light':
      BODY.classList.add(scheme);
      buttonIndex = 0;
      favicon.href = 'img/favicons/favicon.svg'
      break;

    case 'dark':
      BODY.classList.add(scheme);
      buttonIndex = 1;
      favicon.href = 'img/favicons/favicon-dark.svg'
      break;

    case 'cyberpunk':
      BODY.classList.add(scheme);
      buttonIndex = 2;
      break;
  }
}

setScheme(scheme);
setButton(buttonIndex);

loadScheme();
