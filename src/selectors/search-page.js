import { createSelector } from 'reselect';

import constants from 'constants';
import { extractPercentile } from 'selectors/common/percentile';


export const officersSelector = createSelector(
  (state) => state.suggestionApp.suggestions.OFFICER,
  (officers) => {
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
        url: `${constants.OFFICER_PATH}${officer.id}/`
      }))
    };
  }
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
      }))
    };
  }
);

export const crsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.CR,
  (crs) => {
    if (!crs) {
      return { data: [] };
    }

    return {
      isShowingAll: crs.isShowingAll,
      data: crs.data.map((cr) => ({
        crid: cr.crid,
        url: `${constants.COMPLAINT_PATH}${cr.crid}/`
      }))
    };
  }
);

export const trrsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.TRR,
  (trrs) => {
    if (!trrs) {
      return { data: [] };
    }

    return {
      isShowingAll: trrs.isShowingAll,
      data: trrs.data.map((trr) => ({
        id: trr.id,
        url: `${constants.TRR_PATH}${trr.id}/`
      }))
    };
  }
);


export const suggestedSelector = createSelector(
  (state) => state.suggestionApp.initialSuggestions.suggested,
  (suggested) => suggested
);


export const recentSelector = createSelector(
  (state) => state.suggestionApp.initialSuggestions.recent,
  (recent) => recent
);
