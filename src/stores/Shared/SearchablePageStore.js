import objectAssign from 'object-assign';
import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';
import Base from 'stores/Base';


const _state = {
  'focus': 0
};

const SearchablePageStore = objectAssign(Base(_state), {});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.SEARCH_FOCUS:
      SearchablePageStore.updateState('focus', 1);
      SearchablePageStore.emitChange();
      break;

    case AppConstants.SEARCH_BLUR:
    case AppConstants.SEARCH_CLEAR:
    case AppConstants.RESET_STATE:
      SearchablePageStore.updateState('focus', 0);
      SearchablePageStore.emitChange();
      break;

    default:
      break;
  }
});

export default SearchablePageStore;
