const service = require('./pokemon-service');

describe('Pokemon Service', () => {
  describe('.getGenderRatio', () => {
    test('75', () => {
      expect(service.getGenderRatio(75)).toMatchObject({
        notAvailable: false,
        male: 75,
        female: 25
      });
    });

    test('25', () => {
      expect(service.getGenderRatio(25)).toMatchObject({
        notAvailable: false,
        male: 25,
        female: 75
      });
    });

    test('125', () => {
      expect(service.getGenderRatio(125)).toMatchObject({
        notAvailable: true,
        male: 125,
        female: -25
      });
    });
  });
});
