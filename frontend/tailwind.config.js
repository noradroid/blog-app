/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Lato'],
    },
    colors: {
      gray: colors.zinc,
    },
  },
  plugins: [],
};
