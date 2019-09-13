const path = require('path');
const fs = require('fs');

const statMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'stats.json'))
);

const moveMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'moves.json'))
);

const typeMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'types.json'))
);

const abilitiesMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'abilities.json'))
);

module.exports = {
  statMap,
  moveMap,
  typeMap,
  abilitiesMap
};
