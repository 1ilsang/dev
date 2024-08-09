/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'date-gray': '#6c6e6f',
        'sub-blue': '#61768f',
        'white-blue': '#d9dee5',
      },
      keyframes: {
        bouncing: {
          '100%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        bouncing: 'bouncing 0.3s infinite alternate',
      },
    },
  },
  plugins: [],
};
