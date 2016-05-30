import objectAssign from 'object-assign';
import AppDispatcher from 'components/Dispatcher';
import AppConstants from 'constants/AppConstants';
import Base from 'stores/Base';


const InterfaceTextStore = objectAssign(Base({
  'loaded': false
}), {});

InterfaceTextStore.dispatcherToken = AppDispatcher.register(action => {
  switch (action.actionType) {
    case AppConstants.GET_INTERFACE_TEXT_SUCCESS:
      InterfaceTextStore.updateState('loaded', true);
      InterfaceTextStore.updateState('interfaceTexts', action.interfaceTexts);
      InterfaceTextStore.emitChange();
      break;

    case AppConstants.GET_INTERFACE_TEXT_FAILED:
      InterfaceTextStore.updateState('loaded', false);
      InterfaceTextStore.emitChange();
      break;

    default:
      break;
  }
});

export default InterfaceTextStore;
