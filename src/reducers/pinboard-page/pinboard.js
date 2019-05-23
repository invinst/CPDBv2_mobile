import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import {
  PINBOARD_CREATE_REQUEST_START,
  PINBOARD_UPDATE_REQUEST_FAILURE,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_START,
  PINBOARD_CREATE_REQUEST_FAILURE,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  ADD_ITEM_TO_PINBOARD_STATE,
  REMOVE_ITEM_FROM_PINBOARD_STATE,
  ORDER_PINBOARD_STATE
} from 'actions/pinboard';



const PINBOARD_ATTR_MAP = {
  'CR': 'crids',
  'DATE > CR': 'crids',
  'INVESTIGATOR > CR': 'crids',
  'OFFICER': 'officer_ids',
  'UNIT > OFFICERS': 'officer_ids',
  'DATE > OFFICERS': 'officer_ids',
  'TRR': 'trr_ids',
  'DATE > TRR': 'trr_ids',
};

const defaultState = {
  'id': null,
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
  'saving': false,
  'isPinboardRestored': false,
};

const getFormatId = (attr) => {
  return _.includes(['officer_ids', 'trr_ids'], attr) ? _.parseInt : _.identity;
};

export default handleActions({
  [PINBOARD_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isPinboardRestored: true,
  }),
  [PINBOARD_CREATE_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      id: action.payload.id,
      saving: false,
    };
  },
  [PINBOARD_CREATE_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      saving: false,
    };
  },
  [PINBOARD_UPDATE_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      saving: false,
    };
  },
  [PINBOARD_UPDATE_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      saving: false,
    };
  },
  [PINBOARD_CREATE_REQUEST_START]: (state, action) => ({
    ...state,
    saving: true,
  }),
  [PINBOARD_UPDATE_REQUEST_START]: (state, action) => ({
    ...state,
    saving: true,
  }),
  [ADD_ITEM_TO_PINBOARD_STATE]: (state, action) => {
    const attr = PINBOARD_ATTR_MAP[action.payload.type];
    const ids = state[attr] || [];
    const format = getFormatId(attr);
    const newId = format(action.payload.id);
    return {
      ...state,
      [attr]: _.includes(ids, newId) ? ids : ids.concat(newId),
    };
  },
  [REMOVE_ITEM_FROM_PINBOARD_STATE]: (state, action) => {
    const attr = PINBOARD_ATTR_MAP[action.payload.type];
    let ids = state[attr] || [];
    const format = getFormatId(attr);

    return {
      ...state,
      [attr]: _.reject(ids, id => id === format(action.payload.id)),
    };
  },
  [ORDER_PINBOARD_STATE]: (state, action) => {
    const { ids, type } = action.payload;
    const attr = PINBOARD_ATTR_MAP[type];
    const format = getFormatId(attr);

    return {
      ...state,
      [attr]: _.map(ids, format),
    };
  },
}, defaultState);
