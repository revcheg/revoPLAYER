// Episode, generating episode button
let episodeButtons;

function renderEpisode() {
  EPISODE.innerText = '';

  Array.from(uploadedVideo).forEach((file, index) => {
    let li = document.createElement('li');
    li.className = 'episode__item';

    let button = document.createElement('button');
    button.className = 'button episode__button';
    button.type = 'button';
    button.textContent = file.name;
    button.addEventListener('click', () => {
      setEpisode(button);
			currentVideoIndex = index;
      VIDEO.src = file.url;
    });

    if (index === 0) {
      button.classList.add('episode__button--active');
    }

    EPISODE.appendChild(li);
    li.appendChild(button);
  });

  episodeButtons = EPISODE.querySelectorAll('.episode__button');
}

function setEpisode(button) {
  episodeButtons.forEach(btn => {
    btn.classList.remove('episode__button--active');
  });

  button.classList.add('episode__button--active');
}
