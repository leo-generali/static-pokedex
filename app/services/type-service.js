const POKEMON_DAMAGE_MAP = [
  {
    name: 'normal',
    immune: ['ghost'],
    weaknesses: ['rock', 'steel'],
    strengths: []
  },
  {
    name: 'fire',
    immune: [],
    weaknesses: ['fire', 'water', 'rock', 'dragon'],
    strengths: ['grass', 'ice', 'bug', 'steel']
  },
  {
    name: 'water',
    immune: [],
    weaknesses: ['water', 'grass', 'dragon'],
    strengths: ['fire', 'ground', 'rock']
  },
  {
    name: 'electric',
    immune: ['ground'],
    weaknesses: ['electric', 'grass', 'dragon'],
    strengths: ['water', 'flying']
  },
  {
    name: 'grass',
    immune: [],
    weaknesses: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
    strengths: ['water', 'ground', 'rock']
  },
  {
    name: 'ice',
    immune: [],
    weaknesses: ['fire', 'water', 'ice', 'steel'],
    strengths: ['grass', 'ground', 'flying', 'dragon']
  },
  {
    name: 'fighting',
    immune: ['ghost'],
    weaknesses: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
    strengths: ['normal', 'ice', 'rock', 'dark', 'steel']
  },
  {
    name: 'poison',
    immune: ['steel'],
    weaknesses: ['poison', 'ground', 'rock', 'ghost'],
    strengths: ['grass', 'fairy']
  },
  {
    name: 'ground',
    immune: ['flying'],
    weaknesses: ['grass', 'bug'],
    strengths: ['fire', 'electric', 'poison', 'rock', 'steel']
  },
  {
    name: 'flying',
    immune: [],
    weaknesses: ['electric', 'rock', 'steel'],
    strengths: ['grass', 'fighting', 'bug']
  },
  {
    name: 'psychic',
    immune: ['dark'],
    weaknesses: ['psychic', 'steel'],
    strengths: ['fighting', 'poison']
  },
  {
    name: 'bug',
    immune: [],
    weaknesses: [
      'fire',
      'fighting',
      'poison',
      'flying',
      'ghost',
      'steel',
      'fairy'
    ],
    strengths: ['grass', 'psychic', 'dark']
  },
  {
    name: 'rock',
    immune: [],
    weaknesses: ['fighting', 'ground', 'steel'],
    strengths: ['fire', 'ice', 'flying', 'bug']
  },
  {
    name: 'ghost',
    immune: ['normal'],
    weaknesses: ['dark'],
    strengths: ['psychic', 'ghost']
  },
  {
    name: 'dragon',
    immune: ['fairy'],
    weaknesses: ['steel'],
    strengths: ['dragon']
  },
  {
    name: 'dark',
    immune: [],
    weaknesses: ['fighting', 'dark', 'fairy'],
    strengths: ['psychic', 'ghost']
  },
  {
    name: 'steel',
    immune: [],
    weaknesses: ['fire', 'water', 'electric', 'steel'],
    strengths: ['ice', 'rock', 'fairy']
  },
  {
    name: 'fairy',
    immune: [],
    weaknesses: ['fire', 'poison', 'steel'],
    strengths: ['fighting', 'dragon', 'dark']
  }
];

const DEFAULT_DAMAGE_TYPES = {
  normal: 1,
  fire: 1,
  water: 1,
  electric: 1,
  grass: 1,
  ice: 1,
  fighting: 1,
  poison: 1,
  ground: 1,
  flying: 1,
  psychic: 1,
  bug: 1,
  rock: 1,
  ghost: 1,
  dragon: 1,
  dark: 1,
  steel: 1,
  fairy: 1
};

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
