import { browserHistory } from 'react-router';

import { getPinboard } from 'selectors/pinboard-page/pinboard';
import {
  PINBOARD_FETCH_REQUEST_SUCCESS,
  fetchLatestRetrievedPinboard,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardSocialGraph,
  fetchPinboardGeographicData,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints
} from 'actions/pinboard';
import { getPathname } from 'selectors/common/routing';

const pinboardPageUrlPattern = /\/pinboard\/[a-fA-F0-9]+\//;

export default store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const notOnPinboardPage = !action.payload.pathname.match(pinboardPageUrlPattern);
    if (notOnPinboardPage) {
      const state = store.getState();
      const pinboard = getPinboard(state);
      if (!pinboard.isPinboardRestored)
        store.dispatch(fetchLatestRetrievedPinboard());
    }
  }

  if (action.type === PINBOARD_FETCH_REQUEST_SUCCESS) {
    const state = store.getState();
    const prevID = getPinboard(state).id;
    const currID = action.payload.id;
    const onPinboardPage = getPathname(state).match(pinboardPageUrlPattern);
    if (prevID !== currID && onPinboardPage) {
      browserHistory.replace(`/pinboard/${currID}/`);
    }

    if (onPinboardPage) {
      store.dispatch(fetchPinboardComplaints(currID));
      store.dispatch(fetchPinboardOfficers(currID));
      store.dispatch(fetchPinboardTRRs(currID));
      store.dispatch(fetchPinboardSocialGraph(currID));
      store.dispatch(fetchPinboardGeographicData(currID));
      store.dispatch(fetchPinboardRelevantDocuments(currID));
      store.dispatch(fetchPinboardRelevantCoaccusals(currID));
      store.dispatch(fetchPinboardRelevantComplaints(currID));
    }
  }

  return next(action);
};
