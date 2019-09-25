document.addEventListener('DOMContentLoaded', () => {
  [...document.querySelectorAll('.app-move')].forEach((move) => {
    const button = move.querySelector('.app-move-button-toggle');

    const text = move.querySelector('.app-move-description-text');
    const info = move.querySelector('.app-move-description-info');
    const arrow = move.querySelector('.app-move-button-arrow');

    button.addEventListener('click', () => {
      text.classList.toggle('hidden');
      info.classList.toggle('hidden');
      arrow.classList.toggle('rotate-90');
    });
  });
});
