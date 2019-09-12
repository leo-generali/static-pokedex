const service = require('./data-service');

const MOCK_STATS = [
  {
    base_stat: 80,
    effort: 0,
    stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' }
  },
  {
    base_stat: 100,
    effort: 0,
    stat: { name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/' }
  },
  {
    base_stat: 100,
    effort: 0,
    stat: { name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/' }
  },
  {
    base_stat: 95,
    effort: 0,
    stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' }
  },
  {
    base_stat: 134,
    effort: 3,
    stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' }
  },
  {
    base_stat: 91,
    effort: 0,
    stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' }
  }
];

// HP
// Attack
// Defense
// Speed
// Sp Atk
// Sp Def

describe('Data Service', () => {
  describe('.createOrderedStats', () => {
    test('returns organized stats', () => {
      expect(service.createOrderedStats(MOCK_STATS)).toMatchObject([
        { base_stat: 91, name: 'HP', percent: 35 },
        { base_stat: 134, name: 'Attack', percent: 52 },
        { base_stat: 95, name: 'Defense', percent: 37 },
        { base_stat: 80, name: 'Speed', percent: 31 },
        { base_stat: 100, name: 'Sp. Attack', percent: 39 },
        { base_stat: 100, name: 'Sp. Defense', percent: 39 }
      ]);
    });
  });
});
