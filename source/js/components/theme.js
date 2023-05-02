// THEME
let currentTheme;
let buttonIndex;

(function () {
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
  function setTheme(currentTheme) {
    BODY.className = '';

    switch (currentTheme) {
      case 'light':
        BODY.classList.add(currentTheme);
        buttonIndex = 0;
        break;
  
      case 'dark':
        BODY.classList.add(currentTheme);
        buttonIndex = 1;
        break;
  
      case 'cyberpunk':
        BODY.classList.add(currentTheme);
        buttonIndex = 2;
        break;

      default:
        BODY.className = '';
    };
  };

  setTheme(currentTheme);
  setButton();

  // Save theme
  function saveTheme(currentTheme) {
    localStorage.setItem('localTheme', currentTheme);
    localStorage.setItem('localButton', buttonIndex);
  };

  // Load theme
  function loadTheme() {
    if (localStorage) {
      const localTheme = localStorage.getItem('localTheme');
      const localButton = localStorage.getItem('localButton');
      setTheme(localTheme);
      setButton(localButton);
    };
  };

  loadTheme();
})();