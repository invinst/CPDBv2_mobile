import ComplaintPageServerActions from 'actions/ComplaintPage/ComplaintPageServerActions';
import AppConstants from 'constants/AppConstants';
import AppDispatcher from 'components/Dispatcher';

require('should');


describe('ComplaintPageServerActions', () => {
  it('dispatch complaint page received data', () => {
    const data = 'data';
    const expectedCall = {
      actionType: AppConstants.COMPLAINT_PAGE_RECEIVED_DATA,
      data
    };
    ComplaintPageServerActions.received(data);
    AppDispatcher.dispatch.calledWithMatch(expectedCall).should.be.true();
  });

  it('dispatch failed to received complaint page data', () => {
    const data = 'data';
    const expectedCall = {
      actionType: AppConstants.COMPLAINT_PAGE_FAILED_TO_RECEIVED_DATA,
      data
    };
    ComplaintPageServerActions.failedToReceive(data);
    AppDispatcher.dispatch.calledWithMatch(expectedCall).should.be.true();
  });
});
