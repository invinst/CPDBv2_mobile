import { handleActions } from 'redux-actions';
import { find } from 'lodash';

import {
  FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS,
  FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE,
  FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
  SEARCH_SAVE_TO_RECENT,
} from 'actions/suggestion';
import { officerUrl } from 'utils/url-util';

const defaultState = {
  recent: {
    data: [],
  },
  suggested: {
    data: [],
  },
};

export const RECENT_SEARCH_COMPONENT_TYPE_MAPPING = {
  'DATE > OFFICERS': 'OFFICER',
  'DATE > CR': 'CR',
  'INVESTIGATOR > CR': 'CR',
  'DATE > TRR': 'TRR',
};

const matchRecentItem = (item, recentItem) => {
  return item.type === recentItem.type && String(item.id) === String(recentItem.id);
};

export default handleActions({
  [FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS]: (state, action) => {
    const categories = Object.keys(action.payload);
    return {
      ...state,
      suggested: {
        data: categories.reduce((acc, category) => {
          if (!action.payload[category][0]) {
            return acc;
          }

          const data = action.payload[category][0];
          let type, title, url;

          switch (category) {
            case 'OFFICER':
              type = 'Officer';
              title = data.name;
              url = officerUrl(data.id, data.name);
              break;
            case 'UNIT':
              type = 'Unit';
              title = data.text;
              url = data.url;
              break;
          }

          if (!type) {
            return acc;
          }

          acc.push({
            type: type,
            url: url,
            title: title,
          });
          return acc;
        }, []),
      },
    };
  },
  [FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE]: (state, action) => {
    return {
      ...state,
      suggested: {
        data: [],
      },
    };
  },

  [SEARCH_SAVE_TO_RECENT]: (state, action) => {
    const recentItem = action.payload;
    recentItem.type = RECENT_SEARCH_COMPONENT_TYPE_MAPPING[recentItem.type] || recentItem.type;

    const newData = state.recent.data.filter((datum) => {
      return datum.type !== recentItem.type;
    });
    newData.unshift(recentItem);

    return {
      ...state,
      recent: {
        data: newData,
      },
    };
  },

  [FETCH_RECENT_SEARCH_ITEMS_SUCCESS]: (state, action) => {
    const newData = state.recent.data.map((recentItem) => {
      recentItem.data = find(action.payload, (item) => matchRecentItem(item, recentItem));
      return recentItem;
    });

    return {
      ...state,
      recent: {
        data: newData,
      },
    };
  },
}, defaultState);
