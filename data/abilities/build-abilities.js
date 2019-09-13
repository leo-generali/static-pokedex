const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

const data = {
  abilities: [],
  flavor_text: [],
  names: [],
  prose: []
};

const tables = ['abilities', 'flavor_text', 'names', 'prose'];

// const pathToCsv = path.join(__dirname, 'en', `${table}.csv`);

const getData = new Promise((resolve, reject) => {
  tables.forEach((table, index, array) => {
    fs.createReadStream(path.join(__dirname, 'en', `${table}.csv`))
      .pipe(csv())
      .on('data', (row) => {
        data[table].push(row);
      })
      .on('end', () => {
        if (index === array.length - 1) resolve();
      });
  });
});

const formatEffect = (string) => {
  return string
    .replace(/\[+/g, '')
    .replace(/]+/g, '')
    .replace(/{move:|{type:|{item:|{ability:+/g, '')
    .replace(
      /Overworld:+/g,
      '<span class="italic font-semibold">Overworld: </span>'
    )
    .replace(/\{.*?\}/g, '')
    .replace(/\}/g, '');
};

const createData = (rawData) => {
  const result = {};

  rawData.abilities.forEach((ability) => {
    const { id } = ability;

    const { flavor_text: flavorText } = rawData.flavor_text.find(
      (flavorTextData) => flavorTextData.ability_id == id
    ) || { flavor_text: 'N/A' };

    const { name } = rawData.names.find(
      (nameData) => nameData.ability_id == id
    );

    const { short_effect: shortEffectRaw, effect: effectRaw } =
      rawData.prose.find((proseData) => proseData.ability_id == id) || {};

    const effect = effectRaw ? formatEffect(effectRaw) : '';
    const shortEffect = shortEffectRaw ? formatEffect(shortEffectRaw) : '';
    const effectArray = effect ? effect.split('\n\n') : [];

    result[id] = {
      name,
      flavorText,
      shortEffect,
      effect: effectArray
    }
  });

  return result;
};

getData.then(() => {
  const abilities = JSON.stringify(createData(data), null, 2);
  fs.writeFileSync('data/abilities.json', abilities);
});
