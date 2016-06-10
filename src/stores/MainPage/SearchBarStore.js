import objectAssign from 'object-assign';
import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';
import Base from 'stores/Base';


const SearchBarStore = objectAssign(Base({
  status: 'blank',
  term: ''
}), {});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.SEARCH_INPUT_CHANGED:
      SearchBarStore.updateState('term', action.data);
      SearchBarStore.emitChange();
      break;

    case AppConstants.SEARCH_BLUR:
      SearchBarStore.updateState('status', 'blank');
      SearchBarStore.emitChange();
      break;

    case AppConstants.SEARCH_FOCUS:
      SearchBarStore.updateState('status', 'focus');
      SearchBarStore.emitChange();
      break;

    case AppConstants.SEARCH_CLEAR:
      SearchBarStore.updateState('status', 'blank');
      SearchBarStore.updateState('term', '');
      SearchBarStore.emitChange();
      break;

    case AppConstants.MAIN_PAGE_RECEIVED_DATA:
    case AppConstants.MAIN_PAGE_FAILED_TO_RECEIVED_DATA:
      SearchBarStore.updateState('term', action.query);
      SearchBarStore.updateState('status', 'focus');
      SearchBarStore.emitChange();
      break;

    default:
      break;
  }
});

export default SearchBarStore;
