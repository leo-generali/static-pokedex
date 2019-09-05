const theme = {
  transform: {
    none: 'none'
  },
  transformOrigin: {
    t: 'top',
    tr: 'top right',
    r: 'right',
    br: 'bottom right',
    b: 'bottom',
    bl: 'bottom left',
    l: 'left',
    tl: 'top left'
  },
  translate: {
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
    '-1': '-0.25rem',
    '-2': '-0.5rem',
    '-3': '-0.75rem',
    '-4': '-1rem',
    '-5': '-1.25rem',
    '-6': '-1.5rem',
    '-8': '-2rem',
    '-10': '-2.5rem',
    '-12': '-3rem',
    '-16': '-4rem',
    '-20': '-5rem',
    '-24': '-6rem',
    '-32': '-8rem',
    '-40': '-10rem',
    '-48': '-12rem',
    '-56': '-14rem',
    '-64': '-16rem'
  },
  scale: {
    '90': '0.9',
    '100': '1',
    '110': '1.1',
    '-100': '-1',
    'stretched-x': ['2', '0.5'],
    'stretched-y': ['0.5', '2'],
    '3d': ['0.5', '1', '2']
  },
  rotate: {
    '90': '90deg',
    '180': '180deg',
    '270': '270deg',
    '3d': ['0', '1', '0.5', '45deg']
  },
  skew: {
    '-5': '-5deg',
    '5': '5deg'
  },
  perspective: {
    none: 'none',
    '250': '250px',
    '500': '500px',
    '750': '750px',
    '1000': '1000px'
  },
  perspectiveOrigin: {
    // defaults to these values
    t: 'top',
    tr: 'top right',
    r: 'right',
    br: 'bottom right',
    b: 'bottom',
    bl: 'bottom left',
    l: 'left',
    tl: 'top left'
  }
};

const variants = {
  transform: ['hover', 'responsive'],
  transformOrigin: ['hover', 'responsive'],
  translate: ['hover', 'responsive'],
  scale: ['hover', 'responsive'],
  rotate: ['hover', 'responsive'],
  skew: ['hover', 'responsive'],
  perspective: ['hover', 'responsive'],
  perspectiveOrigin: ['hover', 'responsive'],
  transformStyle: ['hover', 'responsive'],
  backfaceVisibility: ['hover', 'responsive'],
  transformBox: ['hover', 'responsive']
};

const plugins = [
  require('tailwindcss-transforms')({
    '3d': false // defaults to false
  })
];

module.exports = { theme, variants, plugins };
