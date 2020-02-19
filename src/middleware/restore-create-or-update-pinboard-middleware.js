import { Promise } from 'es6-promise';
import { get, keys, isNil, isEmpty, identity, noop, toLower, camelCase, startsWith } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';

import browserHistory from 'utils/history';
import config from 'config';
import {
  ADD_OR_REMOVE_ITEM_IN_PINBOARD,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ADD_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
  SAVE_PINBOARD,
  UPDATE_PINBOARD_INFO,
  createPinboard,
  updatePinboard,
  fetchLatestRetrievedPinboard,
  addItemToPinboardState,
  removeItemFromPinboardState,
  orderPinboardState,
  savePinboard,
  updatePinboardInfoState,
  performFetchPinboardRelatedData,
} from 'actions/pinboard';
import {
  dispatchFetchPinboardPageData,
  dispatchFetchPinboardPinnedItems,
  isEmptyPinboard,
  getRequestPinboard,
} from 'utils/pinboard';
import {
  showInvalidParamToasts,
  showAddOrRemoveItemToast,
  showCreatedToasts,
  showPinboardToast,
  showAlertToast,
} from 'utils/toast';
import { Toastify } from 'utils/toastify';
import queryString from 'query-string';


const getIds = (query, key) => get(query, key, '').split(',').filter(identity);
const isParam = (param, validators) => validators.includes(toLower(camelCase(param)));

const getPinboardFromQuery = (query) => {
  const invalidParams = [];
  const pinboardFromQuery = {
    officerIds: [],
    crids: [],
    trrIds: [],
  };
  keys(query).forEach(param => {
    if (isParam(param, ['officerid', 'officerids'])) {
      pinboardFromQuery.officerIds = getIds(query, param).map(id => parseInt(id));
    } else if (isParam(param, ['crid', 'crids'])) {
      pinboardFromQuery.crids = getIds(query, param);
    } else if (isParam(param, ['trrid', 'trrids'])) {
      pinboardFromQuery.trrIds = getIds(query, param).map(id => parseInt(id));
    } else {
      invalidParams.push(param);
    }
  });
  return { pinboardFromQuery, invalidParams };
};

const RETRY_DELAY = config.requestRetryDelay || 1000;
const MAX_RETRIES = 60;
let retries = 0;

const CONNECTION_RETRY_DELAY = 100;
const MAX_CONNECTION_RETRIES = 3;
let internetConnectionRetries = 0;
let reconnectingToastId;

function handleConnectionLostOrRetry(store) {
  if (window.navigator.onLine) {
    if (retries < MAX_RETRIES) {
      retries += 1;
      setTimeout(() => store.dispatch(savePinboard()), RETRY_DELAY);
    } else {
      retries = 0;
      showAlertToast(
        'Failed to save pinboard. Click to try again!',
        () => store.dispatch(savePinboard())
      );
    }
  } else if (!reconnectingToastId) {
    if (internetConnectionRetries < MAX_CONNECTION_RETRIES) {
      internetConnectionRetries += 1;
      setTimeout(() => store.dispatch(savePinboard()), CONNECTION_RETRY_DELAY);
    } else {
      retries = 0;
      internetConnectionRetries = 0;
      reconnectingToastId = showAlertToast(
        'Connection lost. Trying to save ...',
        () => resumeSavingPinboard(store)
      );
    }
  }
}

function resumeSavingPinboard(store) {
  if (reconnectingToastId) {
    store.dispatch(savePinboard());
    reconnectingToastId && Toastify.toast.dismiss(reconnectingToastId);
    reconnectingToastId = undefined;
  }
}

function dispatchUpdateOrCreatePinboard(store, currentPinboard, successCallBack=noop) {
  const updateOrCreatePinboard = isNil(currentPinboard.id) ? createPinboard : updatePinboard;
  store.dispatch(updateOrCreatePinboard(currentPinboard)).then(result => {
    retries = 0;
    store.dispatch(savePinboard(result.payload));
    successCallBack(result.payload);
  }).catch(() => handleConnectionLostOrRetry(store));
}

export default store => next => {
  window.addEventListener('online', () => resumeSavingPinboard(store));
  return action => {
    if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD || action.type === ADD_ITEM_IN_PINBOARD_PAGE) {
      const addOrRemove = action.payload.isPinned ? removeItemFromPinboardState : addItemToPinboardState;
      Promise.all([store.dispatch(addOrRemove(action.payload))]).finally(() => {
        store.dispatch(savePinboard());
        if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD) {
          showAddOrRemoveItemToast(store, action.payload);
        }
      });
    }

    if (action.type === REMOVE_ITEM_IN_PINBOARD_PAGE) {
      Promise.all([store.dispatch(removeItemFromPinboardState(action.payload))]).finally(() => {
        store.dispatch(savePinboard());
      });
    }

    if (action.type === UPDATE_PINBOARD_INFO) {
      Promise.all([store.dispatch(updatePinboardInfoState(action.payload))]).finally(() => {
        store.dispatch(savePinboard());
      });
    }

    if (action.type === ORDER_PINBOARD) {
      Promise.all([store.dispatch(orderPinboardState(action.payload))]).finally(() => {
        store.dispatch(savePinboard());
      });
    }

    if (action.type === SAVE_PINBOARD) {
      const state = store.getState();
      const pinboard = state.pinboardPage.pinboard;
      const currentPinboard = getRequestPinboard(pinboard);
      const pinboardId = currentPinboard.id;

      if (!pinboard.saving) {
        if (pinboard.hasPendingChanges) {
          dispatchUpdateOrCreatePinboard(store, currentPinboard);
        } else {
          if (startsWith(browserHistory.location.pathname, '/pinboard/') && pinboardId) {
            if (!state.pinboardPage.pinnedItemsRequested) {
              dispatchFetchPinboardPinnedItems(store, pinboardId);
            }
            if (pinboard.needRefreshData) {
              store.dispatch(performFetchPinboardRelatedData());
              dispatchFetchPinboardPageData(store, pinboardId);
            }
          }
        }
      }
    }

    if (action.type === LOCATION_CHANGE) {
      const state = store.getState();
      const pinboard = state.pinboardPage.pinboard;

      const onPinboardPage = action.payload.location.pathname.match(/\/pinboard\//);
      const hasPinboardId = action.payload.location.pathname.match(/\/pinboard\/[a-fA-F0-9]+\//);
      if (onPinboardPage && !hasPinboardId && !pinboard.hasPendingChanges) {
        const query = queryString.parse(action.payload.location.search);
        const { pinboardFromQuery, invalidParams } = getPinboardFromQuery(query);
        isEmpty(invalidParams) || showInvalidParamToasts(invalidParams);

        if (!isEmptyPinboard(pinboardFromQuery))
          dispatchUpdateOrCreatePinboard(store, pinboardFromQuery, showCreatedToasts);
        else {
          isEmpty(action.payload.location.search) || showPinboardToast('Redirected to latest pinboard.');
          store.dispatch(fetchLatestRetrievedPinboard({ create: true }));
        }
      } else if (!state.pinboardPage.pinboard.isPinboardRestored && !onPinboardPage) {
        store.dispatch(fetchLatestRetrievedPinboard({ create: false }));
      }
    }

    return next(action);
  };
};
