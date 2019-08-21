import { some, isNaN, map } from 'lodash';

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
  '30': '#f9946b',
  '31': '#f88567',
  '32': '#ed7467',
  '33': '#fd5e4c',
  '34': '#ff5050',
  '35': '#ec3435',
  '40': '#fb7045',
  '41': '#fc5d2c',
  '42': '#f35c17',
  '43': '#f34339',
  '44': '#f32a29',
  '45': '#dc2c30',
  '50': '#f95125',
  '51': '#ff4f13',
  '52': '#f64016',
  '53': '#f42d1f',
  '54': '#f0201e',
  '55': '#f52524',
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
    scalePercentile(useOfForcePercentile),
  ].join('');
  return {
    backgroundColor: key !== '00' ?
      OIG_VISUAL_TOKEN_COLOR_SCHEME[key] :
      OIG_EXTRA_BLUE_COLOR_SCHEME[scalePercentile(internalPercentile)],
    textColor: COLOR_TEXT_LIGHT_SCHEME.indexOf(key) === -1 ? DARK_COLOR : LIGHT_COLOR,
  };
};

export const hasEnoughRadarChartData = (items) => (
  !!items && items.length > 0 && !some(map(items, (d) => isNaN(d.value)))
);
