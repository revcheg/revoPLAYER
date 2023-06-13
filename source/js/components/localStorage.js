// Save/Load theme
function saveScheme(scheme) {
	localStorage.setItem('color-scheme', scheme);
}

function getSavedScheme() {
	return localStorage.getItem('color-scheme');
}

function clearScheme() {
	localStorage.removeItem('color-scheme');
}
