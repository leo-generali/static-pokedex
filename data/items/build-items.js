const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

const data = {
  items: []
};

const dataLocale = {
  names: []
};

const tables = ['items'];
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

  rawData.items.forEach((item) => {
    const { id, category_id: categoryId, cost } = item;

    // Move name
    const { name } = rawDataLocale.names.find(
      (nameData) => nameData.item_id == id
    );

    result[id] = {
      name,
      cost
    };
  });

  return result;
};

Promise.all([dataPromise, dataLocalePromise]).then(() => {
  const items = JSON.stringify(createData(data, dataLocale));
  fs.writeFileSync('./items.json', items);
});
