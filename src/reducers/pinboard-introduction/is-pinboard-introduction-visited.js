import { handleActions } from 'redux-actions';

import { VISIT_PINBOARD_INTRODUCTION } from 'actions/pinboard-introduction';

export default handleActions({
  [VISIT_PINBOARD_INTRODUCTION]: (state, action) => true,
}, false);
