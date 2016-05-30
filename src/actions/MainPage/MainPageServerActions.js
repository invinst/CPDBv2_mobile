import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';


const MainPageServerActions = {
  received(data, query) {
    AppDispatcher.dispatch({
      actionType: AppConstants.MAIN_PAGE_RECEIVED_DATA,
      data,
      query
    });
  },

  failedToReceive(query) {
    AppDispatcher.dispatch({
      actionType: AppConstants.MAIN_PAGE_FAILED_TO_RECEIVED_DATA,
      data: [],
      query
    });
  }
};

export default MainPageServerActions;
