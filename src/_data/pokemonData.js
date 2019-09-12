const fetch = require('node-fetch');
const flatcache = require('flat-cache');
const path = require('path');
const fs = require('fs');

// Services
const typeService = require('../../app/services/type/type-service');
const pokemonService = require('../../app/services/pokemon/pokemon-service');
const dataService = require('../../app/services/data/data-service');
const abilityService = require('../../app/services/ability/ability-service');

const pokemonDescriptions = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'descriptions.json'))
);

const pokemonSpeciesInfo = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'speciesInfo.json'))
);

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
      const orderedStats = dataService.createOrderedStats(result.stats);
      const speciesInfo = pokemonSpeciesInfo[result.id - 1];
      const types = result.types.map((type) => type.type.name);

      return {
        name: result.name,
        types: types,
        stats: orderedStats,
        height: result.height / 10,
        weight: result.weight / 10,
        id: result.id,
        description: pokemonDescriptions[result.id - 1].description,
        species: speciesInfo.species,
        hatchSteps: speciesInfo.hatchSteps,
        genderRatio: pokemonService.getGenderRatio(speciesInfo.genderRatio),
        typeDefense: typeService.calculateDamageMultiplier(types),
        eggGroups: speciesInfo.eggGroups.split(','),
        abilities: abilityService.getFromPokemonId(result.id),
        image: {
          indexPage: result.sprites['front_default'],
          pokedexPage: dataService.pokedexImagePath(result.name)
        }
      };
    });

    return data;
  });
};

module.exports = async function() {
  const cache = flatcache.load('pokemon', path.resolve('./_datacache'));
  const key = getCacheKey();
  const cachedPokemonData = cache.getKey(key);

  // if (!cachedPokemonData) {
  const pokemon = await fetchPokemon();
  cache.setKey(key, pokemon);
  cache.save();
  return pokemon;
  // }

  return cachedPokemonData;
};
