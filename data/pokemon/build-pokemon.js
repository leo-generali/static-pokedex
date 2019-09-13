const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

const statMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'stats.json'))
);

const data = {
  pokemon: [],
  stats: []
};

const dataLocale = {
  names: [],
  flavor_text: []
};

const tables = ['pokemon', 'stats'];
const tablesLocale = ['names', 'flavor_text'];

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
  const result = [];

  // Get base info
  rawData.pokemon.forEach((pokemon) => {
    const {
      id,
      species_id: speciesId,
      height,
      weight,
      base_experience: baseExperience
    } = pokemon;

    // Get stats info
    const stats = rawData.stats
      .filter((statsData) => {
        return statsData.pokemon_id == speciesId;
      })
      .map((statsData) => {
        return {
          name: statMap[statsData.stat_id],
          baseStat: statsData.base_stat,
          percent: Math.round((statsData.base_stat / 255) * 100)
        };
      });

    // Get name and genus
    const { name, genus } =
      rawDataLocale.names.find(
        (pokemonNameData) => pokemonNameData.pokemon_species_id == speciesId
      ) || {};

    // Get flavor text
    const flavorTextArray = rawDataLocale.flavor_text
      .filter((flavorTextData) => {
        return flavorTextData.species_id == speciesId;
      })
      .map((flavorTextData) => {
        return {
          flavorText: flavorTextData.flavor_text,
          versionId: flavorTextData.version_id
        };
      });

    result.push({
      name,
      genus,
      id,
      speciesId,
      height,
      weight,
      baseExperience,
      flavorTextArray,
      stats
    });
  });

  return result;
};

Promise.all([dataPromise, dataLocalePromise]).then(() => {
  const pokemon = JSON.stringify(createData(data, dataLocale), null, 2);
  fs.writeFileSync('data/_pokemon.json', pokemon);
});
