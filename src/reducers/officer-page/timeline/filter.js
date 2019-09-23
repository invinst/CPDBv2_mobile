import { handleActions } from 'redux-actions';

import { OFFICER_TIMELINE_ITEMS_CHANGE_FILTER } from 'actions/officer-page/timeline';
import { TIMELINE_FILTERS } from 'constants/officer-page/tabbed-pane-section/timeline';


export default handleActions({
  [OFFICER_TIMELINE_ITEMS_CHANGE_FILTER]: (state, action) => {
    return action.payload;
  },
}, TIMELINE_FILTERS.ALL);
