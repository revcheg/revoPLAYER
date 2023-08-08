// Scheme
const favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');
const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const schemeRadios = document.querySelectorAll('.footer__scheme');
const darkScheme = matchMedia('(prefers-color-scheme: dark)').matches;

function setupSwitcher() {
  const savedScheme = getSavedScheme();

  if (savedScheme !== null) {
    const currentRadio = document.querySelector(`.footer__scheme[value=${savedScheme}]`);
    currentRadio.checked = true;
    updateRadioStates(currentRadio);
  }

  [...schemeRadios].forEach((radio) => {
    radio.addEventListener('change', (event) => {
      setScheme(event.target.value);
      updateRadioStates(event.target);
    });
  });
}

function updateRadioStates(activeRadio) {
  [...schemeRadios].forEach((radio) => {
    if (radio === activeRadio) {
      radio.checked = true;
      radio.setAttribute('checked', 'checked');
      radio.disabled = true;
    } else {
      radio.checked = false;
      radio.removeAttribute('checked');
      radio.disabled = false;
    }
  });
}

function setupScheme() {
  const savedScheme = getSavedScheme();
  const systemScheme = getSystemScheme();

  if (savedScheme === null) return;

  if (savedScheme === 'vice') {
    addScheme('vice');
  } else if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
  } else if (savedScheme === 'light') {
    switchMedia('light');
  } else if (savedScheme === 'dark') {
    switchMedia('dark');
  }
}

function setScheme(scheme) {
  switchMedia(scheme);

  if (scheme === 'auto') {
    clearScheme();
  } else {
    saveScheme(scheme);
  }
}

function switchMedia(scheme) {
  let lightMedia;
  let darkMedia;

  if (scheme === 'auto') {
    lightMedia = '(prefers-color-scheme: light)';
    darkMedia = '(prefers-color-scheme: dark)';
  } else if (scheme === 'light') {
    lightMedia = 'all';
    darkMedia = 'not all';
  } else if (scheme === 'dark') {
    lightMedia = 'not all';
    darkMedia = 'all';
  } else {
    lightMedia = 'not all';
    darkMedia = 'not all';
  }

  [...lightStyles].forEach((link) => {
    link.media = lightMedia;
  });

  [...darkStyles].forEach((link) => {
    link.media = darkMedia;
  });

  if (scheme === 'dark') {
    favicon.href = 'img/favicons/favicon-dark.svg';
  } else {
    favicon.href = 'img/favicons/favicon.svg';
  }

  if (newScheme) {
    newScheme.media = (scheme === 'vice') ? 'all' : 'not all';
  }
}

function getSystemScheme() {
  return darkScheme ? 'dark' : 'light';
}

setupSwitcher();
setupScheme();

let newScheme;

function addScheme(scheme) {
  let newButton = document.querySelector(`.footer__scheme[value=${scheme}]`);
  let newLabel = newButton.parentNode;

  updateRadioStates(newButton);
  newLabel.classList.remove('footer__label--hide');

  newScheme = document.createElement('link');
  newScheme.setAttribute('rel', 'stylesheet');
  newScheme.href = `css/${scheme}.css`;
  document.head.appendChild(newScheme);

  switchMedia(scheme);
  newScheme.setAttribute('media', 'all');

  saveScheme(scheme);
}
