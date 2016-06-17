import { createAction } from 'redux-actions';
import { get } from 'actions/common/async-action';
import constants from 'constants';

export const SUGGESTION_REQUEST_START = 'SUGGESTION_REQUEST_START';
export const SUGGESTION_REQUEST_SUCCESS = 'SUGGESTION_REQUEST_SUCCESS';
export const SUGGESTION_REQUEST_FAILURE = 'SUGGESTION_REQUEST_FAILURE';

export const SEARCH_FOCUS = 'SEARCH_FOCUS';
export const SEARCH_BLUR = 'SEARCH_BLUR';
export const SEARCH_CLEAR = 'SEARCH_CLEAR';
export const SEARCH_INPUT_CHANGED = 'SEARCH_INPUT_CHANGED';


export const suggestTerm = get(
  constants.SUGGESTION_API_ENDPOINT, [SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE]
);
export const focus = createAction(SEARCH_FOCUS);
export const blur = createAction(SEARCH_BLUR);
export const clear = createAction(SEARCH_CLEAR);
export const inputChanged = createAction(SEARCH_INPUT_CHANGED);
