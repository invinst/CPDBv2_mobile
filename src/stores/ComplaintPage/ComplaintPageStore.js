import objectAssign from 'object-assign';
import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';
import Base from 'stores/Base';


const _state = {
  'crid': '',
  'loading': false,
  'found': false,
  'data': {}
};

const ComplaintPageStore = objectAssign(Base(_state), {});

ComplaintPageStore.dispatcherToken = AppDispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.COMPLAINT_PAGE_RECEIVED_DATA:
      _state['data'] = action.data;
      _state['crid'] = action.data['allegation']['crid'];
      _state['found'] = true;
      _state['loading'] = false;
      ComplaintPageStore.emitChange();
      break;

    case AppConstants.COMPLAINT_PAGE_FAILED_TO_RECEIVED_DATA:
      _state['crid'] = action.data;
      _state['found'] = false;
      _state['loading'] = false;
      ComplaintPageStore.emitChange();
      break;

    case AppConstants.TOGGLE_PAGE_OPEN:
      _state['toggle'] = true;
      ComplaintPageStore.emitChange();
      break;

    case AppConstants.TOGGLE_PAGE_CLOSE:
    case AppConstants.RESET_STATE:
      _state['toggle'] = false;
      ComplaintPageStore.emitChange();
      break;

    default:
      break;
  }
});

export default ComplaintPageStore;
