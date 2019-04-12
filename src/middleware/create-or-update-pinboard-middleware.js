import * as _ from 'lodash';
import { browserHistory } from 'react-router';

import {
  ADD_ITEM_TO_PINBOARD,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  createPinboard,
  updatePinboard,
  fetchPinboard,
  fetchPinboardSocialGraph,
  fetchPinboardGeographicData,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
} from 'actions/pinboard';
import { getPinboard } from 'selectors/pinboard';
import { getPathname } from 'selectors/common/routing';


const PINBOARD_ATTR_MAP = {
  'CR': 'crids',
  'OFFICER': 'officerIds',
  'TRR': 'trrIds',
};

const addItem = (pinboard, item) => {
  const key = PINBOARD_ATTR_MAP[item.type];
  pinboard[key].push(item.id);
  return pinboard;
};

const removeItem = (pinboard, item) => {
  const key = PINBOARD_ATTR_MAP[item.type];
  _.remove(pinboard[key], (id) => (id === item.id));
  return pinboard;
};

export default store => next => action => {
  if (action.type === ADD_ITEM_TO_PINBOARD) {
    const pinboard = getPinboard(store.getState());
    const item = action.payload;

    if (pinboard.id === null) {
      store.dispatch(createPinboard(addItem(pinboard, item)));
    } else {
      const newPinboard = item.isPinned ? removeItem(pinboard, item) : addItem(pinboard, item);
      const pinboardAction = pinboard.ownedByCurrentUser ? updatePinboard : createPinboard;

      store.dispatch(pinboardAction(newPinboard));
    }
  }
  if (action.type === PINBOARD_CREATE_REQUEST_SUCCESS) {
    const state = store.getState();
    if (getPathname(state).match(/\/pinboard\/[\w\d]+/)) {
      browserHistory.push(`/pinboard/${action.payload.id}/`);
    }
  }
  if (action.type === PINBOARD_UPDATE_REQUEST_SUCCESS) {
    const state = store.getState();
    if (getPathname(state).match(/\/pinboard\/[\w\d]+/)) {
      const pinboardID = action.payload.id;
      store.dispatch(fetchPinboard(pinboardID));
      store.dispatch(fetchPinboardSocialGraph(pinboardID));
      store.dispatch(fetchPinboardGeographicData(pinboardID));
      store.dispatch(fetchPinboardRelevantDocuments(pinboardID));
      store.dispatch(fetchPinboardRelevantCoaccusals(pinboardID));
      store.dispatch(fetchPinboardRelevantComplaints(pinboardID));
    }
  }
  return next(action);
};
