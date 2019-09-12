const path = require('path');
const fs = require('fs');

const titleize = require('../../helpers/titleize');

const pokemonAbilityMap = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', '..', '..', 'data', 'pokemonAbilities.json')
  )
);

const abilitiesMap = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', '..', '..', 'data', 'abilities.json')
  )
);

const getFromPokemonId = (pokemonId) => {
  return pokemonAbilityMap
    .filter((abilityInfo) => abilityInfo.pokemon_id === pokemonId)
    .map((abilityInfo) => {
      const { name, flavorText, effect, shortEffect } = abilitiesMap[abilityInfo.ability_id + 1];
      
      return {
        name,
        flavorText,
        shortEffect, 
        effect,
        hidden: false
      };
    });
};

module.exports = { getFromPokemonId };
