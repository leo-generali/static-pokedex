const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

module.exports = (type, classes) => {
  const icon = fs.readFileSync(
    path.join(
      __dirname,
      '..',
      '..',
      'src',
      'assets',
      'images',
      'icons',
      'types',
      `${type}.svg`
    ),
    'utf8'
  );

  const $ = cheerio.load(icon);

  $('svg')
    .addClass(classes)
    .html();

  return $.root().html();
};
