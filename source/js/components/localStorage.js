// Save/Load scheme
function saveScheme(scheme) {
  localStorage.setItem('selected-scheme', scheme);
}

function getSavedScheme() {
  return localStorage.getItem('selected-scheme');
}

// function clearScheme() {
//   localStorage.removeItem('selected-scheme');
// }
