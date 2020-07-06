import { handleActions } from 'redux-actions';
import { includes, identity, isEmpty, isEqual, get, map, difference, reject, parseInt } from 'lodash';

import {
  PINBOARD_CREATE_REQUEST_START,
  PINBOARD_UPDATE_REQUEST_FAILURE,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_START,
  PINBOARD_CREATE_REQUEST_FAILURE,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_START,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  ADD_ITEM_TO_PINBOARD_STATE,
  REMOVE_ITEM_FROM_PINBOARD_STATE,
  ORDER_PINBOARD_STATE,
  PERFORM_FETCH_PINBOARD_RELATED_DATA,
  UPDATE_PINBOARD_INFO_STATE,
} from 'actions/pinboard';
import { getRequestPinboard } from 'utils/pinboard';


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

const DEFAULT_PINBOARD_STATUSES = {
  saving: false,
  needRefreshData: false,
  hasPendingChanges: false,
  hasTitlePendingChange: false,
};

const defaultState = {
  'id': null,
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
  'isPinboardRestored': false,
  ...DEFAULT_PINBOARD_STATUSES,
};

const getFormatId = (attr) => {
  return includes(['officer_ids', 'trr_ids'], attr) ? parseInt : identity;
};

const hasPendingChanges = (currentPinboard, pinboard) => (
  isEmpty(pinboard) || !isEqual(getRequestPinboard(currentPinboard), getRequestPinboard(pinboard))
);

const hasTitlePendingChange = (currentPinboard, pinboard) => (
  get(currentPinboard, 'title') !== get(pinboard, 'title')
);

export default handleActions({
  [PINBOARD_FETCH_REQUEST_START]: (state, action) => ({
    ...state,
    ...DEFAULT_PINBOARD_STATUSES,
  }),
  [PINBOARD_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...action.payload,
    ...DEFAULT_PINBOARD_STATUSES,
    isPinboardRestored: true,
  }),
  [PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START]: (state, action) => ({
    ...state,
    ...DEFAULT_PINBOARD_STATUSES,
  }),
  [PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...defaultState,
    ...action.payload,
    isPinboardRestored: true,
  }),
  [PINBOARD_CREATE_REQUEST_SUCCESS]: (state, action) => {
    const notFoundOfficerIds = get(action.payload, 'not_found_items.officer_ids', []);
    const notFoundCrids = get(action.payload, 'not_found_items.crids', []);
    const notFoundTrrIds = get(action.payload, 'not_found_items.trr_ids', []);

    const officerIds = difference(get(state, 'officer_ids', []), notFoundOfficerIds);
    const crids = difference(get(state, 'crids', []), notFoundCrids);
    const trrIds = difference(get(state, 'trr_ids', []), notFoundTrrIds);
    const pinboard = {
      ...state,
      'officer_ids': officerIds,
      crids,
      'trr_ids': trrIds,
      id: action.payload.id,
      saving: false,
      isPinboardRestored: true,
      'example_pinboards': action.payload['example_pinboards'],
    };

    pinboard.hasPendingChanges = hasPendingChanges(pinboard, action.payload);
    return pinboard;
  },
  [PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...action.payload,
      ...DEFAULT_PINBOARD_STATUSES,
      isPinboardRestored: true,
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
      hasPendingChanges: hasPendingChanges(state, action.payload),
      hasTitlePendingChange: hasTitlePendingChange(state, action.payload),
      'example_pinboards': action.payload['example_pinboards'],
    };
  },
  [PINBOARD_UPDATE_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      saving: false,
    };
  },
  [PINBOARD_CREATE_REQUEST_START]: (state, action) => {
    const creatingData = get(action.payload, 'request.data', {});
    creatingData['officer_ids'] = map(creatingData['officer_ids'], parseInt);
    creatingData['trr_ids'] = map(creatingData['trr_ids'], parseInt);
    return {
      ...state,
      ...creatingData,
      saving: true,
    };
  },
  [PINBOARD_UPDATE_REQUEST_START]: (state, action) => ({
    ...state,
    saving: true,
  }),
  [UPDATE_PINBOARD_INFO_STATE]: (state, action) => {
    return {
      ...state,
      [action.payload.attr]: action.payload.value,
      hasPendingChanges: true,
      hasTitlePendingChange: action.payload.attr === 'title',
    };
  },
  [ADD_ITEM_TO_PINBOARD_STATE]: (state, action) => {
    const attr = PINBOARD_ATTR_MAP[action.payload.type];
    const ids = state[attr] || [];
    const format = getFormatId(attr);
    const newId = format(action.payload.id);
    return {
      ...state,
      [attr]: includes(ids, newId) ? ids : ids.concat(newId),
      hasPendingChanges: true,
      needRefreshData: true,
    };
  },
  [REMOVE_ITEM_FROM_PINBOARD_STATE]: (state, action) => {
    const attr = PINBOARD_ATTR_MAP[action.payload.type];
    let ids = state[attr] || [];
    const format = getFormatId(attr);

    return {
      ...state,
      [attr]: reject(ids, id => id === format(action.payload.id)),
      hasPendingChanges: true,
      needRefreshData: true,
    };
  },
  [ORDER_PINBOARD_STATE]: (state, action) => {
    const { ids, type } = action.payload;
    const attr = PINBOARD_ATTR_MAP[type];
    const format = getFormatId(attr);

    return {
      ...state,
      [attr]: map(ids, format),
      hasPendingChanges: true,
    };
  },
  [PERFORM_FETCH_PINBOARD_RELATED_DATA]: (state, action) => {
    return {
      ...state,
      needRefreshData: false,
    };
  },
}, defaultState);
