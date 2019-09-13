const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

const dataLocale = {
  names: []
};

const tablesLocale = ['names'];

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

  rawDataLocale.names.forEach((type) => {
    result[type.id] = type.identifier
  });

  return result;
};

Promise.all([dataLocalePromise]).then(() => {
  const types = JSON.stringify(createData(dataLocale), null, 2);
  fs.writeFileSync('data/types.json', types);
});
