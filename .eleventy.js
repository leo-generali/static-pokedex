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
    return [...collection.getFilteredByTag('pokemon')].sort(
      (a, b) => a.data.pokemon.id - b.data.pokemon.id
    );
  });

  // Filters
  config.addFilter('padNumber', require('./filters/pad'));
  config.addFilter('log', require('./filters/log'));
  config.addFilter('typeColor', require('./filters/typeColor'));
  config.addFilter('js', require('./filters/js'));
  config.addFilter('typeGradient', require('./filters/typeGradient'));

  config.addPassthroughCopy('src/assets/images/');

  if (process.env.ELEVENTY_ENV === 'development') {
    config.addPassthroughCopy('dist/styles/main-development.css');
  }

  return {
    dir: {
      input: 'src'
    }
  };
};
