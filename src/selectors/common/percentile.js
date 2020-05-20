import { pick, isEmpty } from 'lodash';

import { getVisualTokenOIGBackground } from 'utils/visual-token';
import { PERCENTILE_FIELDS } from 'constants';


export const extractLatestPercentile = (obj) => extractPercentile(pick(obj || {}, PERCENTILE_FIELDS));

export const extractPercentile = (percentile) => {
  if (isEmpty(percentile)) return null;
  const allegationPercentile = parseFloat(percentile['percentile_allegation']);
  const civilianAllegationPercentile = parseFloat(percentile['percentile_allegation_civilian']);
  const internalAllegationPercentile = parseFloat(percentile['percentile_allegation_internal']);
  const trrPercentile = parseFloat(percentile['percentile_trr']);
  if (isNaN(civilianAllegationPercentile) && isNaN(internalAllegationPercentile) && isNaN(trrPercentile))
    return null;
  const { backgroundColor, textColor } = getVisualTokenOIGBackground(allegationPercentile);
  const yearData = percentile['year'] ? { year: percentile['year'] } : {};

  return {
    ...yearData,
    items: [
      { axis: 'Use of Force Reports', value: trrPercentile },
      { axis: 'Internal Allegations', value: internalAllegationPercentile },
      { axis: 'Civilian Allegations', value: civilianAllegationPercentile },
    ],
    visualTokenBackground: backgroundColor,
    textColor,
  };
};

export const visualTokenBackground = (percentileAllegation) => {
  const { backgroundColor } = getVisualTokenOIGBackground(percentileAllegation);
  return backgroundColor;
};
