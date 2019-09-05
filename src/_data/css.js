const path = require('path');
const fs = require('fs');

module.exports = async () =>
  fs.readFileSync(
    path.join(
      __dirname,
      '..',
      '..',
      'dist',
      'styles',
      `main-${process.env.ELEVENTY_ENV}.css`
    ),
    'utf8'
  );
