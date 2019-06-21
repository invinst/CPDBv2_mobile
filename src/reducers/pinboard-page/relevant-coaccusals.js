import { reject } from 'lodash';

import createPaginationReducer from './common/pagination';
import {
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
  ADD_ITEM_TO_PINBOARD_STATE,
} from 'actions/pinboard';

const customItemsHandler = {
  [ADD_ITEM_TO_PINBOARD_STATE]: (state, action) => {
    const { type, id } = action.payload;

    if (type === 'OFFICER') {
      return reject(state, { id: parseInt(id) });
    } else
      return state;
  },
};

export default createPaginationReducer(
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
  customItemsHandler
);
