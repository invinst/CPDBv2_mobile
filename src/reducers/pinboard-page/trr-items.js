import { handleActions } from 'redux-actions';
import { reject, sortBy, findIndex } from 'lodash';

import {
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
} from 'actions/pinboard';

export default handleActions({
  [PINBOARD_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [REMOVE_ITEM_IN_PINBOARD_PAGE]: (state, action) => {
    const currentItems = state;
    const { id, type } = action.payload;

    if (type === 'TRR') {
      return reject(currentItems, { id: parseInt(id) });
    }
    return currentItems;
  },
  [ORDER_PINBOARD]: (state, action) => {
    const currentItems = state;
    const { ids, type } = action.payload;

    if (type === 'TRR') {
      return sortBy(currentItems, item => findIndex(ids, id => id === item.id.toString()));
    }
    return currentItems;
  },
}, []);
