import { createSelector } from 'reselect';
import { get, compact, chain, shuffle } from 'lodash';

import { extractLatestPercentile } from 'selectors/common/percentile';
import { formatDate } from 'utils/date';
import { PINBOARD_PAGE } from 'constants';
import { createWithIsPinnedSelector } from 'selectors/common/pinboard';


const officerCardTransform = officer => ({
  ...officer,
  percentile: extractLatestPercentile(officer),
});

export const shuffled = (selector) => createSelector(
  selector,
  cards => {
    const upperHalf = shuffle(cards.slice(0, 12));
    const lowerHalf = shuffle(cards.slice(12));
    return upperHalf.concat(lowerHalf);
  }
);

// Repeaters
const getTopOfficersByAllegation = state => get(state, 'landingPage.topOfficersByAllegation', []);

const topOfficerCardsSelector = createSelector(
  shuffled(getTopOfficersByAllegation),
  officers => officers.map(officerCardTransform)
);

export const topOfficersByAllegationSelector = createWithIsPinnedSelector(
  topOfficerCardsSelector,
  PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER,
);

// Mentioned on Twitter
const getRecentActivities = state => get(state, 'landingPage.recentActivities', []);

const recentActivityOfficerCardsSelector = createSelector(
  shuffled(getRecentActivities),
  // TODO: Below filter should be removed when Officer Pairing Card is implemented
  officers => chain(officers).filter({ kind: 'single_officer' }).map(officerCardTransform).value()
);

export const recentActivitiesSelector = createWithIsPinnedSelector(
  recentActivityOfficerCardsSelector,
  PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER,
);

// New Documents
const getNewDocumentAllegations = state => get(state, 'landingPage.newDocumentAllegations', []);

export const newDocumentAllegationsSelector = createWithIsPinnedSelector(
  createSelector(
    getNewDocumentAllegations,
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
  PINBOARD_PAGE.PINNED_ITEM_TYPES.CR,
);

// Complaint Summaries
const getComplaintSummaries = state => get(state, 'landingPage.complaintSummaries', []);

const complaintSummariesCardsSelector = createSelector(
  shuffled(getComplaintSummaries),
  complaints => complaints.map(complaint => ({
    crid: complaint.crid,
    summary: complaint.summary,
    incidentDate: formatDate(get(complaint, 'incident_date'), false),
  }))
);

export const complaintSummariesSelector = createWithIsPinnedSelector(
  complaintSummariesCardsSelector,
  PINBOARD_PAGE.PINNED_ITEM_TYPES.CR,
);

// Others
export const getCMSRequested = state => state.landingPage.cmsRequested;
export const getEmbed = (props) => compact(get(props, 'location.pathname', '').split('/'))[0] === 'embed';
