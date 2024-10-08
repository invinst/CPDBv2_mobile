import { createSelector } from 'reselect';
import { map, toLower, isEmpty, get } from 'lodash';

import { extractLatestPercentile } from 'selectors/common/percentile';
import { officerUrl } from 'utils/url-util';
import { getCurrentAgeString } from 'utils/date';
import { moneyFormat, moneyFormatShort } from 'utils/money';
import { PINBOARD_PAGE } from 'constants';
import { isItemPinned, pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';


const MUST_BE_ACCEPTED_BY_COUNCIL_CITY_THRESHOLD = 100000;

const getLawsuit = (state, props) => state.lawsuitPage.lawsuits[props.match.params.lawsuitCaseNo];

const plaintiffTransform = (plaintiff) => ({
  name: plaintiff['name'],
});

const officerTransform = (officer, pinboardItems) => {
  const percentile = extractLatestPercentile(officer);

  return {
    officerId: officer.id,
    fullName: officer['full_name'],
    allegationPercentile: Number(officer['percentile_allegation']),
    sustainedCount: officer['sustained_count'],
    gender: officer['gender'] ? toLower(officer['gender']) : 'N/A',
    age: `${getCurrentAgeString(officer['birth_year'])}`,
    race: officer['race'],
    rank: officer['rank'],
    lawsuitCount: officer['lawsuit_count'],
    totalLawsuitSettlements: moneyFormatShort(officer['total_lawsuit_settlements']),
    url: officerUrl(officer.id, officer['full_name']),
    complaintCount: officer['allegation_count'],
    percentile,
    isPinned: isItemPinned(PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER, officer.id, pinboardItems),
  };
};

const paymentTransform = (payment) => ({
  payee: payment['payee'],
  settlement: moneyFormat(payment['settlement']),
  legalFees: moneyFormat(payment['legal_fees']),
});

const attachmentTransform = attachment => ({
  fileType: attachment['file_type'],
  previewImageUrl: attachment['preview_image_url'],
  title: attachment['title'],
  url: attachment['url'],
  id: attachment['id'],
});

const totalPaymentsDetailsTransform = (lawsuit) => {
  const totalSettlement = lawsuit['total_settlement'] || 0;

  return {
    totalPayments: moneyFormat(lawsuit['total_payments']),
    totalSettlement: moneyFormat(totalSettlement),
    totalLegalFees: moneyFormat(lawsuit['total_legal_fees']),
    mustBeAcceptedByCouncilCity: totalSettlement > MUST_BE_ACCEPTED_BY_COUNCIL_CITY_THRESHOLD,
  };
};

export const lawsuitSelector = createSelector(
  getLawsuit,
  pinboardItemsSelector,
  (lawsuit, pinboardItems) => {
    if (isEmpty(lawsuit)) {
      return null;
    }

    return {
      caseNo: lawsuit['case_no'],
      summary: lawsuit['summary'],
      primaryCause: lawsuit['primary_cause'] || 'Unknown',
      address: lawsuit['address'],
      location: lawsuit['location'],
      interactions: get(lawsuit, 'interactions', []),
      services: get(lawsuit, 'services', []),
      misconducts: get(lawsuit, 'misconducts', []),
      violences: get(lawsuit, 'violences', []),
      outcomes: get(lawsuit, 'outcomes', []),
      incidentDate: lawsuit['incident_date'],
      point: lawsuit['point'],
      plaintiffs: map(get(lawsuit, 'plaintiffs', []), plaintiffTransform),
      officers: map(get(lawsuit, 'officers', []), (officer) => officerTransform(officer, pinboardItems)),
      payments: map(get(lawsuit, 'payments', []), paymentTransform),
      totalPaymentsDisplay: moneyFormatShort(lawsuit['total_payments']),
      totalPaymentsDetails: totalPaymentsDetailsTransform(lawsuit),
      attachment: lawsuit['attachment'] && attachmentTransform(lawsuit['attachment']),
    };
  },
);
