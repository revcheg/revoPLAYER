// Error
let errorTimeout;

function showError(errorMessage) {
  clearTimeout(errorTimeout);

  ERROR.classList.remove('error--hide');
  ERROR.innerHTML = errorMessage;

  if (!ERROR.classList.contains('error--animate')) {
    ERROR.classList.add('error--animate');
  }

  errorTimeout = setTimeout(() => {
    ERROR.classList.remove('error--animate');
    ERROR.classList.add('error--hide');
  }, 3000);
}
