import { handleActions } from 'redux-actions';
import { concat } from 'lodash';

import {
  PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
  PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS
} from 'actions/pinboard';

export default handleActions({
  [PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START]: (state, action) => [],
  [FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload['results'],
  [PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => concat(
    state, action.payload['results']
  )
}, []);
