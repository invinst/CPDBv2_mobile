import { createSelector } from 'reselect';
import moment from 'moment';

import constants from 'constants';
import { extractPercentile } from 'selectors/common/percentile';
import { officerUrl } from 'utils/url-util';


export const getChosenCategory = (state) => state.suggestionApp.chosenCategory;
export const getActiveCategory = (state) => state.suggestionApp.activeCategory;
export const getQuery = (state) => state.suggestionApp.query;
export const queryPrefixSelector = createSelector(
  getChosenCategory,
  (chosenCategory) => constants.SEARCH_CATEGORY_PREFIXES[chosenCategory]
);

export const officerFormatter = (officers) => {
  if (!officers) {
    return { data: [] };
  }

  return {
    isShowingAll: officers.isShowingAll,
    data: officers.data.map((officer) => ({
      id: officer.id,
      name: officer.name,
      badge: officer.badge ? `Badge #${officer.badge}` : '',
      percentile: extractPercentile(officer.percentile),
      url: officerUrl(officer.id, officer.name),
    })),
  };
};

export const officersSelector = createSelector(
  (state) => state.suggestionApp.suggestions.OFFICER,
  officerFormatter
);

export const unitsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.UNIT,
  (units) => {
    if (!units) {
      return { data: [] };
    }

    return {
      isShowingAll: units.isShowingAll,
      data: units.data.map((unit) => ({
        id: unit.id,
        text: unit.text,
        url: unit.url,
        memberCount: unit.member_count,
        activeMemberCount: unit.active_member_count,
      })),
    };
  }
);

const crFormatter = (crs) => {
  if (!crs) {
    return { data: [] };
  }

  return {
    isShowingAll: crs.isShowingAll,
    data: crs.data.map((cr) => ({
      crid: cr.crid,
      url: `${constants.COMPLAINT_PATH}${cr.crid}/`,
      incidentDate: moment(cr.incident_date).format(constants.SEARCH_INCIDENT_DATE_FORMAT),
      category: cr.category,
    })),
  };
};

export const crsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.CR,
  crFormatter
);

export const dateCRsSelector = createSelector(
  (state) => state.suggestionApp.suggestions['DATE > CR'],
  crFormatter
);

const trrFormatter = (trrs) => {
  if (!trrs) {
    return { data: [] };
  }

  return {
    isShowingAll: trrs.isShowingAll,
    data: trrs.data.map((trr) => ({
      id: trr.id,
      url: `${constants.TRR_PATH}${trr.id}/`,
    })),
  };
};

export const trrsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.TRR,
  trrFormatter
);

export const dateTRRsSelector = createSelector(
  (state) => state.suggestionApp.suggestions['DATE > TRR'],
  trrFormatter
);


export const suggestedSelector = createSelector(
  (state) => state.suggestionApp.initialSuggestions.suggested,
  (suggested) => suggested
);


export const recentSelector = createSelector(
  (state) => state.suggestionApp.initialSuggestions.recent,
  (recent) => recent
);

export const dateOfficersSelector = createSelector(
  (state) => state.suggestionApp.suggestions['DATE > OFFICERS'],
  officerFormatter
);

export const investigatorCRsSelector = createSelector(
  (state) => state.suggestionApp.suggestions['INVESTIGATOR > CR'],
  crFormatter
);
