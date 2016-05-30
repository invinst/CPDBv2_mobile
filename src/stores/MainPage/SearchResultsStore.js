import objectAssign from 'object-assign';
import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';
import Base from 'stores/Base';


const SearchResultsStore = objectAssign(Base({
  suggestions: [],
  term: '',
  success: false,
  searching: 0
}), {});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.MAIN_PAGE_RECEIVED_DATA:
      SearchResultsStore.updateState('searching', 0);
      SearchResultsStore.updateState('suggestions', action.data);
      SearchResultsStore.updateState('success', true);
      SearchResultsStore.updateState('term', action.query);
      SearchResultsStore.emitChange();
      break;

    case AppConstants.MAIN_PAGE_FAILED_TO_RECEIVED_DATA:
      SearchResultsStore.updateState('searching', 0);
      SearchResultsStore.updateState('success', false);
      SearchResultsStore.updateState('term', action.query);
      SearchResultsStore.emitChange();
      break;

    case AppConstants.SEARCH_INPUT_CHANGED:
      SearchResultsStore.updateState('term', action.data);
      SearchResultsStore.updateState('searching', 1);
      SearchResultsStore.emitChange();
      break;

    case AppConstants.SEARCH_CLEAR:
      SearchResultsStore.updateState('term', '');
      SearchResultsStore.updateState('suggestions', []);
      SearchResultsStore.emitChange();
      break;

    default:
      break;
  }
});

export default SearchResultsStore;
