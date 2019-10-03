import { createSelector } from 'reselect';
import moment from 'moment';
import { map, filter, isUndefined } from 'lodash';

import constants from 'constants';
import { extractPercentile } from 'selectors/common/percentile';
import { pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';
import { officerUrl } from 'utils/url-util';


export const getChosenCategory = (state) => state.suggestionApp.chosenCategory;
export const getActiveCategory = (state) => state.suggestionApp.activeCategory;
export const getQuery = (state) => state.suggestionApp.query;
export const queryPrefixSelector = createSelector(
  getChosenCategory,
  (chosenCategory) => constants.SEARCH_CATEGORY_PREFIXES[chosenCategory]
);

const isItemPinned = (type, id, pinboardItems) => {
  return (Object.prototype.hasOwnProperty.call(pinboardItems, type)) &&
         (pinboardItems[type].indexOf(String(id)) !== -1);
};

export const officerFormatter = (officer, pinboardItems) => ({
  id: officer.id,
  name: officer.name,
  badge: officer.badge ? `Badge #${officer.badge}` : '',
  percentile: extractPercentile(officer.percentile),
  url: officerUrl(officer.id, officer.name),
  isPinned: isItemPinned('OFFICER', officer.id, pinboardItems),
  type: 'OFFICER',
  recentItemData: officer,
});

export const officersFormatter = (officers, pinboardItems) => {
  if (!officers) {
    return { data: [] };
  }

  return {
    isShowingAll: officers.isShowingAll,
    data: officers.data.map((officer) => officerFormatter(officer, pinboardItems)),
  };
};

export const officersSelector = createSelector(
  (state) => state.suggestionApp.suggestions.OFFICER,
  pinboardItemsSelector,
  officersFormatter
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

const crFormatter = (cr, pinboardItems) => ({
  crid: cr.crid,
  url: `${constants.COMPLAINT_PATH}${cr.crid}/`,
  incidentDate: moment(cr.incident_date).format(constants.SEARCH_INCIDENT_DATE_FORMAT),
  category: cr.category,
  isPinned: isItemPinned('CR', cr.crid, pinboardItems),
  type: 'CR',
  recentItemData: cr,
});

const crsFormatter = (crs, pinboardItems) => {
  if (!crs) {
    return { data: [] };
  }

  return {
    isShowingAll: crs.isShowingAll,
    data: crs.data.map((cr) => crFormatter(cr, pinboardItems)),
  };
};

export const crsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.CR,
  pinboardItemsSelector,
  crsFormatter
);

export const dateCRsSelector = createSelector(
  (state) => state.suggestionApp.suggestions['DATE > CR'],
  pinboardItemsSelector,
  crsFormatter,
);

const trrFormatter = (trr, pinboardItems) => ({
  id: trr.id,
  url: `${constants.TRR_PATH}${trr.id}/`,
  isPinned: isItemPinned('TRR', trr.id, pinboardItems),
  type: 'TRR',
  recentItemData: trr,
});

const trrsFormatter = (trrs, pinboardItems) => {
  if (!trrs) {
    return { data: [] };
  }

  return {
    isShowingAll: trrs.isShowingAll,
    data: trrs.data.map((trr) => trrFormatter(trr, pinboardItems)),
  };
};

export const trrsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.TRR,
  pinboardItemsSelector,
  trrsFormatter
);

export const dateTRRsSelector = createSelector(
  (state) => state.suggestionApp.suggestions['DATE > TRR'],
  pinboardItemsSelector,
  trrsFormatter
);


export const suggestedSelector = createSelector(
  (state) => state.suggestionApp.initialSuggestions.suggested,
  (suggested) => suggested
);

const getRecentSuggestions = (state) => state.suggestionApp.initialSuggestions.recent.data;
export const getRecentSuggestionsRequested = (state) => state.suggestionApp.recentSuggestionsRequested;

export const recentSelector = createSelector(
  (state) => state.suggestionApp.initialSuggestions.recent,
  (recent) => recent
);

const recentItemFormatterMapping = {
  'OFFICER': officerFormatter,
  'CR': crFormatter,
  'TRR': trrFormatter,
};

export const recentSuggestionsSelector = createSelector(
  getRecentSuggestions,
  pinboardItemsSelector,
  (recent, pinboardItems) => {
    const recentData = [];
    recent.forEach((recentItem) => {
      const itemFormatter = recentItemFormatterMapping[recentItem.type];
      if (!isUndefined(itemFormatter) && !isUndefined(recentItem.data)) {
        recentData.push(itemFormatter(recentItem.data, pinboardItems));
      }
    });
    return { data: recentData };
  }
);

const RECENT_SUGGESTION_TYPES = {
  officerIds: 'OFFICER',
  crids: 'CR',
  trrIds: 'TRR',
};

export const recentSuggestionIdsSelector = createSelector(
  getRecentSuggestions,
  recentSuggestions => {
    const result = {};
    Object.keys(RECENT_SUGGESTION_TYPES).forEach((itemType) => {
      const ids = map(
        filter(recentSuggestions, (item) => item.type === RECENT_SUGGESTION_TYPES[itemType] && !isUndefined(item.id)),
        'id'
      );
      if (ids.length > 0) {
        result[itemType] = ids;
      }
    });
    return result;
  }
);

export const dateOfficersSelector = createSelector(
  (state) => state.suggestionApp.suggestions['DATE > OFFICERS'],
  pinboardItemsSelector,
  officersFormatter
);

export const investigatorCRsSelector = createSelector(
  (state) => state.suggestionApp.suggestions['INVESTIGATOR > CR'],
  pinboardItemsSelector,
  crsFormatter,
);
