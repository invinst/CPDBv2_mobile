import AppConstants from 'constants/AppConstants';
import AppDispatcher from 'components/Dispatcher';
import ComplaintPageStore from 'stores/ComplaintPage/ComplaintPageStore';
require('should');


describe('ComplaintPageStore', () => {
  const callback = AppDispatcher.getCallback(ComplaintPageStore.dispatcherToken);

  it('updates when received complaint page data', () => {
    const crid = 'crid';
    const data = { 'allegation': { 'crid': crid } };
    let newState;


    ComplaintPageStore.updateState('loading', true);

    callback({
      actionType: AppConstants.COMPLAINT_PAGE_RECEIVED_DATA,
      data
    });

    newState = ComplaintPageStore.getState();
    newState.crid.should.equal(crid);
    newState.data.should.equal(data);
    newState.loading.should.be.false();
    newState.found.should.be.true();
  });

  it('updates found to false if failed to receive complaint page data', () => {
    const crid = 'crid';
    let newState;

    ComplaintPageStore.updateState('loading', true);
    ComplaintPageStore.updateState('found', true);

    callback({
      actionType: AppConstants.COMPLAINT_PAGE_FAILED_TO_RECEIVED_DATA,
      data: crid
    });

    newState = ComplaintPageStore.getState();
    newState.crid.should.equal(crid);
    newState.loading.should.be.false();
    newState.found.should.be.false();
  });

  it('updates toggle to true if toggle page open', () => {
    let newState;

    ComplaintPageStore.updateState('toggle', false);

    callback({
      actionType: AppConstants.TOGGLE_PAGE_OPEN
    });

    newState = ComplaintPageStore.getState();
    newState.toggle.should.be.true();
  });

  it('updates toggle to false if toggle page close', () => {
    let newState;

    ComplaintPageStore.updateState('toggle', true);

    callback({
      actionType: AppConstants.TOGGLE_PAGE_CLOSE
    });

    newState = ComplaintPageStore.getState();
    newState.toggle.should.be.false();
  });

  it('updates toggle to false if reset state', () => {
    let newState;

    ComplaintPageStore.updateState('toggle', true);

    callback({
      actionType: AppConstants.RESET_STATE
    });

    newState = ComplaintPageStore.getState();
    newState.toggle.should.be.false();
  });
});
