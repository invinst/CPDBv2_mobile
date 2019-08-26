import { reduce, values } from 'lodash';

import { ROUTE_CHANGED } from 'actions/navigation';
import { SEARCH_QUERY_CHANGED, SUGGEST_ALL_REQUEST_SUCCESS, SUGGESTION_REQUEST_SUCCESS } from 'actions/suggestion';
import * as GATracking from 'utils/google_analytics_tracking';


const EVENTS = {
  [ROUTE_CHANGED]: (store, action) => {
    GATracking.trackPageView(action.payload.to);
  },

  [SEARCH_QUERY_CHANGED]: (store, action) => {
    GATracking.trackSearchQuery(action.payload);
  },

  [SUGGEST_ALL_REQUEST_SUCCESS]: (store, action) => {
    const category = Object.keys(action.payload)[0];
    GATracking.trackSearchResultsCount(action.payload[category].length);
  },

  [SUGGESTION_REQUEST_SUCCESS]: (store, action) => {
    const count = reduce(values(action.payload), (sum, array) => sum + array.length, 0);
    GATracking.trackSearchResultsCount(count);
  },
};

const trackingMiddleware = store => next => action => {
  if (Object.prototype.hasOwnProperty.call(EVENTS, action.type)) {
    EVENTS[action.type](store, action);
  }

  return next(action);
};

export default trackingMiddleware;
