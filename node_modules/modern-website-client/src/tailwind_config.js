theme: {
  extend: {
    perspective: {
      '1000': '1000px',
    },
    rotate: {
      'y-180': 'rotateY(180deg)',
    },
  },
},
plugins: [
  function ({ addUtilities }) {
    addUtilities({
      '.backface-hidden': {
        'backface-visibility': 'hidden',
      },
      '.perspective': {
        perspective: '1000px',
      },
      '.transform-style-preserve-3d': {
        'transform-style': 'preserve-3d',
      },
    });
  },
],
