import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';


const RequestActions = {
  requestSuccess() {
    AppDispatcher.dispatch({
      actionType: AppConstants.DOCUMENT_REQUEST_SUCCESS
    });
  },

  requestFail(errors) {
    AppDispatcher.dispatch({
      actionType: AppConstants.DOCUMENT_REQUEST_FAIL,
      errors
    });
  }
};

export default RequestActions;
