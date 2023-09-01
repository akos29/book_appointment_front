/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  extend: {
    spacing: {
      '5px': '5px',
    },
  },
  plugins: [],
};
