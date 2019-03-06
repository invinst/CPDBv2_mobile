import { createSelector } from 'reselect';
import { get, compact, take, chain } from 'lodash';
import moment from 'moment';

import constants from 'constants';
import { extractPercentile } from 'selectors/common/percentile';


const officerCardTransform = officer => ({
  ...officer,
  percentile: extractPercentile(officer.percentile)
});

export const topOfficersByAllegationSelector = createSelector(
  state => state.landingPage.topOfficersByAllegation || [],
  officers => take(officers, 20).map(officerCardTransform)
);

export const recentActivitiesSelector = createSelector(
  state => state.landingPage.recentActivities || [],
  //TODO: Below filter should be removed when Officer Pairing Card is implemented
  officers => chain(officers).filter({ kind: 'single_officer' }).take(20).map(officerCardTransform).value()
);

export const newDocumentAllegationsSelector = createSelector(
  state => take(state.landingPage.newDocumentAllegations, 20),
  complaints => complaints.map(complaint => ({
    crid: complaint.crid,
    documentCount: complaint.num_recent_documents,
    document: {
      previewImageUrl: get(complaint, 'latest_document.preview_image_url', null),
      id: get(complaint, 'latest_document.id', null),
    }
  }))
);

export const complaintSummariesSelector = createSelector(
  state => take(state.landingPage.complaintSummaries, 20),
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

export const getCMSRequested = state => state.landingPage.cmsRequested;

export const getEmbed = (props) => compact(get(props, 'location.pathname', '').split('/'))[0] === 'embed';
