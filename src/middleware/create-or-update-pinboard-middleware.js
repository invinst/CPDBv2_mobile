import * as _ from 'lodash';

import {
  ADD_OR_REMOVE_ITEM_IN_PINBOARD,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ADD_ITEM_IN_PINBOARD_PAGE,
  createPinboard,
  updatePinboard,
  fetchPinboardSocialGraph,
  fetchPinboardGeographicData,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  ORDER_PINBOARD,
} from 'actions/pinboard';
import { getPinboard } from 'selectors/pinboard';


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

  if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD ||
    action.type === REMOVE_ITEM_IN_PINBOARD_PAGE ||
    action.type === ADD_ITEM_IN_PINBOARD_PAGE) {
    pinboard = getPinboard(store.getState());
    item = action.payload;

    item.isPinned ? removeItem(pinboard, item) : addItem(pinboard, item);
  }

  if (action.type === ORDER_PINBOARD) {
    const { type, ids } = action.payload;

    pinboard = getPinboard(store.getState());
    const key = PINBOARD_ATTR_MAP[type];
    const currentIds = pinboard[key];
    pinboard[key] = _.sortBy(currentIds, currentId => _.findIndex(ids, id => id === currentId.toString()));
  }

  if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD) {
    if (pinboard.id === null) {
      store.dispatch(createPinboard(pinboard));
    } else {
      store.dispatch(updatePinboard(pinboard));
    }
  }
  else if (
    action.type === REMOVE_ITEM_IN_PINBOARD_PAGE ||
    action.type === ADD_ITEM_IN_PINBOARD_PAGE ||
    action.type === ORDER_PINBOARD
  ) {
    // TODO: test this async function
    /* istanbul ignore next */
    store.dispatch(updatePinboard(pinboard)).then(response => {
      const pinboardID = response.payload.id;
      const pinboardFetchSelected = PINBOARD_FETCH_SELECTED_MAP[item.type];

      store.dispatch(pinboardFetchSelected(pinboardID));
      store.dispatch(fetchPinboardSocialGraph(pinboardID));
      store.dispatch(fetchPinboardGeographicData(pinboardID));
      store.dispatch(fetchPinboardRelevantDocuments(pinboardID));
      store.dispatch(fetchPinboardRelevantCoaccusals(pinboardID));
      store.dispatch(fetchPinboardRelevantComplaints(pinboardID));
    });
  }

  return next(action);
};
