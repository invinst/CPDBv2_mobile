import { createSelector } from 'reselect';
import { extractPercentile } from 'selectors/common/percentile';


const officerCardTransform = officer => ({
  ...officer,
  percentile: extractPercentile(officer.percentile),
});

export const officersSelector = createSelector(
  state => state.embed.officers || [],
  officers => officers.map(officerCardTransform)
);
