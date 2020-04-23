import { createSelector } from 'reselect';
import moment from 'moment';
import { get, map, filter, isUndefined, isEmpty, forEach } from 'lodash';

import constants from 'constants';
import { COMPLAINT_PATH, TRR_PATH } from 'constants/paths';
import { PIN_BUTTON_INTRODUCTION_INDEX } from 'constants';
import { extractPercentile } from 'selectors/common/percentile';
import { isItemPinned, pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';
import { officerUrl } from 'utils/url-util';
import extractQuery from 'utils/extract-query';


export const getChosenCategory = (state) => state.suggestionApp.chosenCategory;
export const getActiveCategory = (state) => state.suggestionApp.activeCategory;
export const getQuery = (state) => state.suggestionApp.query;
const getPagination = state => state.suggestionApp.pagination;
export const getCancelPathname = state => state.suggestionApp.cancelPathname;

export const queryPrefixSelector = createSelector(
  getChosenCategory,
  (chosenCategory) => constants.SEARCH_CATEGORY_PREFIXES[chosenCategory]
);

export const officerFormatter = (officer, pinboardItems) => ({
  id: officer.id,
  name: officer.name,
  badge: officer.badge ? `Badge #${ officer.badge }` : '',
  percentile: extractPercentile(officer.percentile),
  url: officerUrl(officer.id, officer.name),
  isPinned: isItemPinned('OFFICER', officer.id, pinboardItems),
  type: constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER,
  recentItemData: officer,
});

export const officersFormatter = (officers, pinboardItems) =>
  map(officers, (officer) => officerFormatter(officer, pinboardItems));

export const officersSelector = createSelector(
  (state) => state.suggestionApp.suggestions.OFFICER,
  pinboardItemsSelector,
  officersFormatter
);

export const unitsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.UNIT,
  (units) => map(units, (unit) => ({
    id: unit.id,
    text: unit.text,
    url: unit.url,
    memberCount: unit.member_count,
    activeMemberCount: unit.active_member_count,
  })),
);

const crFormatter = (cr, pinboardItems) => ({
  crid: cr.crid,
  id: cr.crid,
  url: `${COMPLAINT_PATH}${cr.crid}/`,
  incidentDate: moment(cr.incident_date).format(constants.SEARCH_INCIDENT_DATE_FORMAT),
  category: cr.category,
  isPinned: isItemPinned('CR', cr.crid, pinboardItems),
  type: constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.CR,
  recentItemData: cr,
});

const crsFormatter = (crs, pinboardItems) =>
  map(crs, (cr) => crFormatter(cr, pinboardItems));

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
  url: `${ TRR_PATH }${ trr.id }/`,
  isPinned: isItemPinned('TRR', trr.id, pinboardItems),
  type: constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.TRR,
  recentItemData: trr,
});

const trrsFormatter = (trrs, pinboardItems) =>
  map(trrs, (trr) => trrFormatter(trr, pinboardItems));

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

const getRecentSuggestions = (state) => state.suggestionApp.recentSuggestions;
export const getRecentSuggestionsRequested = (state) => state.suggestionApp.recentSuggestionsRequested;

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
    return recentData;
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

export const isShowingSingleContentTypeSelector = createSelector(
  getChosenCategory,
  chosenCategory => !isEmpty(chosenCategory)
);

export const hasMoreSelector = createSelector(
  isShowingSingleContentTypeSelector,
  getPagination,
  (singleContent, { next }) => (singleContent && !!next)
);

export const nextParamsSelector = createSelector(
  getPagination,
  ({ next }) => (extractQuery(next))
);

const isLongEnoughQuery = query => typeof query === 'string' && query.length >= 2;

const suggestionGroupsSelector = createSelector(
  officersSelector,
  dateCRsSelector,
  investigatorCRsSelector,
  dateTRRsSelector,
  dateOfficersSelector,
  crsSelector,
  trrsSelector,
  (officers, dateCRs, investigatorCRs, dateTRRs, dateOfficers, crs, trrs) => ({
    officers: officers || [],
    dateCRs: dateCRs || [],
    investigatorCRs: investigatorCRs || [],
    dateTRRs: dateTRRs || [],
    dateOfficers: dateOfficers || [],
    crs: crs || [],
    trrs: trrs || [],
  })
);

const showIntroductionTransform = (categories) => {
  let hasFirstIntroduction = false;
  return map(categories, ({ items, ...remain }) => {
    const showIntroduction = !hasFirstIntroduction
      && !isUndefined(constants.PINBOARD_PAGE.PINNED_ITEM_TYPES[remain.path]);
    if (showIntroduction) {
      hasFirstIntroduction = true;
    }
    const pinButtonIntroductionIndex = Math.min(items.length, PIN_BUTTON_INTRODUCTION_INDEX) - 1;
    return {
      ...remain,
      items: map(items, (item, index) => ({
        ...item,
        showIntroduction: showIntroduction && (index === pinButtonIntroductionIndex),
      })),
    };
  });
};

export const categoriesSelector = createSelector(
  getQuery,
  getChosenCategory,
  recentSuggestionsSelector,
  suggestionGroupsSelector,
  (query, chosenCategory, recentSuggestions, suggestionGroups) => {
    let categories = [];

    if (!isLongEnoughQuery(query)) {
      if (!isEmpty(recentSuggestions)) {
        categories = [{
          name: 'RECENT',
          id: 'recent',
          items: recentSuggestions,
          showAllButton: false,
        }];
      }
    } else if (chosenCategory !== '') {
      const category = constants.SEARCH_CATEGORIES.filter(cat => cat.id === chosenCategory)[0];
      categories = [{
        ...category,
        items: get(suggestionGroups, category.id, []),
        showAllButton: false,
      }];
    } else {
      categories = constants.SEARCH_CATEGORIES.map((cat) => ({
        ...cat,
        items: get(suggestionGroups, cat.id, []).slice(0, 5),
        showAllButton: true,
      })).filter(cat => !isEmpty(cat.items));
    }

    let itemRankCounter = 1;
    forEach(categories, category => forEach(category.items, item => item.itemRank = itemRankCounter++));
    return showIntroductionTransform(categories);
  }
);
