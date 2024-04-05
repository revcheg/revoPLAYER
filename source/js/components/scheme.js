// Scheme
const schemeSwitcher = document.querySelector('.footer__switcher');
const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const schemeButtons = document.querySelectorAll('.footer__scheme');
const favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');

let systemScheme;
let savedScheme = getSavedScheme();

function getSystemScheme() {
  let systemScheme = matchMedia('(prefers-color-scheme: dark)').matches;
  return systemScheme ? 'dark' : 'light';
}

if (savedScheme !== null) {
  updateSchemeButton(document.querySelector(`.footer__scheme[value=${savedScheme}]`));
}

function updateSchemeButton(activeRadio) {
  [...schemeButtons].forEach((radio) => {
    if (radio === activeRadio) {
      radio.checked = true;
      radio.setAttribute('checked', 'checked');
    } else {
      radio.checked = false;
      radio.removeAttribute('checked');
    }
  });
}

schemeSwitcher.addEventListener('change', (event) => {
  savedScheme = event.target.value;
  setScheme(savedScheme);
});

function checkScheme() {
  if (savedScheme === null) return;

  if (savedScheme === 'light') {
    switchMedia('light');
  } else if (savedScheme === 'dark') {
    switchMedia('dark');
  } else if (savedScheme === 'auto') {
    toggleSchemeButtons();
  } else if (savedScheme === 'vice') {
    addScheme('vice');
  }
}

checkScheme();

function setScheme(scheme) {
  if (scheme === 'auto') {
    autoschemeCheckbox.checked = true;
  } else {
    autoschemeCheckbox.checked = false;
  }

  if (scheme === 'dark') {
    favicon.href = 'img/favicons/favicon-dark.svg';
  } else {
    favicon.href = 'img/favicons/favicon.svg';
  }

  saveScheme(scheme);
  switchMedia(scheme);
  toggleSchemeButtons();
  updateSchemeButton(document.querySelector(`.footer__scheme[value=${scheme}]`));
}

// Switch media
let lightMedia;
let darkMedia;
let customMedia;

function switchMedia(scheme) {
  if (scheme === 'auto') {
    lightMedia = '(prefers-color-scheme: light)';
    darkMedia = '(prefers-color-scheme: dark)';
    customMedia = 'not all';
  } else if (scheme === 'light') {
    lightMedia = 'all';
    darkMedia = 'not all';
    customMedia = 'not all';
  } else if (scheme === 'dark') {
    lightMedia = 'not all';
    darkMedia = 'all';
    customMedia = 'not all';
  } else if (scheme === 'vice') {
    lightMedia = 'not all';
    darkMedia = 'not all';
    customMedia = 'all';
  } else {
    lightMedia = 'not all';
    darkMedia = 'not all';
    customMedia = 'all';
  }

  [...lightStyles].forEach((link) => {
    link.media = lightMedia;
  });

  [...darkStyles].forEach((link) => {
    link.media = darkMedia;
  });

  if (schemeStyle) {
    schemeStyle.media = customMedia;
  }
}

// Add new scheme
let schemeStyle;

function addScheme(scheme) {
  schemeStyle = document.createElement('link');
  schemeStyle.setAttribute('rel', 'stylesheet');
  schemeStyle.href = `css/${scheme}.css`;
  schemeStyle.setAttribute('media', 'all');
  document.head.appendChild(schemeStyle);

  switchMedia(scheme);

  let schemeButton = document.createElement('input');
  schemeButton.classList.add('button', 'footer__scheme');
  schemeButton.name = 'color-scheme';
  schemeButton.ariaLabel = 'Vice';
  schemeButton.title = `Встановити ${scheme} тему`;
  schemeButton.type = 'radio';
  schemeButton.value = scheme;
  schemeButton.checked = true;

  let schemeLabel = document.createElement('label');
  schemeLabel.classList.add('footer__label');

  let schemeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  schemeIcon.setAttribute('class', 'footer__icon');
  schemeIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  schemeIcon.setAttribute('width', '25');
  schemeIcon.setAttribute('height', '25');
  schemeIcon.setAttribute('viewBox', '0 0 48 48');

  let useElement = document.createElementNS("http://www.w3.org/2000/svg", "use");
  useElement.setAttribute('href', `img/sprite.svg#${scheme}`);

  schemeSwitcher.appendChild(schemeLabel);
  schemeIcon.appendChild(useElement);
  schemeLabel.appendChild(schemeIcon);
  schemeLabel.appendChild(schemeButton);

  updateSchemeButton(schemeButton);
  saveScheme(scheme);
}
