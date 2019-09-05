const plugins = [
  require('tailwindcss-grid')({
    grids: [1, 2, 3, 4, 5, 6, 7, 8, 10, 12],
    gaps: {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '56': '14rem',
      '64': '16rem',
      '4-x': '1rem',
      '4-y': '1rem'
    },
    autoMinWidths: {
      '16': '4rem',
      '24': '6rem',
      '300px': '300px'
    },
    variants: ['responsive']
  })
];

module.exports = { plugins };
