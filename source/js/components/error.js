// Error
const errorText = ERROR.querySelector('.error__text');
// const errorCode = ERROR.querySelector('.error__code');

function showError() {
  ERROR.classList.remove('error--hide');

  setTimeout(() => {
    ERROR.classList.add('error--hide');
  }, 3000)
}
