// // Scheme BETA
// const schemeRadios = document.querySelectorAll('.footer__theme');
// let darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)').matches;

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

// let favicon = document.querySelector('link[href="img/favicons/favicon.svg"]');

// function switchMedia(scheme) {
//   BODY.className = '';

//   switch (scheme) {
//     case 'light':
//       BODY.classList.add(scheme);
//       favicon.href = 'img/favicons/favicon.svg'
//       break;

//     case 'auto':
//       BODY.classList.add(scheme);
//       favicon.href = 'img/favicons/favicon.svg'
//       break;

//     case 'dark':
//       BODY.classList.add(scheme);
//       favicon.href = 'img/favicons/favicon-dark.svg'
//       break;
//   }
// }

// function getSystemScheme() {
//   return darkSchemeMedia ? 'dark' : 'light';
// }

// setupSwitcher();
// setupScheme();
