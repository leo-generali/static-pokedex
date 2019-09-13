const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

const data = {
  stats: []
};

const dataLocale = {
  names: []
};

const tables = ['stats'];
const tablesLocale = ['names'];

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

  rawData.stats.forEach((stat) => {
    const { id } = stat;
    const { name } = rawDataLocale.names.find(
      (nameData) => nameData.stat_id == id
    );
    result[id] = name;
  });

  return result;
};

Promise.all([dataPromise, dataLocalePromise]).then(() => {
  const pokemon = JSON.stringify(createData(data, dataLocale), null, 2);
  fs.writeFileSync('data/stats.json', pokemon);
});
