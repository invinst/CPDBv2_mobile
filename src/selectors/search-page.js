import { createSelector } from 'reselect';
import moment from 'moment';

import constants from 'constants';
import { extractPercentile } from 'selectors/common/percentile';
import { pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';
import { officerUrl } from 'utils/url-util';


const isItemPinned = (type, id, pinboardItems) => {
  return (Object.prototype.hasOwnProperty.call(pinboardItems, type)) &&
         (pinboardItems[type].indexOf(id) !== -1);
};

export const officerFormatter = (officers, pinboardItems) => {
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
      isPinned: isItemPinned('OFFICER', officer.id, pinboardItems),
      type: 'OFFICER',
    })),
  };
};

export const officersSelector = createSelector(
  (state) => state.suggestionApp.suggestions.OFFICER,
  pinboardItemsSelector,
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

const crFormatter = (crs, pinboardItems) => {
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
      isPinned: isItemPinned('CR', cr.crid, pinboardItems),
      type: 'CR',
    })),
  };
};

export const crsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.CR,
  pinboardItemsSelector,
  crFormatter
);

export const dateCRsSelector = createSelector(
  (state) => state.suggestionApp.suggestions['DATE > CR'],
  pinboardItemsSelector,
  crFormatter,
);

const trrFormatter = (trrs, pinboardItems) => {
  if (!trrs) {
    return { data: [] };
  }

  return {
    isShowingAll: trrs.isShowingAll,
    data: trrs.data.map((trr) => ({
      id: trr.id,
      url: `${constants.TRR_PATH}${trr.id}/`,
      isPinned: isItemPinned('TRR', trr.id, pinboardItems),
      type: 'TRR',
    })),
  };
};

export const trrsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.TRR,
  pinboardItemsSelector,
  trrFormatter
);

export const dateTRRsSelector = createSelector(
  (state) => state.suggestionApp.suggestions['DATE > TRR'],
  pinboardItemsSelector,
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
  pinboardItemsSelector,
  officerFormatter
);

export const investigatorCRsSelector = createSelector(
  (state) => state.suggestionApp.suggestions['INVESTIGATOR > CR'],
  pinboardItemsSelector,
  crFormatter,
);
