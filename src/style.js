const color = {
  green01: '#008000',
  green02: '#29C63B',
  green03: '#00980F',
  gray01: '#8E8E8E',
  gray02: '#606060',
  red: '#D90000',
};

const colorHover = {
  greenBtn: {
    backgroundColor: '#00980F',
    '&:hover': {backgroundColor: '#00a922'},
  },
  greenIconBtn: {
    color: '#00980F',
    '&:hover': {color: '#00a922'},
  },
  greenGradBtn: {
    fontWeight: 700,
    color: 'white',
    textTransform: 'none',
    backgroundImage:
      'radial-gradient(farthest-corner at -100% 200%, #ffff00, #008000)',
    transition: 'background 2s',
    '&:hover': {
      backgroundImage:
        'radial-gradient(farthest-corner at -100% 200%, #ffff22, #228822)',
    },
  },
  grayBtn: {
    backgroundColor: '#cdcdcd',
    textTransform: 'none',
    color: '#181818',
    '&:hover': {backgroundColor: '#ddd'},
  },
};

export {color, colorHover};
