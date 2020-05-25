import { createSelector } from 'reselect';
import { omit } from 'lodash';

import { extractLatestPercentile } from 'selectors/common/percentile';
import { PERCENTILE_FIELDS } from 'constants';


export const officerCardTransform = officer => ({
  ...omit(officer, PERCENTILE_FIELDS),
  percentile: extractLatestPercentile(officer),
});

export const officersSelector = createSelector(
  state => state.embed.officers || [],
  officers => officers.map(officerCardTransform)
);
