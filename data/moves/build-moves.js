const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

const service = require('./service');
const dataService = require('../data-service');

const data = {
  moves: []
};

const dataLocale = {
  names: [],
  flavor_text: [],
  effect_prose: []
};

const tables = ['moves'];
const tablesLocale = ['names', 'flavor_text', 'effect_prose'];

const dataPromise = new Promise((resolve, reject) => {
  tables.forEach((table, index, array) => {
    fs.createReadStream(path.join(__dirname, `${table}.csv`))
      .pipe(csv())
      .on('data', (row) => {
        data[table].push(row);
      })
      .on('end', () => {
        if (index === array.length - 1) resolve(data);
      });
  });
});

const dataLocalePromise = new Promise((resolve, reject) => {
  tablesLocale.forEach((table, index, array) => {
    fs.createReadStream(path.join(__dirname, 'en', `${table}.csv`))
      .pipe(csv())
      .on('data', (row) => {
        dataLocale[table].push(row);
      })
      .on('end', () => {
        if (index === array.length - 1) resolve(dataLocale);
      });
  });
});

const createData = (rawData, rawDataLocale) => {
  const result = {};

  rawData.moves.forEach((move) => {
    const {
      id,
      power,
      pp,
      accuracy,
      effect_id: effectId,
      effect_chance: effectChance
    } = move;

    // Move name
    const { name } = rawDataLocale.names.find(
      (nameData) => nameData.move_id == id
    );

    // Flavor Text
    const flavorText = rawDataLocale.flavor_text
      .filter((flavorTextData) => flavorTextData.move_id == id)
      .map((flavorTextData) => flavorTextData.flavor_text);

    // Effect
    const effectObject =
      rawDataLocale.effect_prose.find(
        (effectData) => effectData.move_effect_id == effectId
      ) || {};

    const effect = service.formatEffect(
      effectObject.short_effect,
      effectChance
    );

    result[id] = {
      name,
      power,
      pp,
      accuracy,
      flavorText: dataService.getLastItem(flavorText),
      effect
    };
  });

  return result;
};

Promise.all([dataPromise, dataLocalePromise]).then(() => {
  const pokemon = JSON.stringify(createData(data, dataLocale));
  fs.writeFileSync('data/moves.json', pokemon);
});
