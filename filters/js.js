const path = require('path');
const fs = require('fs');

module.exports = (pageScripts = []) => {
  const scriptText = pageScripts.map((script) => {
    return fs.readFileSync(
      path.join(__dirname, '..', 'dist', `${script}.js`),
      'utf8'
    );
  });

  return scriptText.join('');
};
