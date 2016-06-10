import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';


const InterfaceTextActions = {
  getInterfaceTextsSucessfully(results) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_INTERFACE_TEXT_SUCCESS,
      interfaceTexts: results
    });
  },

  failedToGetInterfaceTexts() {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_INTERFACE_TEXT_FAILED
    });
  }
};

export default InterfaceTextActions;
