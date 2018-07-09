import constants from 'constants';
import { createSelector } from 'reselect';
import moment from 'moment';
import { get, compact } from 'lodash';

import { getFindingOutcomeMix } from './finding-outcome-mix';
import { extractPercentile } from 'selectors/common/percentile';


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
    id: coaccused.id,
    rank: coaccused.rank,
    findingOutcome: getFindingOutcomeMix(coaccused['final_finding'], coaccused['final_outcome']),
    percentile: extractPercentile(coaccused) || {}
  };
};


const buildAttachmentUrl = attachment => {
  let url = attachment['url'];
  if (attachment['file_type'] === 'document') {
    url = url.replace(/(\.html)$/, '.pdf');
  }

  return {
    fileType: attachment['file_type'],
    previewImageUrl: attachment['preview_image_url'],
    title: attachment['title'],
    url: url
  };
};

const involvedAs = type => involvement => involvement['involved_type'] === type;

export const complaintSelector = createSelector(
  [getComplaint],
  complaint => {
    if (!complaint) {
      return null;
    }

    const involvements = get(complaint, 'involvements', []).map(
      involvement => ({
        ...involvement,
        percentile: (involvement['officer_id'] && extractPercentile(involvement)) || {}
      })
    );

    return {
      crid: complaint.crid,
      category: get(complaint, 'most_common_category.category') || 'Unknown',
      subcategory: get(complaint, 'most_common_category.allegation_name') || 'Unknown',
      summary: complaint.summary,
      coaccused: get(complaint, 'coaccused', []).map(coaccusedTransform),
      victims: compact(get(complaint, 'victims', []).map(getDemographicString)),
      complainants: compact(get(complaint, 'complainants', []).map(getDemographicString)),
      attachments: get(complaint, 'attachments', []).map(buildAttachmentUrl),
      incidentDate: formatDate(complaint.incident_date),
      endDate: formatDate(complaint.end_date),
      startDate: formatDate(complaint.start_date),
      point: complaint.point,
      location: complaint.location,
      address: complaint.address,
      beat: complaint.beat,
      investigators: involvements.filter(involvedAs('investigator')),
      policeWitnesses: involvements.filter(involvedAs('police_witness'))
    };
  }
);
