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
      const ability = abilitiesMap[abilityInfo.ability_id];

      return {
        name: titleize(ability.name),
        prose: ability.prose,
        shortEffect: ability.short_effect,
        longEffect: ability.short_effect,
        hidden: abilityInfo.is_hidden
      };
    });
};

module.exports = { getFromPokemonId };
