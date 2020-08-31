import { createSelector } from 'reselect';
import { startCase, get, map, compact, toLower, capitalize, isEmpty, isNil } from 'lodash';

import { extractPercentile } from 'selectors/common/percentile';
import { getCareerDuration, getCurrentAge } from 'utils/date';
import { pinboardItemsSelector, isItemPinned } from 'selectors/pinboard-page/pinboard';
import { PINBOARD_PAGE } from 'constants';
import { moneyFormatShort } from 'utils/money';


export const getOfficerId = (props) => props.match.params.id;

const getOfficer = (state, props) => (
  state.officerPage.officers.data[getOfficerId(props)] || null
);

export const getOfficerInfo = (state, officerId) => get(state.officerPage.officers.data, String(officerId), []);

export const officerYearlyPercentileSelector = createSelector(
  [getOfficer],
  (officer) => compact(map(get(officer, 'percentiles', []), extractPercentile))
);

export const DATA_NOT_AVAILABLE = 'N/A';

const getOfficerRank = (officer) => {
  if (typeof officer.rank === 'undefined')
    return '';
  else
    return officer.rank || DATA_NOT_AVAILABLE;
};

const getOfficerUnitDisplay = (officer) => {
  const unitName = get(officer.unit, 'unit_name');
  const unitFullName = unitName ? `Unit ${unitName}` : unitName;
  const unitDescription = get(officer.unit, 'description');
  return compact([unitFullName, unitDescription]).join(' - ');
};

const getOfficerDemographic = (officer) => {
  const race = startCase(toLower(get(officer, 'race')));
  const sex = startCase(toLower(get(officer, 'gender')));
  const age = getCurrentAge(officer['birth_year']);
  const ageString = age ? `${age} years old` : null;
  const demographicItems = compact([ageString, race, sex]);
  return isEmpty(demographicItems) ? '' : `${capitalize(demographicItems.join(', ').toLowerCase())}.`;
};

export const officerSummarySelector = createSelector(
  [getOfficer],
  (officer) => {
    if (!officer) {
      return null;
    }
    return {
      id: officer['officer_id'],
      name: officer['full_name'],
      unit: getOfficerUnitDisplay(officer),
      rank: getOfficerRank(officer),
      demographic: getOfficerDemographic(officer),
      badge: officer.badge,
      historicBadges: officer['historic_badges'],
      careerDuration: getCareerDuration(officer['date_of_appt'], officer['date_of_resignation']),
      hasUniqueName: officer['has_unique_name'],
    };
  }
);

export const officerMetricsSelector = createSelector(
  [getOfficer],
  (officer) => {
    if (!officer) {
      return null;
    }

    const formatValue = (value) => isNil(value) ? DATA_NOT_AVAILABLE : value;

    return {
      allegationCount: formatValue(officer.allegation_count),
      allegationPercentile: formatValue(officer.percentile_allegation),
      honorableMentionCount: formatValue(officer.honorable_mention_count),
      sustainedCount: formatValue(officer.sustained_count),
      disciplineCount: formatValue(officer.discipline_count),
      honorableMentionPercentile: formatValue(officer.honorable_mention_percentile),
      trrCount: formatValue(officer.trr_count),
      majorAwardCount: formatValue(officer.major_award_count),
      trrPercentile: formatValue(officer.percentile_trr),
      totalLawsuitSettlements: `$${moneyFormatShort(officer.total_lawsuit_settlements).toUpperCase()}`,
    };
  }
);

export const getIsOfficerPinned = (state, props) => (
  isItemPinned('OFFICER', getOfficerId(props), pinboardItemsSelector(state))
);

export const pinnableOfficerSelector = createSelector(
  getOfficer,
  (officer) => ({
    type: PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER,
    id: officer['officer_id'],
    fullName: officer['full_name'],
  })
);
