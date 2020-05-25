import { LOCATION_CHANGE } from 'connected-react-router';

import browserHistory from 'utils/history';
import { getPinboard } from 'selectors/pinboard-page/pinboard';
import {
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
  fetchPinboard,
} from 'actions/pinboard';
import {
  dispatchFetchPinboardPinnedItems,
  dispatchFetchPinboardPageData,
  generatePinboardUrl,
} from 'utils/pinboard';
import { onPinboardPage } from 'utils/paths';
import { PINBOARD_PAGE_PATTERN } from 'constants/paths';


export function getPinboardID(url) {
  if (url === undefined || !url.match(PINBOARD_PAGE_PATTERN)) {
    return null;
  }
  return url.replace(PINBOARD_PAGE_PATTERN, '$1');
}

function getPinboardData(store, pinboardId) {
  dispatchFetchPinboardPinnedItems(store, pinboardId);
  dispatchFetchPinboardPageData(store, pinboardId);
}

export default store => next => action => {
  const result = next(action);

  if (action.type === LOCATION_CHANGE) {
    const pathname = action.payload.location.pathname;
    const idOnPath = getPinboardID(pathname);
    const state = store.getState();
    const pinboard = getPinboard(state);

    if (idOnPath) {
      if (action.payload.action !== 'REPLACE') {
        const idOnStore = pinboard.id;
        if (idOnPath !== idOnStore) {
          store.dispatch(fetchPinboard(idOnPath));
        } else {
          if (!pinboard.hasPendingChanges)
            getPinboardData(store, idOnPath);
        }
      }
    }
  }

  if (
    action.type === PINBOARD_FETCH_REQUEST_SUCCESS ||
    action.type === PINBOARD_CREATE_REQUEST_SUCCESS ||
    action.type === PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS ||
    action.type === PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS
  ) {
    const pathname = browserHistory.location.pathname;

    if (onPinboardPage(pathname) || pathname === '/pinboard/') {
      const rawPinboard = action.payload;
      const newPinboardId = rawPinboard.id;
      if (newPinboardId) {
        const newPinboardPathName = generatePinboardUrl(rawPinboard);

        if (pathname !== newPinboardPathName) {
          browserHistory.replace(newPinboardPathName);
        }
        getPinboardData(store, newPinboardId);
      }
    }
  }

  return result;
};
