const fetch = require('node-fetch');
const flatcache = require('flat-cache');
const path = require('path');

const getCacheKey = () => {
  const date = new Date();
  return `${date.getUTCFullYear()}-${date.getUTCMonth() +
    1}-${date.getUTCDate()}`;
};

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 10; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  return Promise.all(promises).then((results) => {
    const data = results.map((result) => {
      return {
        name: result.name,
        image: result.sprites['front_default'],
        types: result.types.map((type) => type.type.name),
        id: result.id
      };
    });

    return data;
  });
};

module.exports = async function() {
  const cache = flatcache.load('pokemon', path.resolve('./_datacache'));
  const key = getCacheKey();
  const cachedPokemonData = cache.getKey(key);

  if (!cachedPokemonData) {
    const pokemon = await fetchPokemon();
    cache.setKey(key, pokemon);
    cache.save();
    return pokemon;
  }

  return cachedPokemonData;
};
