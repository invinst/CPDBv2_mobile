import objectAssign from 'object-assign';
import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';
import Base from 'stores/Base';


const _state = {
  'requested': false,
  'submitFailed': false,
  'errors': {}
};

const RequestStore = objectAssign(Base(_state), {});

RequestStore.dispatcherToken = AppDispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.DOCUMENT_REQUEST_SUCCESS:
      _state['requested'] = true;
      RequestStore.emitChange();
      break;
    case AppConstants.DOCUMENT_REQUEST_FAIL:
      _state['submitFailed'] = true;
      _state['errors'] = action.errors;
      RequestStore.emitChange();
      break;
  }
});

export default RequestStore;
