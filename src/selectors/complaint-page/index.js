import { createSelector } from 'reselect';
import moment from 'moment';
import { get, compact, sortBy, isEmpty } from 'lodash';

import constants from 'constants';
import { getFindingOutcomeMix } from './finding-outcome-mix';
import { extractPercentile } from 'selectors/common/percentile';
import { breadcrumbSelector } from 'selectors/common/breadcrumbs';
import { cmsSelector } from 'selectors/common/cms';
import { createWithIsPinnedSelector } from 'selectors/common/pinboard';


const getComplaint = (state, props) => state.complaintPage.complaints[props.params.complaintId];

const formatDate = (date) => {
  if (!date) {
    return null;
  }
  return moment(date).format(constants.SIMPLE_DATE_FORMAT);
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
    percentile: extractPercentile(coaccused),
  };
};

const coaccusedSelector = createSelector(
  getComplaint,
  complaint => get(complaint, 'coaccused', []).map(coaccusedTransform)
);

const sortByOfficerInBreadcrumb = breadcrumbs => officer => {
  const officerIdsInBreadcrumb = breadcrumbs
    .filter(item => item.url.indexOf(constants.OFFICER_PATH) > -1)
    .map(item => item.params.officerId);
  return -officerIdsInBreadcrumb.indexOf(String(officer.id));
};

const sortByOfficerFinding = officer => {
  return officer.finalFinding === 'Sustained' ? 0 : 1;
};

const sortByOfficerComplaint = officer => -officer.allegationCount;

const getCoaccusedSelector = createWithIsPinnedSelector(
  createSelector(
    coaccusedSelector,
    breadcrumbSelector,
    (officers, { breadcrumbs }) => {
      return sortBy(
        officers,
        [
          sortByOfficerInBreadcrumb(breadcrumbs),
          sortByOfficerFinding,
          sortByOfficerComplaint,
        ]
      );
    }
  ),
  constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER
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
        percentile: involvement['officer_id'] && extractPercentile(involvement),
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

const hasAttachmentSelector = createSelector(
  (state, props) => state.complaintPage.complaints[props.crid],
  complaint => !isEmpty(get(complaint, 'attachments'))
);

export const requestDocumentButtonMessage = (state, props) => (
  hasAttachmentSelector(state, props) ? cmsSelector(state, 'complaintPage', 'new_document_notification') :
    cmsSelector(state, 'complaintPage', 'document_request_instruction')
);

export const buttonText = (state, props) => (
  hasAttachmentSelector(state, props) ? 'New Document Notifications': 'Request Documents'
);
