import RequestActions from 'actions/ComplaintPage/RequestActions';
import AppConstants from 'constants/AppConstants';
import AppDispatcher from 'components/Dispatcher';

require('should');


describe('RequestActions', () => {
  describe('#requestSuccess', () => {
    it('should dispatch document request success event', () => {
      const expectedCall = {
        actionType: AppConstants.DOCUMENT_REQUEST_SUCCESS
      };

      RequestActions.requestSuccess();
      AppDispatcher.dispatch.calledWithMatch(expectedCall).should.be.true();
    });
  });

  describe('#requestFail', () => {
    it('should dispatch document request fail event', () => {
      const expectedCall = {
        actionType: AppConstants.DOCUMENT_REQUEST_FAIL
      };

      RequestActions.requestFail();
      AppDispatcher.dispatch.calledWithMatch(expectedCall).should.be.true();
    });
  });
});
