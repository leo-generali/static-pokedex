const fetch = require('node-fetch');
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

const pokemon = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'rawPokemonData.json'))
);

const pokemonData = () => {
  const data = pokemon.map((result) => {
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
};

module.exports = function() {
  return pokemonData()
};
