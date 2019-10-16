import { browserHistory } from 'react-router';
import { isEmpty } from 'lodash';

import { getPinboard } from 'selectors/pinboard-page/pinboard';
import {
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  fetchPinboard,
  fetchLatestRetrievedPinboard,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardSocialGraph,
  fetchPinboardGeographic,
  fetchFirstPagePinboardGeographicCrs,
  fetchOtherPagesPinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchOtherPagesPinboardGeographicTrrs,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
} from 'actions/pinboard';
import loadPaginatedData from 'utils/load-paginated-data';
import { generatePinboardUrl } from 'utils/pinboard';

const pinboardPageUrlPattern = /.*\/pinboard\/([a-fA-F0-9]+)\/.*/;

export function getPinboardID(url) {
  if (url === undefined || !url.match(pinboardPageUrlPattern)) {
    return null;
  }
  return url.replace(pinboardPageUrlPattern, '$1');
}

function getPinboardData(store, pinboardId) {
  store.dispatch(fetchPinboardComplaints(pinboardId));
  store.dispatch(fetchPinboardOfficers(pinboardId));
  store.dispatch(fetchPinboardTRRs(pinboardId));
  store.dispatch(fetchPinboardSocialGraph(pinboardId));
  store.dispatch(fetchPinboardGeographic());
  loadPaginatedData(
    { 'pinboard_id': pinboardId },
    fetchFirstPagePinboardGeographicCrs,
    fetchOtherPagesPinboardGeographicCrs,
    store,
  );
  loadPaginatedData(
    { 'pinboard_id': pinboardId },
    fetchFirstPagePinboardGeographicTrrs,
    fetchOtherPagesPinboardGeographicTrrs,
    store,
  );
  store.dispatch(fetchPinboardRelevantDocuments(pinboardId));
  store.dispatch(fetchPinboardRelevantCoaccusals(pinboardId));
  store.dispatch(fetchPinboardRelevantComplaints(pinboardId));
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
          getPinboardData(store, idOnPath);
        }
      }
    } else if (!pinboard.isPinboardRestored && isEmpty(action.payload.query)) {
      store.dispatch(fetchLatestRetrievedPinboard({ create: pathname === '/pinboard/' }));
    }
  }

  if (
    action.type === PINBOARD_FETCH_REQUEST_SUCCESS ||
    action.type === PINBOARD_CREATE_REQUEST_SUCCESS ||
    action.type === PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS
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
