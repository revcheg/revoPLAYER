// Save/Load scheme
function saveScheme(scheme) {
  localStorage.setItem('color-scheme', scheme);
}

function clearScheme() {
  localStorage.removeItem('color-scheme');
}

function getSavedScheme() {
  return localStorage.getItem('color-scheme');
}
