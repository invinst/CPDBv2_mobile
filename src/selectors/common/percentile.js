import { getVisualTokenOIGBackground } from 'utils/visual-token';


export const extractPercentile = (percentile) => {
  if (!percentile)
    return null;
  const civilianAllegationPercentile = parseFloat(percentile['percentile_allegation_civilian']);
  const internalAllegationPercentile = parseFloat(percentile['percentile_allegation_internal']);
  const trrPercentile = parseFloat(percentile['percentile_trr']);

  if (isNaN(civilianAllegationPercentile) && isNaN(internalAllegationPercentile) && isNaN(trrPercentile))
    return null;

  const { backgroundColor, textColor } = getVisualTokenOIGBackground(
    civilianAllegationPercentile,
    internalAllegationPercentile,
    trrPercentile
  );
  return {
    officerId: percentile['officer_id'],
    year: percentile['year'],
    items: [
      { axis: 'Use of Force Reports', value: trrPercentile },
      { axis: 'Internal Allegations', value: internalAllegationPercentile },
      { axis: 'Civilian Allegations', value: civilianAllegationPercentile },
    ],
    visualTokenBackground: backgroundColor,
    textColor,
  };
};
