import { ROUTE_CHANGED } from 'actions/navigation';
import { instantScrollToTop, instantScrollTo } from 'utils/NavigationUtil';
import constants from 'constants';

// Disable scroll restoration feature from Chrome which breaks our "scroll to
// top on initial page load" behavior
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const scrollPositionMiddleware = store => next => action => {
  if (action.type === ROUTE_CHANGED) {
    const newPathname = action.payload;
    if (newPathname === 'search/') {
      instantScrollTo(constants.TOP_MARGIN);
    } else {
      instantScrollToTop();
    }
  }
  return next(action);
};

export default scrollPositionMiddleware;
