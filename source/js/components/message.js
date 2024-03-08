// Message
let messageTimeout;
let isMessageVisible = false;

MESSAGE.addEventListener('mouseover', () => {
  if (!isMessageVisible) {
    isMessageVisible = true;
  }

  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }
});

MESSAGE.addEventListener('mouseout', () => {
  if (isMessageVisible) {
    messageTimeout = setTimeout(() => {
      clearMessage();
      isMessageVisible = false;
    }, 3000);
  }
});

function showMessage(message, duration = 3000) {
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }

  MESSAGE.classList.remove('message--hide');
  MESSAGE.innerHTML = message;

  if (!MESSAGE.classList.contains('message--animate')) {
    MESSAGE.classList.add('message--animate');
  }

  messageTimeout = setTimeout(() => {
    clearMessage();
    isMessageVisible = false;
  }, duration);
}

function clearMessage() {
  MESSAGE.classList.remove('message--animate');
  MESSAGE.classList.add('message--hide');
}
