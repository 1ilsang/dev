/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'date-gray': '#6c6e6f',
        base: '#425061',
        'sub-blue': '#61768f',
        'white-blue': '#d9dee5',
        highlight: '#30ffcb',
      },
      keyframes: {
        bouncing: {
          '100%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        bouncing: 'bouncing 0.3s infinite alternate',
      },
      backgroundImage: {
        home: 'linear-gradient(to left,rgb(148, 148, 255),rgb(182, 182, 255))',
        footer:
          'linear-gradient(-45deg,#ee7752,#e73c7e,#23a6d5,#e73c7e,transparent)',
      },
    },
  },
  plugins: [],
};
