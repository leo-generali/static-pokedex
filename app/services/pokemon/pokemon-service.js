const MAX_STAT = 255;

const getGenderRatio = (percentMale) => {
  return {
    notAvailable: percentMale > 1,
    male: percentMale,
    female: 1 - percentMale
  };
};

const calculateMaxStatPercentage = (stat) =>
  Math.floor((stat / MAX_STAT) * 100);

module.exports = { getGenderRatio, calculateMaxStatPercentage };
