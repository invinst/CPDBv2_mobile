import AppConstants from 'constants/AppConstants';
import AppDispatcher from 'components/Dispatcher';
import InterfaceTextStore from 'stores/Shared/InterfaceTextStore';

require('should');


describe('InterfaceTextStore', () => {
  const callback = AppDispatcher.getCallback(InterfaceTextStore.dispatcherToken);

  it('should update loaded to true if data is already loaded', () => {
    InterfaceTextStore.updateState('loaded', false);

    callback({
      actionType: AppConstants.GET_INTERFACE_TEXT_SUCCESS
    });

    InterfaceTextStore.getState().loaded.should.be.true();
  });

  it('should update loaded to false if data is not loaded yet', () => {
    InterfaceTextStore.updateState('loaded', true);

    callback({
      actionType: AppConstants.GET_INTERFACE_TEXT_FAILED
    });

    InterfaceTextStore.getState().loaded.should.be.false();
  });
});
