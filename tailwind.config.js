module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      screens: {
        '3xl': '1600px',
      },
      fontSize: {
        14: '14px',
      },
      colors: {
        'green-tx': '#008000',
        'tg-text-color': '#00980F',
        'tg-color': '#E0FFDD',
        'done-tx': '#009606',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
        'sidebar-bg': '#98A0AF',
        'to-do-color': '#F74848',
        'in-progress-color': '#006BA7',
        'testing-color': '#EC8E00',
        'done-color': '#009606',
        'done-bg': '#A4E7AB',
        'hover-issue': '#D6D6D6',
        'tg-color': '#E0FFDD',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: '#B4B4B4',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
    },
  },
  plugins: [],
};
