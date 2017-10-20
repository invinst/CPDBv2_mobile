import { createAction } from 'redux-actions';
import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/UrlUtil';
import constants from 'constants';


export const SUGGESTION_REQUEST_START = 'SUGGESTION_REQUEST_START';
export const SUGGESTION_REQUEST_SUCCESS = 'SUGGESTION_REQUEST_SUCCESS';
export const SUGGESTION_REQUEST_FAILURE = 'SUGGESTION_REQUEST_FAILURE';

export const SUGGEST_ALL_REQUEST_START = 'SUGGEST_ALL_REQUEST_START';
export const SUGGEST_ALL_REQUEST_SUCCESS = 'SUGGEST_ALL_REQUEST_SUCCESS';
export const SUGGEST_ALL_REQUEST_FAILURE = 'SUGGEST_ALL_REQUEST_FAILURE';

export const FETCH_SUGGESTED_SEARCH_ITEMS_START = 'FETCH_SUGGESTED_SEARCH_ITEMS_START';
export const FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS = 'FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS';
export const FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE = 'FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE';

export const SEARCH_SAVE_TO_RECENT = 'SEARCH_SAVE_TO_RECENT';

export const SEARCH_FOCUS = 'SEARCH_FOCUS';
export const SEARCH_BLUR = 'SEARCH_BLUR';
export const SEARCH_CLEAR = 'SEARCH_CLEAR';
export const SEARCH_INPUT_CHANGED = 'SEARCH_INPUT_CHANGED';
export const SEARCH_RESET = 'SEARCH_RESET';

export const UPDATE_ACTIVE_CATEGORY = 'UPDATE_ACTIVE_CATEGORY';
export const UPDATE_CHOSEN_CATEGORY = 'UPDATE_CHOSEN_CATEGORY';


export const suggestTerm = get(
  v2Url(constants.SUGGESTION_API_ENDPOINT), [SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS,
    SUGGESTION_REQUEST_FAILURE]
);

export const suggestAllFromCategory = (categoryPath, query) => {
  const suggest = get(
    v2Url(constants.SUGGESTION_API_ENDPOINT),
    [
      SUGGEST_ALL_REQUEST_START,
      SUGGEST_ALL_REQUEST_SUCCESS,
      SUGGEST_ALL_REQUEST_FAILURE
    ]
  );

  return suggest({ contentType: categoryPath }, undefined, query + '/');
};

export const fetchSuggestedSearchItems = () => {
  const suggest = get(
    v2Url(constants.SUGGESTION_API_ENDPOINT),
    [
      FETCH_SUGGESTED_SEARCH_ITEMS_START,
      FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS,
      FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE
    ]
  );

  return suggest({}, undefined, '');
};

export const saveToRecent = createAction(SEARCH_SAVE_TO_RECENT);

export const focus = createAction(SEARCH_FOCUS);
export const blur = createAction(SEARCH_BLUR);
export const clear = createAction(SEARCH_CLEAR);
export const inputChanged = createAction(SEARCH_INPUT_CHANGED);
export const reset = createAction(SEARCH_RESET);

export const updateActiveCategory = createAction(UPDATE_ACTIVE_CATEGORY);
export const updateChosenCategory = createAction(UPDATE_CHOSEN_CATEGORY);
