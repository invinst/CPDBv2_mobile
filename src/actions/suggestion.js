import { createAction } from 'redux-actions';
import { get } from 'actions/common/async-action';
import { v2v2Url } from 'utils/UrlUtil';
import constants from 'constants';


export const SUGGESTION_REQUEST_START = 'SUGGESTION_REQUEST_START';
export const SUGGESTION_REQUEST_SUCCESS = 'SUGGESTION_REQUEST_SUCCESS';
export const SUGGESTION_REQUEST_FAILURE = 'SUGGESTION_REQUEST_FAILURE';

export const SUGGEST_ALL_REQUEST_START = 'SUGGEST_ALL_REQUEST_START';
export const SUGGEST_ALL_REQUEST_SUCCESS = 'SUGGEST_ALL_REQUEST_SUCCESS';
export const SUGGEST_ALL_REQUEST_FAILURE = 'SUGGEST_ALL_REQUEST_FAILURE';

export const SUGGEST_EMPTY_TERM_REQUEST_START = 'SUGGEST_EMPTY_TERM_REQUEST_START';
export const SUGGEST_EMPTY_TERM_REQUEST_SUCCESS = 'SUGGEST_EMPTY_TERM_REQUEST_SUCCESS';
export const SUGGEST_EMPTY_TERM_REQUEST_FAILURE = 'SUGGEST_EMPTY_TERM_REQUEST_FAILURE';

export const SEARCH_FOCUS = 'SEARCH_FOCUS';
export const SEARCH_BLUR = 'SEARCH_BLUR';
export const SEARCH_CLEAR = 'SEARCH_CLEAR';
export const SEARCH_INPUT_CHANGED = 'SEARCH_INPUT_CHANGED';
export const SEARCH_RESET = 'SEARCH_RESET';
export const SEARCH_CLICKED = 'SEARCH_CLICKED';


export const suggestTerm = get(
  v2v2Url(constants.SUGGESTION_API_ENDPOINT), [SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS,
    SUGGESTION_REQUEST_FAILURE]
);

export const suggestAllFromCategory = (categoryPath, query) => {
  const suggest = get(
    v2v2Url(constants.SUGGESTION_API_ENDPOINT),
    [
      SUGGEST_ALL_REQUEST_START,
      SUGGEST_ALL_REQUEST_SUCCESS,
      SUGGEST_ALL_REQUEST_FAILURE
    ]
  );

  return suggest({ contentType: categoryPath }, undefined, query + '/');
};

export const suggestEmptyTerm = () => {
  const suggest = get(
    v2v2Url(constants.SUGGESTION_API_ENDPOINT),
    [
      SUGGEST_EMPTY_TERM_REQUEST_START,
      SUGGEST_EMPTY_TERM_REQUEST_SUCCESS,
      SUGGEST_EMPTY_TERM_REQUEST_FAILURE
    ]
  );

  return suggest({}, undefined, '');
};

export const focus = createAction(SEARCH_FOCUS);
export const blur = createAction(SEARCH_BLUR);
export const clear = createAction(SEARCH_CLEAR);
export const inputChanged = createAction(SEARCH_INPUT_CHANGED);
export const reset = createAction(SEARCH_RESET);
export const clicked = createAction(SEARCH_CLICKED);
