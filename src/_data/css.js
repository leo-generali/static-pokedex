const path = require('path');
const fs = require('fs');

module.exports = async () => {
  if (process.env.ELEVENTY_ENV === 'production') {
    return `<style>${fs.readFileSync(
      path.join(
        __dirname,
        '..',
        '..',
        'dist',
        'styles',
        `main-${process.env.ELEVENTY_ENV}.css`
      ),
      'utf8'
    )}</style>`;
  }

  return '<link rel="stylesheet" type="text/css" href="/dist/styles/main-development.css">';
};
