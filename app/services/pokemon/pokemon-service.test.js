const service = require('./pokemon-service');

describe('Pokemon Service', () => {
  describe('.getGenderRatio', () => {
    test('0.75', () => {
      expect(service.getGenderRatio(0.75)).toMatchObject({
        notAvailable: false,
        male: 0.75,
        female: 0.25
      });
    });

    test('0.25', () => {
      expect(service.getGenderRatio(0.25)).toMatchObject({
        notAvailable: false,
        male: 0.25,
        female: 0.75
      });
    });

    test('1.25', () => {
      expect(service.getGenderRatio(1.25)).toMatchObject({
        notAvailable: true,
        male: 1.25,
        female: -0.25
      });
    });
  });
});
