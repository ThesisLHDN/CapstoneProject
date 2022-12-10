const color = {
  green01: '#008000',
  green02: '#29C63B',
  green03: '#00980F',
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
    backgroundColor:
      'radial-gradient(farthest-corner at -100% 200%, #ffff00, #008000)',
    '&:hover': {
      backgroundColor:
        'radial-gradient(farthest-corner at -100% 200%, #ffff22, #228822)',
    },
  },
  grayBtn: {backgroundColor: '#cdcdcd', '&:hover': {backgroundColor: '#ddd'}},
};

export {color, colorHover};
