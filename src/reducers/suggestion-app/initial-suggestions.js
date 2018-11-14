import { handleActions } from 'redux-actions';

import {
  FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS,
  FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE,
  SEARCH_SAVE_TO_RECENT
} from 'actions/suggestion';
import { officerUrl } from 'utils/url-util';

const defaultState = {
  recent: {
    data: []
  },
  suggested: {
    data: []
  }
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
            title: title
          });
          return acc;
        }, [])
      }
    };
  },
  [FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE]: (state, action) => {
    return defaultState;
  },

  [SEARCH_SAVE_TO_RECENT]: (state, action) => {
    const newData = state.recent.data.filter((datum) => {
      return datum.type !== action.payload.type;
    });
    newData.push(action.payload);
    return {
      ...state,
      recent: {
        data: newData
      }
    };
  }

}, defaultState);
