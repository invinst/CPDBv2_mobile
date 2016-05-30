import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';


const SearchBarActions = {
  changed(term) {
    AppDispatcher.dispatch({
      actionType: AppConstants.SEARCH_INPUT_CHANGED,
      data: term
    });
  },

  focus() {
    AppDispatcher.dispatch({
      actionType: AppConstants.SEARCH_FOCUS
    });
  },

  blur() {
    AppDispatcher.dispatch({
      actionType: AppConstants.SEARCH_BLUR
    });
  },

  clear() {
    AppDispatcher.dispatch({
      actionType: AppConstants.SEARCH_CLEAR
    });
  }
};

export default SearchBarActions;
