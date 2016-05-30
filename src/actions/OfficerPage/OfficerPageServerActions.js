import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';


const OfficerPageServerActions = {
  received(data) {
    AppDispatcher.dispatch({
      actionType: AppConstants.OFFICER_PAGE_RECEIVED_DATA,
      data
    });
  },

  failedToReceive(id) {
    AppDispatcher.dispatch({
      actionType: AppConstants.OFFICER_PAGE_FAILED_TO_RECEIVED_DATA,
      data: id
    });
  },

  reload() {
    AppDispatcher.dispatch({
      actionType: AppConstants.OFFICER_PAGE_RELOAD
    });
  }
};

export default OfficerPageServerActions;
