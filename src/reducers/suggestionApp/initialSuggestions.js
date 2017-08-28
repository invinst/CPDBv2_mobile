import { handleActions } from 'redux-actions';
import constants from 'constants';

import {
  FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS,
  FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE,
  SEARCH_SAVE_TO_RECENT
} from 'actions/suggestion';

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
        data: categories.filter(category => !!action.payload[category][0]).map((category) => {
          const data = action.payload[category][0];
          let type, title, url;

          switch (category) {
            case 'FAQ':
              type = 'FAQ';
              title = data.question;
              url = `${constants.FAQ_PATH}${data.id}/`;
              break;
            case 'OFFICER':
              type = 'Officer';
              title = data.name;
              url = `${constants.OFFICER_PATH}${data.id}/`;
              break;
            case 'REPORT':
              type = 'Report';
              title = data.title;
              url = `${constants.REPORTING_PATH}${data.id}/`;
              break;
            case 'UNIT':
              type = 'Unit';
              title = data.text;
              url = data.url;
              break;
          }

          return {
            type: type,
            url: url,
            title: title
          };
        })
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
