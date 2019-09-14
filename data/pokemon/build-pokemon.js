const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

const service = require('./service');
const dataService = require('../data-service');

const data = {
  pokemon: [],
  stats: [],
  moves: [],
  types: [],
  abilities: [],
  species: [],
  evolution: []
};

const dataLocale = {
  names: [],
  flavor_text: []
};

const tables = [
  'pokemon',
  'stats',
  'moves',
  'types',
  'abilities',
  'species',
  'evolution'
];
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
          name: service.statMap[statsData.stat_id],
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
      .filter((flavorTextData) => flavorTextData.species_id == speciesId)
      .map((flavorTextData) => flavorTextData.flavor_text);

    // Moves
    const moves = rawData.moves
      .filter((moveData) => moveData.pokemon_id == speciesId)
      .map((moveData) => {
        const { level } = moveData;

        return { ...service.moveMap[moveData.move_id], level };
      })
      .sort((a, b) => a.level - b.level);

    // Types
    const types = rawData.types
      .filter((typeData) => typeData.pokemon_id == speciesId)
      .map((typeData) => service.typeMap[typeData.type_id]);

    // Abilities
    const abilities = rawData.abilities
      .filter((abilityData) => abilityData.pokemon_id == speciesId)
      .map((abilityData) => service.abilitiesMap[abilityData.ability_id]);

    // Evolution Chain
    const { evolution_chain_id: evolutionChainId } = rawData.species.find(
      (speciesData) => speciesData.id == speciesId
    );

    const evolution = rawData.species
      .filter(
        (speciesData) => speciesData.evolution_chain_id == evolutionChainId
      )
      .map((speciesData) => {
        const { name } = rawDataLocale.names.find(
          (pokemonNameData) =>
            pokemonNameData.pokemon_species_id == speciesData.id
        );

        const evolution =
          rawData.evolution.find(
            (evolutionData) =>
              evolutionData.evolved_species_id == speciesData.id
          ) || {};

        return {
          name,
          currentPokemon: speciesData.id == id,
          id: speciesData.id,
          level: evolution.minimum_level || 0
        };
      });

    result.push({
      name,
      genus,
      types,
      id,
      speciesId,
      height,
      weight,
      baseExperience,
      flavorText: dataService.getLastItem(flavorTextArray),
      stats,
      abilities,
      moves,
      evolution
    });
  });

  return result;
};

Promise.all([dataPromise, dataLocalePromise]).then(() => {
  const pokemon = JSON.stringify(createData(data, dataLocale), null, 2);
  fs.writeFileSync('src/_data/pokemon.json', pokemon);
});
