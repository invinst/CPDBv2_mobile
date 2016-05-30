import objectAssign from 'object-assign';
import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';
import Base from 'stores/Base';


const _state = {
  isSearchFocused: 0,
  isSearching: 0
};

const MainPageStore = objectAssign(Base(_state), {});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.SEARCH_CLEAR:
      MainPageStore.updateState('isSearchFocused', 0);
      MainPageStore.emitChange();
      break;

    case AppConstants.SEARCH_FOCUS:
      MainPageStore.updateState('isSearchFocused', 1);
      MainPageStore.emitChange();
      break;

    case AppConstants.SEARCH_BLUR:
      MainPageStore.updateState('isSearchFocused', 0);
      MainPageStore.emitChange();
      break;

    case AppConstants.SEARCH_INPUT_CHANGED:
      MainPageStore.updateState('isSearching', 1);
      MainPageStore.emitChange();
      break;

    case AppConstants.MAIN_PAGE_RECEIVED_DATA:
    case AppConstants.MAIN_PAGE_FAILED_TO_RECEIVED_DATA:
      MainPageStore.updateState('isSearching', 0);
      MainPageStore.updateState('isSearchFocused', 1);
      MainPageStore.updateState('term', action.query);
      MainPageStore.emitChange();
      break;

    default:
      break;
  }
});

export default MainPageStore;
