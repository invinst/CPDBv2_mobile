import { createSelector } from 'reselect';
import { get, compact, take, chain } from 'lodash';

import { extractPercentile } from 'selectors/common/percentile';
import { formatDate } from 'utils/date';
import constants from 'constants';
import { createWithIsPinnedSelector } from 'selectors/common/pinboard';


const officerCardTransform = officer => ({
  ...officer,
  percentile: extractPercentile(officer.percentile),
});

export const topOfficersByAllegationSelector = createWithIsPinnedSelector(
  createSelector(
    state => state.landingPage.topOfficersByAllegation || [],
    officers => take(officers, 20).map(officerCardTransform)
  ),
  constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER,
);

export const recentActivitiesSelector = createWithIsPinnedSelector(
  createSelector(
    state => state.landingPage.recentActivities || [],
    //TODO: Below filter should be removed when Officer Pairing Card is implemented
    officers => chain(officers).filter({ kind: 'single_officer' }).take(20).map(officerCardTransform).value()
  ),
  constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER,
);

export const newDocumentAllegationsSelector = createWithIsPinnedSelector(
  createSelector(
    state => take(state.landingPage.newDocumentAllegations, 20),
    complaints => complaints.map(complaint => ({
      crid: complaint.crid,
      category: get(complaint, 'category', 'Unknown'),
      incidentDate: formatDate(get(complaint, 'incident_date'), false),
      document: {
        previewImageUrl: get(complaint, 'latest_document.preview_image_url', null),
        id: get(complaint, 'latest_document.id', null),
      },
    }))
  ),
  constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.CR,
);

export const complaintSummariesSelector = createWithIsPinnedSelector(
  createSelector(
    state => take(state.landingPage.complaintSummaries, 20),
    complaints => complaints.map(complaint => {
      return {
        crid: complaint.crid,
        summary: complaint.summary,
        incidentDate: formatDate(get(complaint, 'incident_date'), false),
      };
    })
  ),
  constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.CR,
);

export const getCMSRequested = state => state.landingPage.cmsRequested;

export const getEmbed = (props) => compact(get(props, 'location.pathname', '').split('/'))[0] === 'embed';
