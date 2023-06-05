// Error
function showError(errorMessage) {
  ERROR.classList.remove('error--hide');
  ERROR.innerHTML = errorMessage;

  setTimeout(() => {
    ERROR.classList.add('error--hide');
  }, 2000)
}
