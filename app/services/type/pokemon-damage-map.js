module.exports = [
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
