const typeColor = require('./typeColor');

module.exports = (tags) => {
  if (tags.length === 2) {
    return `background: linear-gradient(45deg, ${typeColor(
      tags[0]
    )} 50%, ${typeColor(tags[1])} 50%)`;
  }

  return `background-color: ${typeColor(tags[0])}`;
};
