import { getVisualTokenOIGBackground } from 'utils/visual-token';
import { isNil, every } from 'lodash';


export const extractEnoughPercentile = (percentile) => {
  if (!percentile)
    return null;
  const rawPercentile = extractPercentile(percentile);
  return rawPercentile.hasEnoughPercentile ? rawPercentile : null;
};

export const extractPercentile = (percentile) => {
  if (!percentile)
    return null;
  const hasEnoughPercentile = percentile && every(
    [
      'percentile_allegation_civilian',
      'percentile_allegation_internal',
      'percentile_trr'
    ],
    (field) => !isNil(percentile[field])
  );
  const civilianAllegationPercentile = parseFloat(percentile['percentile_allegation_civilian']);
  const internalAllegationPercentile = parseFloat(percentile['percentile_allegation_internal']);
  const trrPercentile = parseFloat(percentile['percentile_trr']);
  const basePercentile = {
    officerId: percentile['officer_id'],
    year: percentile['year'],
    items: [
      { axis: 'Use of Force Reports', value: trrPercentile },
      { axis: 'Internal Allegations', value: internalAllegationPercentile },
      { axis: 'Civilian Allegations', value: civilianAllegationPercentile }
    ],
    hasEnoughPercentile
  };
  if (hasEnoughPercentile) {
    const { backgroundColor, textColor } = getVisualTokenOIGBackground(
      civilianAllegationPercentile,
      internalAllegationPercentile,
      trrPercentile
    );
    return {
      ...basePercentile,
      visualTokenBackground: backgroundColor,
      textColor,
    };
  } else {
    return basePercentile;
  }
};
