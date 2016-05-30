import objectAssign from 'object-assign';
import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';
import Base from 'stores/Base';


const _state = {
  'pk': '',
  'loading': false,
  'found': false,
  'complaint': {}
};

const OfficerPageStore = objectAssign(Base(_state), {});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.OFFICER_PAGE_RECEIVED_DATA:
      _state['officer'] = action.data;
      _state['pk'] = action.data['detail']['id'];
      _state['found'] = true;
      _state['loading'] = false;
      OfficerPageStore.emitChange();
      break;

    case AppConstants.OFFICER_PAGE_FAILED_TO_RECEIVED_DATA:
      _state['pk'] = action.data;
      _state['found'] = false;
      _state['loading'] = false;
      OfficerPageStore.emitChange();
      break;

    case AppConstants.OFFICER_PAGE_RELOAD:
      _state['loading'] = true;
      OfficerPageStore.emitChange();
      break;

    default:
      break;
  }
});

export default OfficerPageStore;
