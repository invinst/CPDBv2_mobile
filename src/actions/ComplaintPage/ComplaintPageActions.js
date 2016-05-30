import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';

const ComplaintPageActions = {
  toggleOpen() {
    AppDispatcher.dispatch({
      actionType: AppConstants.TOGGLE_PAGE_OPEN
    });
  },

  toggleClose() {
    AppDispatcher.dispatch({
      actionType: AppConstants.TOGGLE_PAGE_CLOSE
    });
  },

  resetState() {
    AppDispatcher.dispatch({
      actionType: AppConstants.RESET_STATE
    });
  }
};

export default ComplaintPageActions;
