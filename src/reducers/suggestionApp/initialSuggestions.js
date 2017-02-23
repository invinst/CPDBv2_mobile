import { handleActions } from 'redux-actions';
import constants from 'constants';

import {
  SUGGEST_EMPTY_TERM_REQUEST_SUCCESS,
  SUGGEST_EMPTY_TERM_REQUEST_FAILURE,
  SEARCH_CLICKED
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
  [SUGGEST_EMPTY_TERM_REQUEST_SUCCESS]: (state, action) => {
    const categories = Object.keys(action.payload);
    return {
      ...state,
      suggested: {
        data: categories.map((category) => {
          const data = action.payload[category][0];
          let type, title, url;

          switch (category) {
            case 'FAQ':
              type = 'FAQ';
              title = data.question;
              url = `${constants.FAQ_PATH}/${data.id}`;
              break;
            case 'OFFICER':
              type = 'Officer';
              title = data.name;
              url = '/search';
              break;
            case 'REPORT':
              type = 'Report';
              title = data.title;
              url = `${constants.REPORTING_PATH}/${data.id}`;
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
  [SUGGEST_EMPTY_TERM_REQUEST_FAILURE]: (state, action) => {
    return defaultState;
  },

  [SEARCH_CLICKED]: (state, action) => {
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
