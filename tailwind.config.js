const { transitions, transforms, grid } = require('./tailwind');

module.exports = {
  theme: {
    ...transforms.theme,
    extend: {}
  },
  variants: {
    ...transforms.variants,
    padding: ['responsive', 'hover']
  },
  plugins: [transitions, ...transforms.plugins, ...grid.plugins]
};
