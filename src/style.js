const color = {
  green01: '#008000',
  green02: '#29C63B',
  green03: '#00980F',
  gray01: '#8E8E8E',
  gray02: '#606060',
  red: '#D90000',
};

const background = {
  oldLandingBG: {
    backgroundColor:
      color.green03 /* For browsers that do not support gradients */,
    backgroundImage:
      'radial-gradient(farthest-corner at -100% -00%, #5DC75C, #7CC7B2, #5B69C6)',
  },
  landingBG: {
    backgroundColor:
      color.green03 /* For browsers that do not support gradients */,
    backgroundImage:
      'radial-gradient(farthest-corner at top right, #3EC854, #3BC2C9 ,#4A58C9)',
  },
};

const colorHover = {
  greenBtn: {
    backgroundColor: '#00980F',
    color: 'white',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#00a922'},
  },
  whiteOutlineBtn: {
    color: 'white',
    textTransform: 'none',
    borderColor: 'white',
    boxSizing: 'border-box',
    transition: 'border 1s, background-color 0.5s',
    '&:hover': {borderColor: 'white', backgroundColor: '#FFFFFF20'},
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

export {background, color, colorHover};
