import { handleActions } from 'redux-actions';
import { every, reject, sortBy, findIndex, parseInt } from 'lodash';

import {
  PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
  ADD_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
} from 'actions/pinboard';


const toRawOfficer = (item) => {
  const { id, fullName, percentile, rank, complaintCount } = item;
  let rawPercentile = null;
  if (percentile && percentile.items) {
    rawPercentile = {
      'percentile_trr': percentile.items[0].value,
      'percentile_allegation_internal': percentile.items[1].value,
      'percentile_allegation_civilian': percentile.items[2].value,
    };
  }

  return {
    'id': parseInt(id),
    'full_name': fullName,
    rank,
    'complaint_count': complaintCount,
    ...rawPercentile,
  };
};

export default handleActions({
  [PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [ADD_ITEM_IN_PINBOARD_PAGE]: (state, action) => {
    const currentItems = state;
    if (action.payload.type === 'OFFICER') {
      const item = action.payload;
      if (every(currentItems, currentItem => currentItem.id !== parseInt(item.id))) {
        return currentItems.concat(toRawOfficer(item));
      }
    }
    return currentItems;
  },
  [REMOVE_ITEM_IN_PINBOARD_PAGE]: (state, action) => {
    const currentItems = state;
    const { id, type } = action.payload;

    if (type === 'OFFICER') {
      return reject(currentItems, { id: parseInt(id) });
    }
    return currentItems;
  },
  [ORDER_PINBOARD]: (state, action) => {
    const currentItems = state;
    const { ids, type } = action.payload;

    if (type === 'OFFICER') {
      return sortBy(currentItems, item => findIndex(ids, id => id === item.id.toString()));
    }
    return currentItems;
  },
}, []);
