const path = require('path');
const fs = require('fs');

module.exports = (svg, classes) => {
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

  return icon;
};
