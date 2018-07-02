const OIG_VISUAL_TOKEN_COLOR_SCHEME = {
  '00': '#f5f4f4',
  '01': '#fce0e0',
  '02': '#f6c9d0',
  '03': '#f6a8a7',
  '04': '#f28081',
  '05': '#ef6f70',
  '10': '#f9dec7',
  '11': '#f9d3c3',
  '12': '#f3adad',
  '13': '#f39f8e',
  '14': '#f18075',
  '15': '#ed6154',
  '20': '#f5c5a2',
  '21': '#f3b094',
  '22': '#f4a298',
  '23': '#f28687',
  '24': '#ee6465',
  '25': '#e85050',
  '30': '#f3b58e',
  '31': '#f2a67f',
  '32': '#ee7b6f',
  '33': '#ec6c5e',
  '34': '#e75151',
  '35': '#e44243',
  '40': '#eea558',
  '41': '#eb9056',
  '42': '#ed754f',
  '43': '#eb5f45',
  '44': '#ea4029',
  '45': '#df1d24',
  '50': '#ea872c',
  '51': '#ea752b',
  '52': '#ea6836',
  '53': '#ea5734',
  '54': '#e94829',
  '55': '#e81f25',
};

const OIG_EXTRA_BLUE_COLOR_SCHEME = {
  '0': '#f5f4f4',
  '1': '#dde6f7',
  '2': '#d1ddf1',
  '3': '#bdc7ec',
  '4': '#8498d8',
  '5': '#405ec3',
};

export const OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT = {
  COLOR_TEXT_LIGHT_SCHEME: ['55', '54', '45', '44'],
  DARK_COLOR: '#231F20',
  LIGHT_COLOR: '#DFDFDF',
};

export const scalePercentile = (val) => {
  return val !== 0 ? Math.floor((val - 0.0001) / 20) + 1: 0;
};

export const getVisualTokenOIGBackground = (civilPercentile, internalPercentile, useOfForcePercentile) => {
  const { LIGHT_COLOR, DARK_COLOR, COLOR_TEXT_LIGHT_SCHEME } = OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT;
  const key = [
    scalePercentile(civilPercentile),
    scalePercentile(useOfForcePercentile)
  ].join('');
  return {
    backgroundColor: key !== '00' ?
      OIG_VISUAL_TOKEN_COLOR_SCHEME[key] :
      OIG_EXTRA_BLUE_COLOR_SCHEME[scalePercentile(internalPercentile)],
    textColor: COLOR_TEXT_LIGHT_SCHEME.indexOf(key) === -1 ? DARK_COLOR : LIGHT_COLOR,
  };
};
