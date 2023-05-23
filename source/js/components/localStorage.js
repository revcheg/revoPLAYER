// Save/Load theme
// Save theme
function saveTheme(currentTheme) {
  localStorage.setItem('localTheme', currentTheme);
  localStorage.setItem('localButton', buttonIndex);
}

// Load theme
function loadTheme() {
  if (localStorage) {
    const localTheme = localStorage.getItem('localTheme');
    const localButton = localStorage.getItem('localButton');
    setTheme(localTheme);
    setButton(localButton);
  }
}

// function getSavedScheme() {
//   return localStorage.getItem('color-scheme');
// }

// function clearScheme() {
//   localStorage.removeItem('color-scheme');
// }
