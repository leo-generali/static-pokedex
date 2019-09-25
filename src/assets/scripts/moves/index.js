document.addEventListener('DOMContentLoaded', () => {
  [...document.querySelectorAll('.app-move')].forEach((move) => {
    const button = move.querySelector('.app-move-button-toggle');
    const desc = move.querySelector('.app-move-description');
    const arrow = move.querySelector('.app-move-button-arrow');

    button.addEventListener('click', () => {
      desc.classList.toggle('hidden');
      arrow.classList.toggle('rotate-90');
    });
  });
});
