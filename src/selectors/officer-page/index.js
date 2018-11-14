import { createSelector } from 'reselect';
import { startCase, get, map, last, compact, toLower, capitalize, isEmpty, isNil } from 'lodash';

import { extractPercentile } from 'selectors/common/percentile';
import { getCareerDuration, getCurrentAge } from 'utils/date';


const getOfficer = (state, props) => (
  state.officerPage.officers.data[props.params.id] || null
);

export const getCurrentTab = state => state.officerPage.currentTab;

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
      badge: isEmpty(officer.badge) ? 'Unknown' : officer.badge,
      historicBadges: officer['historic_badges'],
      careerDuration: getCareerDuration(officer['date_of_appt'], officer['date_of_resignation']),
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

    const percentiles = get(officer, 'percentiles', []);
    return {
      allegationCount: formatValue(officer.allegation_count),
      allegationPercentile: formatValue(officer.complaint_percentile),
      honorableMentionCount: formatValue(officer.honorable_mention_count),
      sustainedCount: formatValue(officer.sustained_count),
      disciplineCount: formatValue(officer.discipline_count),
      honorableMentionPercentile: formatValue(officer.honorable_mention_percentile),
      trrCount: formatValue(officer.trr_count),
      majorAwardCount: formatValue(officer.major_award_count),
      trrPercentile: formatValue(get(last(percentiles), 'percentile_trr')),
      civilianComplimentCount: formatValue(officer.civilian_compliment_count),
    };
  }
);
