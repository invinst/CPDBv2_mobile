import { ROUTE_CHANGED } from 'actions/navigation';
import { instantScrollToTop } from 'utils/navigation-util';

// Disable scroll restoration feature from Chrome which breaks our "scroll to
// top on initial page load" behavior
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const scrollPositionMiddleware = store => next => action => {
  if (action.type === ROUTE_CHANGED) {
    instantScrollToTop();
  }
  return next(action);
};

export default scrollPositionMiddleware;
