const path = require('path');
const fs = require('fs');
const htmlmin = require('html-minifier');

const POKEMON_TYPE_COLOR_MAP = {
  normal: '#a8a77a',
  fire: '#ee8130',
  water: '#6390f0',
  electric: '#f7d02c',
  grass: '#7ac74c',
  ice: '#96d9d6',
  fighting: '#c22e28',
  poison: '#a33ea1',
  ground: '#e2bf65',
  flying: '#a98ff3',
  psychic: '#f95587',
  bug: '#a6b91a',
  rock: '#b6a136',
  ghost: '#735797',
  dragon: '#6f35fc',
  dark: '#705746',
  steel: '#b7b7ce',
  fairy: '#d685ad'
};

module.exports = (config) => {
  config.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath.endsWith('.html')) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  config.addCollection('pokemonSorted', function(collection) {
    return [...collection.getFilteredByTag('pokemon')].sort((a, b) => {
      return a.data.pokemon.id > b.data.pokemon.id;
    });
  });

  config.addFilter('log', function(value) {
    console.log(value);
  });

  config.addFilter('typeTag', (type) => {
    return `<li class='p-1 rounded text-white mb-1' style='background-color: ${POKEMON_TYPE_COLOR_MAP[type]}'>${type}</li>`;
  });

  config.addFilter('js', (pageScripts = []) => {
    const scriptText = pageScripts.map((script) => {
      return fs.readFileSync(
        path.join(__dirname, 'dist', `${script}.js`),
        'utf8'
      );
    });

    return scriptText.join('');
  });

  return {
    dir: {
      input: 'src'
    }
  };
};
