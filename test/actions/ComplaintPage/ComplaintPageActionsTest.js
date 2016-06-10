import ComplaintPageActions from 'actions/ComplaintPage/ComplaintPageActions';
import AppConstants from 'constants/AppConstants';
import AppDispatcher from 'components/Dispatcher';

import should from 'should';


describe('ComplaintPageActions', () => {
  it('dispatch toggle open event', () => {
    const expectedCall = {
      actionType: AppConstants.TOGGLE_PAGE_OPEN
    };
    ComplaintPageActions.toggleOpen();
    AppDispatcher.dispatch.calledWithMatch(expectedCall).should.be.true();
  });

  it('dispatch toggle close event', () => {
    const expectedCall = {
      actionType: AppConstants.TOGGLE_PAGE_CLOSE
    };
    ComplaintPageActions.toggleClose();
    AppDispatcher.dispatch.calledWithMatch(expectedCall).should.be.true();
  });

  it('dispatch reset state event', () => {
    const expectedCall = {
      actionType: AppConstants.RESET_STATE
    };
    ComplaintPageActions.resetState();
    AppDispatcher.dispatch.calledWithMatch(expectedCall).should.be.true();
  });
});
