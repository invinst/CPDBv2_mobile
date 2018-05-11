import { createSelector } from 'reselect';
import moment from 'moment';
import { startCase, get } from 'lodash';
import constants from 'constants';

const getOfficerSummary = (state, props) => (
  state.officerPage.summaries.data[props.params.id] || null
);

export const officerSummarySelector = createSelector(
  [getOfficerSummary],
  (summary) => {
    if (!summary) {
      return null;
    }

    const doa = summary.date_of_appt;
    let dateOfAppt = null;
    let yearsSince = null;
    if (doa) {
      dateOfAppt = moment(doa).format(constants.SIMPLE_DATE_FORMAT).toUpperCase();
      yearsSince = `${moment().diff(doa, 'years')} years`;
    }

    const complaints = summary.complaint_records;
    const unit = get(summary, 'unit', {});

    return {
      name: summary.full_name,
      unit: unit.unit_name,
      rank: summary.rank,
      badge: summary.badge,
      dateOfAppt: dateOfAppt,
      yearsSinceDateOfAppt: yearsSince,
      race: summary.race,
      sex: summary.gender,
      complaints: {
        count: complaints.count,
        sustainedCount: complaints.sustained_count,
        facets: complaints.facets.map(({ name, entries }) => ({
          name: startCase(name),
          entries
        }))
      }
    };
  }
);


const getOfficerTimeline = (state, props) => {
  const timeline = state.officerPage.timelines.data[props.params.id];
  if (!timeline) {
    return null;
  }

  const results = timeline.results.map((result) => ({
    ...result,
    date: moment(result.date).format(constants.SIMPLE_DATE_FORMAT)
  }));

  return {
    ...timeline,
    results: results
  };
};

export const officerTimelineSelector = createSelector(
  [getOfficerTimeline],
  (timeline) => timeline
);


const getCurrentTimeline = (state, props) => state.officerPage.timelines.data[props.params.id];

export const hasMoreOfficerTimelineSelector = createSelector(
  getCurrentTimeline,
  (timeline) => (!!timeline && !timeline.isRequesting && !!timeline.next)
);
