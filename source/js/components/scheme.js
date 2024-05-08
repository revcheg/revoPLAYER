// Scheme
const schemeSwitcher = FOOTER.querySelector('.footer__switcher');
const lightStyle = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyle = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
// const favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');

let systemScheme = getSystemScheme();
let savedScheme = getSavedScheme();

function getSystemScheme() {
  let systemScheme = matchMedia('(prefers-color-scheme: dark)').matches;
  return systemScheme ? 'dark' : 'light';
}

function setupScheme() {
  if (savedScheme === null) return;

  if (savedScheme === 'light') {
    switchMedia('light');
  } else if (savedScheme === 'dark') {
    switchMedia('dark');
  } else if (savedScheme === 'vice') {
    createScheme('vice');
  }
}

setupScheme();

function setScheme(scheme) {
  // if (savedScheme === 'dark') {
  //   favicon.href = 'img/favicons/favicon-dark.svg';
  // } else {
  //   favicon.href = 'img/favicons/favicon.svg';
  // }

  saveScheme(scheme);
  switchMedia(scheme);
  updateSchemeButtons(document.querySelector(`.footer__scheme[value=${scheme}]`));
}

if (savedScheme !== null) {
  updateSchemeButtons(document.querySelector(`.footer__scheme[value=${savedScheme}]`));
} else {
  updateSchemeButtons(document.querySelector(`.footer__scheme[value=${systemScheme}]`));
}

function updateSchemeButtons(activeRadio) {
  let schemeButtons = document.querySelectorAll('.footer__scheme');

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

// Switch media link
let lightMedia;
let darkMedia;
let schemeMedia;

function switchMedia(scheme) {
  if (scheme === 'light') {
    lightMedia = 'all';
    darkMedia = 'not all';
    schemeMedia = 'not all';
  } else if (scheme === 'dark') {
    lightMedia = 'not all';
    darkMedia = 'all';
    schemeMedia = 'not all';
  } else if (scheme === 'vice') {
    lightMedia = 'not all';
    darkMedia = 'not all';
    schemeMedia = 'all';
  } else {
    lightMedia = 'not all';
    darkMedia = 'not all';
    schemeMedia = 'all';
  }

  lightStyle.media = lightMedia;
  darkStyle.media = darkMedia;

  if (schemeStyle) {
    schemeStyle.media = schemeMedia;
  }
}

// Create new scheme
let schemeStyle;

function createScheme(scheme) {
  if (document.querySelector(`link[href="css/${scheme}.css"]`)) {
    return;
  }

  schemeStyle = document.createElement('link');
  schemeStyle.setAttribute('rel', 'stylesheet');
  schemeStyle.href = `css/${scheme}.css`;
  // schemeStyle.setAttribute('media', 'all');
  darkStyle.parentNode.insertBefore(schemeStyle, darkStyle.nextSibling);

  switchMedia(scheme);

  let schemeLabel = document.createElement('label');
  schemeLabel.classList.add('footer__label');

  let schemeButton = document.createElement('input');
  schemeButton.classList.add('button', 'footer__scheme');
  schemeButton.name = 'color-scheme';
  schemeButton.ariaLabel = `${scheme}`;
  schemeButton.title = `Встановити ${scheme} тему`;
  schemeButton.type = 'radio';
  schemeButton.value = scheme;

  let schemeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  schemeIcon.setAttribute('class', 'footer__icon');
  schemeIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  schemeIcon.setAttribute('width', '25');
  schemeIcon.setAttribute('height', '25');
  schemeIcon.setAttribute('viewBox', '0 0 48 48');

  let schemeUseElement = document.createElementNS("http://www.w3.org/2000/svg", "use");
  schemeUseElement.setAttribute('href', `img/sprite.svg#${scheme}`);

  schemeSwitcher.appendChild(schemeLabel);
  schemeIcon.appendChild(schemeUseElement);
  schemeLabel.appendChild(schemeIcon);
  schemeLabel.appendChild(schemeButton);

  updateSchemeButtons(schemeButton);

  saveScheme(scheme);
}
