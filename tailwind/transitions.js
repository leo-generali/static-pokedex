module.exports = function({ addUtilities }) {
  addUtilities({
    '.transition': {
      transition: '0.2s'
    },
    '.transition-fast': {
      transition: '0.1s'
    },
    '.transition-slow': {
      transition: '0.3s'
    }
  });
};
