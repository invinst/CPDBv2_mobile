import * as _ from 'lodash';

import { ADD_ITEM_TO_PINBOARD, REMOVE_ITEM_IN_PINBOARD_PAGE } from 'actions/pinboard';
import { getPinboard } from 'selectors/pinboard';
import {
  createPinboard,
  updatePinboard,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardSocialGraph,
  fetchPinboardGeographicData,
} from 'actions/pinboard';

const PINBOARD_ATTR_MAP = {
  'CR': 'crids',
  'OFFICER': 'officerIds',
  'TRR': 'trrIds',
};

const PINBOARD_FETCH_SELECTED_MAP = {
  'CR': fetchPinboardComplaints,
  'OFFICER': fetchPinboardOfficers,
  'TRR': fetchPinboardTRRs,
};


const addItem = (pinboard, item) => {
  const key = PINBOARD_ATTR_MAP[item.type];
  pinboard[key].push(item.id);
};

const removeItem = (pinboard, item) => {
  const key = PINBOARD_ATTR_MAP[item.type];
  _.remove(pinboard[key], (id) => (id === item.id));
};

export default store => next => action => {
  let pinboard = null;
  let item = null;

  if (action.type === ADD_ITEM_TO_PINBOARD || action.type === REMOVE_ITEM_IN_PINBOARD_PAGE) {
    pinboard = getPinboard(store.getState());
    item = action.payload;

    item.isPinned ? removeItem(pinboard, item) : addItem(pinboard, item);
  }

  if (action.type === ADD_ITEM_TO_PINBOARD) {
    if (pinboard.id === null) {
      store.dispatch(createPinboard(pinboard));
    } else {
      store.dispatch(updatePinboard(pinboard));
    }
  }
  else if (action.type === REMOVE_ITEM_IN_PINBOARD_PAGE) {
    // TODO: test this async function
    /* istanbul ignore next */
    store.dispatch(updatePinboard(pinboard)).then(response => {
      const pinboardID = response.payload.id;
      const pinboardFetchSelected = PINBOARD_FETCH_SELECTED_MAP[item.type];

      store.dispatch(pinboardFetchSelected(pinboardID));
      store.dispatch(fetchPinboardSocialGraph(pinboardID));
      store.dispatch(fetchPinboardGeographicData(pinboardID));
    });
  }
  return next(action);
};
