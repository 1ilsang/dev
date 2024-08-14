const colors = {
  white: '#dfdfdf',
  black: '#101010',
  'date-gray': '#6c6e6f',
  base: '#425061',
  'sub-blue': '#61768f',
  'white-blue': '#d9dee5',
  highlight: '#30ffcb',
  'light-blue': '#6e94d8',
  'snazzy-bg': 'rgb(20 22 33)',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        ridi: ['var(--ridi-batang)'],
        d2: ['var(--d2coding)'],
      },
      keyframes: {
        bouncing: {
          '100%': { transform: 'translateY(-5px)' },
        },
        'floating-index': {
          '0%': {
            color: colors.base,
          },
          '100%': {
            color: colors['light-blue'],
            transform: `scale(1.02)`,
          },
        },
      },
      animation: {
        bouncing: 'bouncing 0.3s infinite alternate',
        'floating-index': 'floating-index 0.3s forwards',
      },
      backgroundImage: {
        home: 'linear-gradient(to left,rgb(148, 148, 255),rgb(182, 182, 255))',
        footer:
          'linear-gradient(-45deg,#ee7752,#e73c7e,#23a6d5,#e73c7e,transparent)',
      },
      printColorAdjust: {
        exact: 'print-color-adjust: exact',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.print-color-exact': {
          printColorAdjust: 'exact',
        },
      });
    },
  ],
};
