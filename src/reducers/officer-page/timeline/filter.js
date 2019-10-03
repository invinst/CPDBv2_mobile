import { handleActions } from 'redux-actions';

import { OFFICER_TIMELINE_ITEMS_CHANGE_FILTER } from 'actions/officer-page/timeline';
import { TIMELINE_FILTERS } from 'constants/officer-page/tabbed-pane-section/timeline';
import { RESET_TIME_LINE_FILTER } from 'constants/officer-page';


export default handleActions({
  [OFFICER_TIMELINE_ITEMS_CHANGE_FILTER]: (state, action) => action.payload,
  [RESET_TIME_LINE_FILTER]: (state, action) => TIMELINE_FILTERS.ALL,
}, TIMELINE_FILTERS.ALL);
