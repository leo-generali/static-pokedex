const pokemonService = require('../pokemon/pokemon-service');

const STAT_NAME_MAP = {
  defense: 'Defense',
  hp: 'HP',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  attack: 'Attack',
  speed: 'Speed'
};

const STAT_ORDER = [
  'HP',
  'Attack',
  'Defense',
  'Speed',
  'Sp. Attack',
  'Sp. Defense'
];

const createOrderedStats = (stats) => {
  return stats
    .map((stat) => {
      return {
        base_stat: stat.base_stat,
        name: STAT_NAME_MAP[stat.stat.name],
        percent: pokemonService.calculateMaxStatPercentage(stat.base_stat)
      };
    })
    .sort((a, b) => {
      return STAT_ORDER.indexOf(a.name) > STAT_ORDER.indexOf(b.name);
    });
};

const pokedexImagePath = (name) => {
  return `/assets/images/pokemon-gifs/${name}.gif`;
};

module.exports = { createOrderedStats, pokedexImagePath };
