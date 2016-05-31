import AppConstants from 'constants/AppConstants';
import AppDispatcher from 'components/Dispatcher';
import RequestStore from 'stores/ComplaintPage/RequestStore';

require('should');


describe('RequestStore', () => {
  const callback = AppDispatcher.getCallback(RequestStore.dispatcherToken);

  it('should update requested to true if request document success', () => {
    RequestStore.updateState('requested', false);

    callback({
      actionType: AppConstants.DOCUMENT_REQUEST_SUCCESS
    });

    RequestStore.getState().requested.should.be.true();
  });

  it('should update submitFailed to true if request document fail', () => {
    const errors = {'errorType': 'errorMsg'};
    RequestStore.updateState('submitFailed', false);

    callback({
      actionType: AppConstants.DOCUMENT_REQUEST_FAIL,
      errors
    });

    RequestStore.getState().submitFailed.should.be.true();
    RequestStore.getState().errors.should.be.eql(errors);
  });
});
