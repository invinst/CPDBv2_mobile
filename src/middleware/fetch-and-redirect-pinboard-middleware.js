import { LOCATION_CHANGE } from 'connected-react-router';

import browserHistory from 'utils/history';
import { getPinboard } from 'selectors/pinboard-page/pinboard';
import { pinboardsSelector } from 'selectors/common/pinboards';
import {
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
  REMOVE_PINBOARD_REQUEST_SUCCESS,
  fetchPinboard,
} from 'actions/pinboard';
import {
  dispatchFetchPinboardPinnedItems,
  dispatchFetchPinboardPageData,
  generatePinboardUrl,
  getPinboardIdFromRequestUrl,
} from 'utils/pinboard';
import { onPinboardPage } from 'utils/paths';
import { PINBOARD_PATH } from 'constants/paths';
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
        if (idOnPath === idOnStore) {
          if (!pinboard.hasPendingChanges)
            getPinboardData(store, idOnPath);
        } else {
          store.dispatch(fetchPinboard(idOnPath));
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

    if (onPinboardPage(pathname) || pathname === PINBOARD_PATH) {
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

  if (action.type === REMOVE_PINBOARD_REQUEST_SUCCESS) {
    const state = store.getState();
    const { id: currentPinboardId } = getPinboard(state);
    const removedPinboardId = getPinboardIdFromRequestUrl(action.request.url);
    if (removedPinboardId === currentPinboardId) {
      const pinboards = pinboardsSelector(state);
      if (pinboards.length > 0) {
        const newPinboardPathName = generatePinboardUrl(pinboards[0]);
        browserHistory.push(newPinboardPathName);
      } else {
        browserHistory.push(PINBOARD_PATH);
      }
    }
  }

  return result;
};
