const colors = {
  white: '#dfdfdf',
  black: '#101010',
  'date-gray': '#6c6e6f',
  base: '#425061',
  'base-og': '#ee7752',
  'sub-blue': '#61768f',
  'white-blue': '#d9dee5',
  highlight: '#30ffcb',
  progress: '#28bc97',
  'light-blue': '#6e94d8',
  'snazzy-bg': 'rgb(20 22 33)',
};

const keyframes = {
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
  'rainbow-water': {
    '0%': {
      'background-position': '0% 50%',
    },
    '50%': {
      'background-position': '100% 50%',
    },
    '100%': {
      'background-position': '0% 50%',
    },
  },
  'fade-in': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  skeleton: {
    '0%': {
      'background-color': 'rgba(165, 165, 165, 10%)',
    },
    '50%': {
      'background-color': 'rgba(165, 165, 165, 30%)',
    },
    '100%': {
      'background-color': 'rgba(165, 165, 165, 10%)',
    },
  },
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
      keyframes,
      animation: {
        bouncing: 'bouncing 0.3s infinite alternate',
        'floating-index': 'floating-index 0.3s forwards',
        'rainbow-water': 'rainbow-water 5s ease infinite',
        'slow-spin': 'spin 2s linear infinite',
        'fade-in': 'fade-in 0.2s',
        skeleton: 'skeleton 1.8s infinite ease-in-out',
        loading:
          'skeleton 1.8s infinite ease-in-out, spin 1s infinite ease-in-out',
      },
      backgroundImage: {
        home: 'linear-gradient(to left,rgb(148, 148, 255),rgb(182, 182, 255))',
        'rainbow-water':
          'linear-gradient(-45deg,#ee7752,#23a6d5,#ff9393,#2ddbdb,#2389ff)',
        footer:
          'linear-gradient(-45deg,#ee7752,#e73c7e,#23a6d5,#e73c7e,transparent)',
      },
      printColorAdjust: {
        exact: 'print-color-adjust: exact',
      },
      boxShadowColor: {
        nav: 'rgb(0 129 86 / 10%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.print-color-exact': {
          printColorAdjust: 'exact',
        },
        '.progress-wheel': {
          backgroundColor: colors.progress,
          transition: 'width 0.3s ease-out',
        },
        '.title-underline': {
          textShadow: `-0.5px 0 ${colors.base}, 0 0.5px ${colors.base}, 0.5px 0 ${colors.base}, 0 -0.5px ${colors.base}`,
          textDecoration: 'underline',
          textDecorationThickness: '0.15em',
          textDecorationColor: '#42506117',
        },
        '.category-shadow': {
          textShadow: `-0.5px 0 ${colors.highlight}, 0 0.5px ${colors.highlight}, 0.5px 0 ${colors.highlight}, 0 -0.5px ${colors.highlight}`,
        },
      });
    },
  ],
};
