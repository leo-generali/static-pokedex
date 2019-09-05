const htmlmin = require('html-minifier');

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

  return {
    dir: {
      input: 'src'
    }
  };
};
