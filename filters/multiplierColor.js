const MULTIPLIER_COLOR_MAP = {
  '0.25': 'rgb(20, 75, 204)',
  '0.5': 'rgb(69, 120, 237)',
  '2': 'rgb(237, 109, 18)',
  '4': 'rgb(171, 79, 13)'
};

module.exports = (multiplier) => MULTIPLIER_COLOR_MAP[multiplier];
