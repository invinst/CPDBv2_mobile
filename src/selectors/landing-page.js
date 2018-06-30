import { createSelector } from 'reselect';
import { find, get } from 'lodash';

import { extractPercentile } from 'selectors/common/percentile';
import { convertContentStateToEditorState } from 'utils/draftjs';

const officerCardTransform = officer => ({
  ...officer,
  percentile: extractPercentile(officer.percentile) || {}
});

export const topOfficersByAllegationSelector = createSelector(
  state => state.landingPage.topOfficersByAllegation,
  officers => officers.map(officerCardTransform)
);

export const recentActivitiesSelector = createSelector(
  state => state.landingPage.recentActivities,
  officers => officers.map(officerCardTransform)
);

export const newDocumentAllegationsSelector = state => state.landingPage.newDocumentAllegations;

export const complaintSummariesSelector = state => state.landingPage.complaintSummaries;

export const cmsSelector = field => state => {
  const cmsField = find(state.landingPage.cms, { name: field });
  return convertContentStateToEditorState(get(cmsField, 'value', {}));
};
