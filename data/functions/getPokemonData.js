const fetch = require('node-fetch');
const fs = require('fs');

const fetchPokemon = () => {
  const promises = [];

  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  return Promise.all(promises).then((results) => {
    const data = results.map((result) => result);

    return data;
  });
};

const createData = async () => {
  const pokemonData = await fetchPokemon();
  const data = JSON.stringify(pokemonData);
  fs.writeFileSync('data/rawPokemonData.json', data);
};

createData();
