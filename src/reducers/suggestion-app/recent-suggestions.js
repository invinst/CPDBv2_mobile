import { handleActions } from 'redux-actions';
import { find } from 'lodash';

import {
  FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
  SEARCH_SAVE_TO_RECENT,
} from 'actions/suggestion';


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
  [SEARCH_SAVE_TO_RECENT]: (state, action) => {
    const recentItem = action.payload;
    recentItem.type = RECENT_SEARCH_COMPONENT_TYPE_MAPPING[recentItem.type] || recentItem.type;

    const newData = state.filter((datum) => {
      return datum.type !== recentItem.type;
    });
    newData.unshift(recentItem);
    return newData;
  },

  [FETCH_RECENT_SEARCH_ITEMS_SUCCESS]: (state, action) => {
    return state.map((recentItem) => {
      recentItem.data = find(action.payload, (item) => matchRecentItem(item, recentItem));
      return recentItem;
    });
  },
}, []);
