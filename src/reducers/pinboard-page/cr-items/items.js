import { handleActions } from 'redux-actions';
import { every, reject, sortBy, findIndex } from 'lodash';

import {
  PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
  ADD_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
} from 'actions/pinboard';


const toRawCR = item => ({
  'crid': item.id,
  'incident_date': item.incidentDate,
  'most_common_category': item.category,
  'point': item.point,
});

export default handleActions({
  [PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [ADD_ITEM_IN_PINBOARD_PAGE]: (state, action) => {
    const currentItems = state;
    if (action.payload.type === 'CR') {
      const item = action.payload;
      if (every(currentItems, currentItem => currentItem.crid !== item.id)) {
        return currentItems.concat(toRawCR(item));
      }
    }
    return currentItems;
  },
  [REMOVE_ITEM_IN_PINBOARD_PAGE]: (state, action) => {
    const currentItems = state;
    const { id, type } = action.payload;

    if (type === 'CR') {
      return reject(currentItems, { crid: id });
    }
    return currentItems;
  },
  [ORDER_PINBOARD]: (state, action) => {
    const currentItems = state;
    const { ids, type } = action.payload;

    if (type === 'CR') {
      return sortBy(currentItems, item => findIndex(ids, id => id === item.crid));
    }
    return currentItems;
  },
}, []);
