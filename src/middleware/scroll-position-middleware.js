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
      // Must offset by 1px so that it doesn't activate sticky header on mount,
      // otherwise there'll be a weird bug:
      // https://www.pivotaltracker.com/story/show/142282079/comments/167707307
      instantScrollTo(constants.TOP_MARGIN - 1);
    } else {
      instantScrollToTop();
    }
  }
  return next(action);
};

export default scrollPositionMiddleware;
