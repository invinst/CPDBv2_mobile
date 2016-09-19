import { handleActions } from 'redux-actions';

import { COMPLAINT_PAGE_TOGGLE_OPEN, COMPLAINT_PAGE_TOGGLE_CLOSE } from 'actions/complaint';
import { SEARCH_RESET } from 'actions/suggestion';


const toggle = handleActions({
  [COMPLAINT_PAGE_TOGGLE_OPEN]: (state, action) => (true),
  [COMPLAINT_PAGE_TOGGLE_CLOSE]: (state, action) => (false),
  [SEARCH_RESET]: (state, action) => (false)
}, false);

export default toggle;
