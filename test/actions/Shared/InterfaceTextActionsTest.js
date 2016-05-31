import InterfaceTextActions from 'actions/Shared/InterfaceTextActions';
import AppConstants from 'constants/AppConstants';
import AppDispatcher from 'components/Dispatcher';

require('should');


describe('InterfaceTextActions', () => {
  describe('#getInterfaceTextSuccessfully', () => {
    it('should dispatch get interface text success event', () => {
      const expectedCall = {
        actionType: AppConstants.GET_INTERFACE_TEXT_SUCCESS
      };

      InterfaceTextActions.getInterfaceTextsSucessfully();
      AppDispatcher.dispatch.calledWithMatch(expectedCall).should.be.true();
    });
  });

  describe('#failedToGetInterfaceTexts', () => {
    it('should dispatch get interface text failed event', () => {
      const expectedCall = {
        actionType: AppConstants.GET_INTERFACE_TEXT_FAILED
      };

      InterfaceTextActions.failedToGetInterfaceTexts();
      AppDispatcher.dispatch.calledWithMatch(expectedCall).should.be.true();
    });
  });
});
