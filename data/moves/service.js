const dataService = require('../data-service');

const formatEffect = (shortEffectText, effectChance) => {
  return dataService.stripText(
    shortEffectText.replace('$effect_chance', effectChance)
  );
};

module.exports = {
  formatEffect
};
