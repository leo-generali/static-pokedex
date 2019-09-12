const POKEMON_DAMAGE_MAP = require('./pokemon-damage-map');
const DEFAULT_DAMAGE_TYPES = require('./default-damage-types');

const calculateDamageMultiplier = (types) => {
  const damageTypes = { ...DEFAULT_DAMAGE_TYPES };

  types.forEach((type) => {
    POKEMON_DAMAGE_MAP.forEach((damageMultiplierInfo) => {
      if (damageMultiplierInfo.strengths.includes(type))
        damageTypes[damageMultiplierInfo.name] =
          damageTypes[damageMultiplierInfo.name] * 2;

      if (damageMultiplierInfo.weaknesses.includes(type))
        damageTypes[damageMultiplierInfo.name] =
          damageTypes[damageMultiplierInfo.name] / 2;

      if (damageMultiplierInfo.immune.includes(type))
        damageTypes[damageMultiplierInfo.name] = 0;
    });
  });

  const result = {
    weaknesses: [],
    resistances: []
  };

  Object.entries(damageTypes).forEach((damageType) => {
    if (damageType[1] > 1)
      result.weaknesses.push({
        type: damageType[0],
        multiplier: damageType[1]
      });

    if (damageType[1] < 1)
      result.resistances.push({
        type: damageType[0],
        multiplier: damageType[1]
      });
  });

  return result;
};

module.exports = { calculateDamageMultiplier };
