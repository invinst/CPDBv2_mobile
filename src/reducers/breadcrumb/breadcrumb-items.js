import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';
import { get, concat, slice, findIndex } from 'lodash';

import { getPathNameKey } from 'utils/paths';

export default handleActions({
  [LOCATION_CHANGE]: (state, action) => {
    let pathname = get(action.payload, 'location.pathname');

    if (pathname) {
      if (pathname === '/') {
        return [];
      }
      const itemIndex = findIndex(state, item => item.includes(getPathNameKey(pathname)));
      if (itemIndex >= 0) {
        return slice(state, 0, itemIndex + 1);
      }
      return concat(state, pathname);
    }
    return state;
  },
}, []);
