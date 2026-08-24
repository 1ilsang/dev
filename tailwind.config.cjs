const colors = {
  white: 'var(--theme-foreground)',
  'pure-white': '#fff',
  black: '#101010',
  'date-gray': 'var(--theme-date)',
  base: 'var(--theme-base)',
  dark: 'var(--theme-subtle)',
  'base-og': '#ee7752',
  'sub-blue': 'var(--theme-muted)',
  'white-blue': 'var(--theme-secondary)',
  'highlight-more': 'var(--theme-accent-strong)',
  highlight: 'var(--theme-accent)',
  progress: 'var(--theme-progress)',
  'light-blue': '#6e94d8',
  'snazzy-bg': 'var(--theme-background)',
  sidebar: 'var(--theme-sidebar-background)',
  'on-vibrant': 'var(--theme-on-vibrant)',
  'modal-backdrop': 'rgb(13 17 23)',
  peach: '#d7c0c0',
};

const keyframes = {
  bouncing: {
    '100%': { transform: 'translateY(-5px)' },
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
  show: {
    '0%': {
      'max-height': 0,
      opacity: 0,
    },
    '100%': {
      'max-height': '8000px',
      opacity: 1,
    },
  },
  hide: {
    '0%': {
      'max-height': '8000px',
      opacity: 1,
    },
    '100%': {
      'max-height': 0,
      opacity: 0,
      visibility: 'hidden',
    },
  },
  'footer-sweep': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-100%)',
    },
    '20%, 80%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
      transform: 'translateX(300%)',
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
      padding: {
        'scroll-lock': 'var(--scroll-lock)',
      },
      scale: {
        102: '1.02',
      },
      keyframes,
      animation: {
        bouncing: 'bouncing 0.3s infinite alternate',
        'rainbow-water': 'rainbow-water 5s ease infinite',
        'slow-spin': 'spin 2s linear infinite',
        'fade-in': 'fade-in 0.2s',
        skeleton: 'skeleton 1.8s infinite ease-in-out',
        loading:
          'skeleton 1.8s infinite ease-in-out, spin 1s infinite ease-in-out',
        show: 'show 0.5s forwards',
        hide: 'hide 0.25s forwards',
        'footer-sweep': 'footer-sweep 7s ease-in-out infinite',
      },
      backgroundImage: {
        home: 'linear-gradient(to left,rgb(148, 148, 255),rgb(182, 182, 255))',
        nav: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        'rainbow-water':
          'linear-gradient(-45deg,#ee7752,#23a6d5,#ff9393,#2ddbdb,#2389ff)',
        footer:
          'linear-gradient(-45deg,#ee7752,#e73c7e,#23a6d5,#e73c7e,transparent)',
        jumbo: 'linear-gradient(-90deg, #ee7752, #e73c7e, #23a6d5, #e73c7e)',
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
          textDecorationColor: 'var(--theme-decoration)',
        },
        '.category-shadow': {
          textShadow: `-0.5px 0 ${colors.highlight}, 0 0.5px ${colors.highlight}, 0.5px 0 ${colors.highlight}, 0 -0.5px ${colors.highlight}`,
        },
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--theme-scrollbar)',
            borderRadius: '10px',
            border: `2px solid ${colors['snazzy-bg']}`,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
        },
        '.custom-horizon-scrollbar': {
          '&': {
            width: '100%',
            overflowX: 'scroll',
            gap: '0.3rem',
          },
          '&::-webkit-scrollbar': {
            height: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
            backgroundSize: `400% 400%`,
            borderRadius: `10px`,
            border: `2px solid ${colors['snazzy-bg']}`,
          },
        },
        '.img-container': {
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        },
        '.underline-highlight-fade': {
          color: colors.highlight,
          textDecoration: `underline 0.15em ${colors['snazzy-bg']}`,
          transition: 'text-decoration-color 500ms',

          '&:hover': {
            cursor: 'pointer',
            textDecorationColor: colors.highlight,
          },
        },
        '.underline-highlight-fade-dark': {
          color: colors.progress,
          textDecoration: `underline 0.15em ${colors['snazzy-bg']}`,
          transition: '500ms',

          '&:hover': {
            color: colors['highlight-more'],
            textShadow: `-0.2px 0 ${colors['highlight-more']}`,
            cursor: 'pointer',
            textDecorationColor: colors.progress,
          },
        },
        '.content-visibility-auto': {
          'content-visibility': 'auto',
        },
        '.contain-intrinsic-size': {
          'contain-intrinsic-size': 'auto 126px',
        },
      });
    },
  ],
};
