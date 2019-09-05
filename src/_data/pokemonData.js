const fetch = require('node-fetch');
const flatcache = require('flat-cache');
const path = require('path');

const STAT_NAME_MAP = {
  defense: 'Defense',
  hp: 'HP',
  'special-attack': 'Special Attack',
  'special-defense': 'Special Defense',
  attack: 'Attack',
  speed: 'Speed'
};

const getCacheKey = () => {
  const date = new Date();
  return `${date.getUTCFullYear()}-${date.getUTCMonth() +
    1}-${date.getUTCDate()}`;
};

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  return Promise.all(promises).then((results) => {
    const data = results.map((result) => {
      const orderedStats = result.stats
        .map((stat) => {
          return {
            base_stat: stat.base_stat,
            name: STAT_NAME_MAP[stat.stat.name],
            percent: Math.floor((stat.base_stat / 255) * 100)
          };
        })
        .sort((a, b) => a.name > b.name);

      return {
        name: result.name,
        image: result.sprites['front_default'],
        types: result.types.map((type) => type.type.name),
        stats: orderedStats,
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
