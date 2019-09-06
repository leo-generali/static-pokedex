const MAX_STAT = 255;

const STAT_NAME_MAP = {
  defense: 'Defense',
  hp: 'HP',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  attack: 'Attack',
  speed: 'Speed'
};

const getGenderRatio = (percentMale) => {
  return {
    notAvailable: percentMale > 100,
    male: percentMale,
    female: 100 - percentMale
  };
};

const calculateMaxStatPercentage = (stat) =>
  Math.floor((stat / MAX_STAT) * 100);

module.exports = { getGenderRatio, STAT_NAME_MAP, calculateMaxStatPercentage };
