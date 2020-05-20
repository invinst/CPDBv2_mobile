import { createSelector } from 'reselect';
import { get, compact, startCase, toLower, upperFirst } from 'lodash';
import { getCurrentAge, getCareerDuration, formatDate } from 'utils/date';
import { extractLatestPercentile } from 'selectors/common/percentile';
import { cmsSelector } from 'selectors/common/cms';


const getTRR = (state, props) => state.trrPage.trrs[props.match.params.trrId];

const officerSelector = (trr) => {
  const assignedBeat = get(trr, 'officer_assigned_beat');

  return trr.officer ? ({
    ...officerTransform(trr.officer),
    assignedBeat: assignedBeat ? `Beat ${assignedBeat}` : '',
    onDuty: get(trr, 'officer_on_duty') ? 'Yes' : 'No',
    inUniform: get(trr, 'officer_in_uniform') ? 'Yes' : 'No',
  }) : {};
};

const officerTransform = (officer) => {
  const yearOld = getCurrentAge(officer['birth_year']);
  const age = yearOld ? `${yearOld} years old` : null;
  const demographic = upperFirst(compact([age, officer.race, officer.gender]).join(', ').toLowerCase());
  return {
    officerId: officer['id'],
    fullName: officer['full_name'],
    unitName: get(officer.unit, 'unit_name'),
    unitDescription: get(officer.unit, 'description'),
    demographic: `${demographic}.`,
    careerDuration: getCareerDuration(officer['appointed_date'], officer['date_of_resignation']),
    percentile: extractLatestPercentile(officer),
  };
};

const trrInfoSelector = (trr) => {
  const race = startCase(toLower(get(trr, 'subject_race')));
  const sex = startCase(toLower(get(trr, 'subject_gender')));
  const age = trr['subject_age'] ? `Age ${trr['subject_age']}` : null;
  const demographic = compact([race, sex, age]).join(', ');

  return {
    victimDemographic: demographic,
    forceTypes: get(trr, 'force_types'),
    incidentDate: formatDate(get(trr, 'date_of_incident')),
    address: get(trr, 'address'),
    beat: String(get(trr, 'beat')),
    locationType: get(trr, 'location_type'),
    point: trr.point,
  };
};

export const trrSelector = createSelector(
  [getTRR],
  trr => {
    if (!trr) return null;

    return {
      category: get(trr, 'force_category'),
      officer: officerSelector(trr),
      info: trrInfoSelector(trr),
    };
  }
);

export const getCMSRequested = state => state.trrPage.cmsRequested;

export const requestDocumentButtonMessage = state => cmsSelector(state, 'trrPage', 'document_request_instruction');

export const buttonText = () => 'Request Documents';
