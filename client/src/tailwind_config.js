// tailwind.config.js
module.exports = {
  
  theme: {
    extend: {
      // You can extend spacing, colors, etc. here
    },
    important: true,
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
        '.transform-style-preserve-3d': {
          'transform-style': 'preserve-3d',
        },
      });
    },
  ],
};
