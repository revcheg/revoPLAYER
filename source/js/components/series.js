// Series
// Generating series button
function generatingSeries() {
  SERIES_LIST.innerText = '';

  Array.from(uploadedVideo).forEach((file, index) => {
    const li = document.createElement('li');
    li.className = 'series__item';
    const button = document.createElement('button');
    button.className = 'button series__button';
    button.type = 'button';
    button.textContent = file.name;
    li.appendChild(button);
    SERIES_LIST.appendChild(li);

    button.addEventListener('click', () => {
      setActiveButton(button);
			currentVideoIndex = index;
      VIDEO.src = file.url;
    });
  });
}

function setActiveButton(button) {
  const buttons = SERIES_LIST.querySelectorAll('.series__button');
  buttons.forEach(btn => {
    btn.classList.remove('series__button--active');
  });

  button.classList.add('series__button--active');
}

function updateActiveButton() {
  const buttons = SERIES_LIST.querySelectorAll('.series__button');
  buttons.forEach((button, index) => {
    if (index === currentVideoIndex) {
      button.classList.add('series__button--active');
    } else {
      button.classList.remove('series__button--active');
    }
  });
}
