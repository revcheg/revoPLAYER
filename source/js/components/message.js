// Message
let messageTimeout;

function showMessage(message, duration = 3000) {
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }

  // if (VIDEO.error) {
  //   MESSAGE.classList.add('message--error');
  // } else {
  //   MESSAGE.classList.remove('message--error');
  // }

  MESSAGE.classList.remove('message--hide');
  MESSAGE.innerHTML = message;

  if (!MESSAGE.classList.contains('message--animate')) {
    MESSAGE.classList.add('message--animate');
  }

  messageTimeout = setTimeout(clearMessage, duration);
}

function clearMessage() {
  MESSAGE.classList.remove('message--animate');
  MESSAGE.classList.add('message--hide');
}
