import { createSelector } from 'reselect';
import { find, get, compact } from 'lodash';
import moment from 'moment';

import constants from 'constants';
import { extractPercentile } from 'selectors/common/percentile';
import { convertContentStateToEditorState } from 'utils/draftjs';

const officerCardTransform = officer => ({
  ...officer,
  percentile: extractPercentile(officer.percentile) || {}
});

export const topOfficersByAllegationSelector = createSelector(
  state => state.landingPage.topOfficersByAllegation || [],
  officers => officers.map(officerCardTransform)
);

export const recentActivitiesSelector = createSelector(
  state => state.landingPage.recentActivities || [],
  officers => officers.map(officerCardTransform)
);

export const newDocumentAllegationsSelector = state => state.landingPage.newDocumentAllegations || [];

export const complaintSummariesSelector = createSelector(
  state => state.landingPage.complaintSummaries || [],
  complaints => complaints.map(complaint => {
    const incidentDate = complaint.incident_date
      ? moment(complaint.incident_date).format(constants.SIMPLE_DATE_FORMAT).toUpperCase()
      : null;

    return {
      crid: complaint.crid,
      summary: complaint.summary,
      categories: compact(complaint.category_names).join(', '),
      incidentDate: incidentDate
    };
  })
);

export const cmsSelector = field => state => {
  const cmsField = find(state.landingPage.cms, { name: field });
  return convertContentStateToEditorState(get(cmsField, 'value', {}));
};
