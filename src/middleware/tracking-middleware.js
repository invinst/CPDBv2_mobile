import { LOCATION_CHANGE } from 'connected-react-router';

import browserHistory from 'utils/history';
import {
  PINBOARD_FETCH_REQUEST_SUCCESS,
  viewPinboard,
} from 'actions/pinboard';
import { onPinboardPage } from 'utils/paths';
import { getPinboardID } from 'middleware/fetch-and-redirect-pinboard-middleware';
import { getPinboard } from 'selectors/pinboard-page/pinboard';


export default store => next => action => {
  const result = next(action);
  if (action.type === PINBOARD_FETCH_REQUEST_SUCCESS) {
    const pathname = browserHistory.location.pathname;
    if (onPinboardPage(pathname)) {
      store.dispatch(viewPinboard(action.payload.id));
    }
  }

  if (action.type === LOCATION_CHANGE) {
    const pathname = action.payload.location.pathname;
    if (onPinboardPage(pathname)) {
      const idOnPath = getPinboardID(action.payload.location.pathname);
      const idOnStore = getPinboard(store.getState()).id;
      if (idOnPath === idOnStore) {
        store.dispatch(viewPinboard(idOnStore));
      }
    }
  }

  return result;
};
