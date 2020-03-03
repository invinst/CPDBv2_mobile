import { LOCATION_CHANGE } from 'connected-react-router';

import { hasToastsSelector } from 'selectors/toast';
import { fetchToast } from 'actions/toast';

const fetchToastMiddleware = store => next => action => {
  const result = next(action);

  if (action.type === LOCATION_CHANGE) {
    const state = store.getState();

    if (!hasToastsSelector(state)) {
      store.dispatch(fetchToast());
    }
  }

  return result;
};

export default fetchToastMiddleware;
