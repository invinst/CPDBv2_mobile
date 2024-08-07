import { createSelector } from 'reselect';
import moment from 'moment';
import { get, compact, sortBy, isEmpty, each } from 'lodash';

import { MONTH_NAME_DAY_YEAR_FORMAT, PINBOARD_PAGE } from 'constants';
import { getFindingOutcomeMix } from './finding-outcome-mix';
import { extractLatestPercentile } from 'selectors/common/percentile';
import { cmsSelector } from 'selectors/common/cms';
import { createWithIsPinnedSelector } from 'selectors/common/pinboard';
import { getBreadcrumbItems } from 'selectors/breadcrumb';
import { isItemPinned, pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';


const getComplaint = (state, props) => state.complaintPage.complaints[getComplaintID(props)];

export const getComplaintID = (props) => props.match.params.complaintId;

const formatDate = (date) => {
  if (!date) {
    return null;
  }
  return moment(date).format(MONTH_NAME_DAY_YEAR_FORMAT);
};

const getDemographicString = ({ race, gender, age }) =>
  compact([race, gender, age ? `Age ${age}` : null]).join(', ');

const coaccusedTransform = coaccused => {
  return {
    category: coaccused.category,
    finalFinding: coaccused.final_finding,
    finalOutcome: coaccused.final_outcome,
    fullName: coaccused.full_name,
    disciplined: coaccused.disciplined,
    allegationCount: coaccused.allegation_count,
    id: coaccused.id,
    rank: coaccused.rank,
    findingOutcome: getFindingOutcomeMix(coaccused['final_finding'], coaccused['final_outcome']),
    percentile: extractLatestPercentile(coaccused),
  };
};

const coaccusedSelector = createSelector(
  getComplaint,
  complaint => get(complaint, 'coaccused', []).map(coaccusedTransform)
);

export function getOfficerId(url) {
  if (url === undefined) {
    return NaN;
  }
  return parseInt(url.replace(/.*officers?\/(\d+).*/, '$1'));
}

const breadcrumbOfficerIdsSelector = createSelector(
  getBreadcrumbItems,
  (breadcrumbItems) => {
    const results = [];


    each(breadcrumbItems, ({ url }) => {
      const officerId = getOfficerId(url);
      if (officerId) {
        results.push(officerId);
      }
    });

    return results;
  }
);

const sortByOfficerInBreadcrumb = breadcrumbOfficerIds => officer => {
  return -breadcrumbOfficerIds.indexOf(parseInt(officer.id));
};

const sortByOfficerFinding = officer => {
  return officer.finalFinding === 'Sustained' ? 0 : 1;
};

const sortByOfficerComplaint = officer => -officer.allegationCount;

const getCoaccusedSelector = createWithIsPinnedSelector(
  createSelector(
    coaccusedSelector,
    breadcrumbOfficerIdsSelector,
    (officers, breadcrumbOfficerIds) => {
      return sortBy(
        officers,
        [
          sortByOfficerInBreadcrumb(breadcrumbOfficerIds),
          sortByOfficerFinding,
          sortByOfficerComplaint,
        ]
      );
    }
  ),
  PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER
);

const attachmentTransform = attachment => ({
  fileType: attachment['file_type'],
  previewImageUrl: attachment['preview_image_url'],
  title: attachment['title'],
  url: attachment['url'],
  id: attachment['id'],
});

const involvedAs = type => involvement => involvement['involved_type'] === type;

export const complaintSelector = createSelector(
  getComplaint,
  getCoaccusedSelector,
  (complaint, coaccuseds) => {
    if (!complaint) {
      return null;
    }

    const involvements = get(complaint, 'involvements', []).map(
      involvement => ({
        ...involvement,
        percentile: involvement['officer_id'] && extractLatestPercentile(involvement),
      })
    );

    return {
      crid: complaint.crid,
      category: get(complaint, 'most_common_category.category') || 'Unknown',
      subcategory: get(complaint, 'most_common_category.allegation_name') || 'Unknown',
      summary: complaint.summary,
      coaccused: coaccuseds,
      victims: compact(get(complaint, 'victims', []).map(getDemographicString)),
      complainants: compact(get(complaint, 'complainants', []).map(getDemographicString)),
      attachments: get(complaint, 'attachments', []).map(attachmentTransform),
      incidentDate: formatDate(complaint.incident_date),
      endDate: formatDate(complaint.end_date),
      startDate: formatDate(complaint.start_date),
      point: complaint.point,
      location: complaint.location,
      address: complaint.address,
      beat: complaint.beat,
      investigators: involvements.filter(involvedAs('investigator')),
      policeWitnesses: involvements.filter(involvedAs('police_witness')),
    };
  }
);

export const getCMSRequested = state => state.complaintPage.cmsRequested;

const hasAttachmentsSelector = createSelector(
  (state, props) => state.complaintPage.complaints[props.crid],
  complaint => !isEmpty(get(complaint, 'attachments'))
);

export const requestDocumentButtonMessage = (state, props) => (
  hasAttachmentsSelector(state, props) ? cmsSelector(state, 'complaintPage', 'new_document_notification') :
    cmsSelector(state, 'complaintPage', 'document_request_instruction')
);

export const buttonText = (state, props) => (
  hasAttachmentsSelector(state, props) ? 'New Document Notifications': 'Request Documents'
);

export const getIsCrPinned = (state, props) => (
  isItemPinned('CR', getComplaintID(props), pinboardItemsSelector(state))
);

export const pinnableCrSelector = createSelector(
  getComplaint,
  (complaint) => ({
    type: PINBOARD_PAGE.PINNED_ITEM_TYPES.CR,
    id: complaint.crid,
  })
);
