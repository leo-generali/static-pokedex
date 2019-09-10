module.exports = (config) => {
  // Transforms
  config.addTransform('htmlmin', require('./app/transforms/htmlmin'));

  config.addCollection('pokemonSorted', function(collection) {
    return [...collection.getFilteredByTag('pokemon')].sort(
      (a, b) => a.data.pokemon.id - b.data.pokemon.id
    );
  });

  // Filters
  config.addFilter('padNumber', require('./app/filters/pad'));
  config.addFilter('log', require('./app/filters/log'));
  config.addFilter('typeColor', require('./app/filters/typeColor'));
  config.addFilter('js', require('./app/filters/js'));
  config.addFilter('typeGradient', require('./app/filters/typeGradient'));
  config.addFilter('comma', require('./app/filters/comma'));
  config.addFilter('multiplierColor', require('./app/filters/multiplierColor'));

  // Shortcodes
  config.addShortcode('svg', require('./app/shortcodes/svg'));

  // Passthrough
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
