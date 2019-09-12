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

const formatEffect = (string) => {
  return string
    .replace(/\[+/g, '<strong>')
    .replace(/]+/g, '</strong>')
    .replace(/{move:|{type:+/g, '')
    .replace(
      /Overworld:+/g,
      '<span class="italic font-semibold">Overworld: </span>'
    )
    .replace(/\{.*?\}/g, '')
    .replace(/\}/g, '');
};

const getFromPokemonId = (pokemonId) => {
  return pokemonAbilityMap
    .filter((abilityInfo) => abilityInfo.pokemon_id === pokemonId)
    .map((abilityInfo) => {
      const ability = abilitiesMap[abilityInfo.ability_id];

      return {
        name: titleize(ability.name),
        prose: ability.prose,
        shortEffect: formatEffect(ability.short_effect),
        longEffect: ability.long_effect.map((effect) => formatEffect(effect)),
        hidden: abilityInfo.is_hidden
      };
    });
};

module.exports = { getFromPokemonId };
