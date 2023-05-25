// Save/Load theme
// Save theme
function saveScheme(scheme) {
  localStorage.setItem('localTheme', scheme);
  
  // Old
  localStorage.setItem('localButton', buttonIndex);
}

// Load theme
function loadScheme() {
  if (localStorage) {
    const localTheme = localStorage.getItem('localTheme');
    setScheme(localTheme);

    // Old
    const localButton = localStorage.getItem('localButton');
    setButton(localButton);
  }
}

function getSavedScheme() {
  return localStorage.getItem('localTheme');
}

function clearScheme() {
  localStorage.removeItem('localTheme');
}
