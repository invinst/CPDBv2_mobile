import { createSelector } from 'reselect';
import { find, get, compact } from 'lodash';
import moment from 'moment';

import constants from 'constants';
import { extractPercentile } from 'selectors/common/percentile';
import documentUrl from 'selectors/common/document-url';
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
  //TODO: Below filter should be removed when Officer Pairing Card is implemented
  officers => officers.filter(x => x.type === 'single_officer').map(officerCardTransform)
);

export const newDocumentAllegationsSelector = createSelector(
  state => state.landingPage.newDocumentAllegations || [],
  complaints => complaints.map(complaint => ({
    crid: complaint.crid,
    documentCount: complaint.num_recent_documents,
    document: {
      previewImageUrl: get(complaint, 'latest_document.preview_image_url', null),
      url: documentUrl(get(complaint, 'latest_document.url', null))
    }
  }))
);

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
