import { browserHistory } from 'react-router';

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

const pinboardPageUrlPattern = /.*\/pinboard\/([a-fA-F0-9]+)\/.*/;

export function getPinboardID(url) {
  if (url === undefined || !url.match(pinboardPageUrlPattern)) {
    return null;
  }
  return url.replace(pinboardPageUrlPattern, '$1');
}

function getPinboardData(store, pinboardId) {
  dispatchFetchPinboardPinnedItems(store, pinboardId);
  dispatchFetchPinboardPageData(store, pinboardId);
}

export default store => next => action => {
  const result = next(action);

  if (action.type === '@@router/LOCATION_CHANGE') {
    const pathname = action.payload.pathname;
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
    const pathname = browserHistory.getCurrentLocation().pathname;
    const onPinboardPage = pathname.match(pinboardPageUrlPattern) || pathname === '/pinboard/';

    if (onPinboardPage) {
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
