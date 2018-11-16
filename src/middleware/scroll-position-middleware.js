import { compact, isEqual } from 'lodash';

import { ROUTE_CHANGED } from 'actions/navigation';
import { instantScrollToTop } from 'utils/navigation-util';

// Disable scroll restoration feature from Chrome which breaks our "scroll to
// top on initial page load" behavior
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function getPathSegments(pathname, limit) {
  return compact(pathname.split('/')).slice(0, limit)
}

const scrollPositionMiddleware = store => next => action => {
  if (action.type === ROUTE_CHANGED) {
    const pathFromSegments = getPathSegments(action.payload.from, 2);
    const pathToSegments = getPathSegments(action.payload.to, 2);

    const isOnSamePage = pathFromSegments[0] === 'officer' && isEqual(pathFromSegments, pathToSegments);

    if (!isOnSamePage) {
      instantScrollToTop();
    }
  }
  return next(action);
};

export default scrollPositionMiddleware;
