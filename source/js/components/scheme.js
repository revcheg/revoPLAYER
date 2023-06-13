// Scheme BETA
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
  } else {
		const currentRadio = document.querySelector(`.footer__scheme[value=auto]`);
		currentRadio.checked = true;
	}

  [...schemeRadios].forEach((radio) => {
    radio.addEventListener('change', (event) => {
			setScheme(event.target.value);
    });
  });
}

function setupScheme() {
  const savedScheme = getSavedScheme();
  const systemScheme = getSystemScheme();

  if (savedScheme === null) return;

  if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
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
	} else {
		lightMedia = (scheme === 'light') ? 'all' : 'not all';
		darkMedia = (scheme === 'dark') ? 'all' : 'not all';
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
}

function getSystemScheme() {
	return darkScheme ? 'dark' : 'light';
}

setupSwitcher();
setupScheme();
