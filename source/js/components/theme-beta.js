// // THEME BETA
// let darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)').matches;
// const schemeRadios = document.querySelectorAll('.footer__theme');

// function setupSwitcher() {
//   const savedScheme = getSavedScheme();

//   if (savedScheme !== null) {
//     const currentRadio = document.querySelector(`.footer__theme[value=${savedScheme}]`);
//     currentRadio.checked = true;
//   }

//   [...schemeRadios].forEach((radio) => {
//     radio.addEventListener('change', (event) => {
//         setScheme(event.target.value);
//     });
//   });
// }

// function setupScheme() {
//   const savedScheme = getSavedScheme();
//   const systemScheme = getSystemScheme();

//   if (savedScheme === null) return;

//   if (savedScheme !== systemScheme) {
//     setScheme(savedScheme);
//   }
// }

// function setScheme(scheme) {
//   switchMedia(scheme);

//   if (scheme === 'auto') {
//     clearScheme();
//   } else {
//     saveScheme(scheme);
//   }
// }

// let favicon = document.querySelector('.favicon');

// function switchMedia(scheme) {
//   BODY.className = '';

//   switch (scheme) {
//     case 'light':
//       BODY.classList.add(scheme);
//       buttonIndex = 0;
//       favicon.href = 'img/favicons/favicon.svg'
//       break;

//     // case 'auto':
//     //   BODY.classList.add(scheme);
//     //   buttonIndex = 1;
//     //   favicon.href = 'img/favicons/favicon.svg'
//     //   break;

//     case 'dark':
//       BODY.classList.add(scheme);
//       buttonIndex = 2;
//       favicon.href = 'img/favicons/favicon-dark.svg'
//       break;

//     case 'cyberpunk':
//       BODY.classList.add(scheme);
//       buttonIndex = 3;
//       break;
//   }
// }

// function getSystemScheme() {
//   const darkScheme = darkSchemeMedia;
//   return darkScheme ? 'dark' : 'light';
// }

// setupSwitcher();
// setupScheme();

// Save/Load theme
// function saveScheme(currentScheme) {
//   localStorage.setItem('color-scheme', currentScheme);
//   localStorage.setItem('localButton', buttonIndex);
// }

// function loadScheme() {
//   if (localStorage) {
//     const localTheme = localStorage.getItem('color-scheme');
//     const localButton = localStorage.getItem('localButton');
//     setTheme(localTheme);
//     setButton(localButton);
//   }
// }

// function getSavedScheme() {
//   return localStorage.getItem('color-scheme');
// }

// function clearScheme() {
//   localStorage.removeItem('color-scheme');
// }
