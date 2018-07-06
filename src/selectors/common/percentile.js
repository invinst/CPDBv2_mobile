import { getVisualTokenOIGBackground } from 'utils/visual-token';
import { isNil, every } from 'lodash';


export const extractPercentile = (percentile) => {
  const hasPercentile = percentile && every(
    [
      'percentile_allegation_civilian',
      'percentile_allegation_internal',
      'percentile_trr'
    ],
    (field) => !isNil(percentile[field])
  );

  if (!hasPercentile) return null;

  const { backgroundColor, textColor } = getVisualTokenOIGBackground(
    parseFloat(percentile['percentile_allegation_civilian']),
    parseFloat(percentile['percentile_allegation_internal']),
    parseFloat(percentile['percentile_trr'])
  );
  return {
    officerId: percentile['officer_id'],
    year: percentile['year'],
    items: [
      { axis: 'Use of Force Reports', value: parseFloat(percentile['percentile_trr']) },
      { axis: 'Internal Allegations', value: parseFloat(percentile['percentile_allegation_internal']) },
      { axis: 'Civilian Allegations', value: parseFloat(percentile['percentile_allegation_civilian']) }
    ],
    visualTokenBackground: backgroundColor,
    textColor,
  };
};
