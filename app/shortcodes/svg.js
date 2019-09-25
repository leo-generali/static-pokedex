const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

module.exports = (svg, classNames) => {
  const icon = fs.readFileSync(
    path.join(
      __dirname,
      '..',
      '..',
      'src',
      'assets',
      'images',
      'icons',
      `${svg}.svg`
    ),
    'utf8'
  );

  const $ = cheerio.load(icon);

  if (classNames) {
    $('svg').addClass(classNames.val);
  }

  return $.html();
};
