import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';


const ComplaintPageServerActions = {
  received(data) {
    AppDispatcher.dispatch({
      actionType: AppConstants.COMPLAINT_PAGE_RECEIVED_DATA,
      data
    });
  },

  failedToReceive(crid) {
    AppDispatcher.dispatch({
      actionType: AppConstants.COMPLAINT_PAGE_FAILED_TO_RECEIVED_DATA,
      data: crid
    });
  }
};

export default ComplaintPageServerActions;
