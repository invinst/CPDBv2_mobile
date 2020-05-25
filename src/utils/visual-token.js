import { some, isNaN, map, find, pick } from 'lodash';

import appConfig from 'utils/app-config';
import { APP_CONFIG_KEYS } from 'constants';
import { softBlackColor } from 'utils/styles';


export const getVisualTokenOIGBackground = (allegationPercentile) => {
  if (isNaN(allegationPercentile)) {
    return { textColor: softBlackColor };
  }
  const visualTokenColors = appConfig.get(APP_CONFIG_KEYS.VISUAL_TOKEN_COLORS, []);
  return pick(find(
    visualTokenColors,
    ({ lower, upper }) => {
      return allegationPercentile >= lower && allegationPercentile < upper;
    }
  ), ['backgroundColor', 'textColor']);
};

export const hasEnoughRadarChartData = (items) => (
  !!items && items.length > 0 && !some(map(items, (d) => isNaN(d.value)))
);
