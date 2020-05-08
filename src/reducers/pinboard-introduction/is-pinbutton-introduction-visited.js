import { handleActions } from 'redux-actions';

import { VISIT_PIN_BUTTON_INTRODUCTION } from 'actions/pinboard-introduction';

export default handleActions({
  [VISIT_PIN_BUTTON_INTRODUCTION]: (state, action) => true,
}, false);
