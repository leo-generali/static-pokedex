const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

const dataLocale = {
  move_method: []
};

const tablesLocale = ['move_method'];

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

const createData = (rawDataLocale) => {
  const result = {};

  rawDataLocale.move_method.forEach((moveMethod) => {
    result[moveMethod.pokemon_move_method_id] = {
      name: moveMethod.name,
      description: moveMethod.description
    };
  });

  return result;
};

Promise.all([dataLocalePromise]).then(() => {
  const moveMethods = JSON.stringify(createData(dataLocale));
  fs.writeFileSync('data/move-methods.json', moveMethods);
});
