document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.app-pokemon-search-input');
  const pokemon = [...document.querySelectorAll('.app-pokemon-link')];

  searchInput.addEventListener('keyup', () => {
    const { value } = searchInput;

    const hiddenPokemon = pokemon.filter(
      (monster) => !monster.dataset.pokemonName.includes(value)
    );

    const showingPokemon = pokemon.filter((monster) =>
      monster.dataset.pokemonName.includes(value)
    );

    hiddenPokemon.forEach((pokemonLinkElement) => {
      pokemonLinkElement.style.display = 'none';
    });

    showingPokemon.forEach((pokemonLinkElement) => {
      pokemonLinkElement.style.display = 'inline-flex';
    });
  });
});
