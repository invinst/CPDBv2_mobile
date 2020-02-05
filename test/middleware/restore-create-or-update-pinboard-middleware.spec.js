import { Promise } from 'es6-promise';
import sinon from 'sinon';
import { browserHistory } from 'react-router';

import restoreCreateOrUpdatePinboardMiddleware from 'middleware/restore-create-or-update-pinboard-middleware';
import {
  ADD_OR_REMOVE_ITEM_IN_PINBOARD,
  ADD_ITEM_IN_PINBOARD_PAGE,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
  SAVE_PINBOARD,
  UPDATE_PINBOARD_INFO,
  createPinboard,
  updatePinboard,
  orderPinboardState,
  savePinboard,
  addItemToPinboardState,
  removeItemFromPinboardState,
  fetchPinboardSocialGraph,
  fetchFirstPagePinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  updatePinboardInfoState,
  performFetchPinboardRelatedData,
  fetchLatestRetrievedPinboard,
} from 'actions/pinboard';
import { PinboardFactory } from 'utils/tests/factories/pinboard';
import { Toastify } from 'utils/toastify';
import extractQuery from 'utils/extract-query';
import toastStyles from 'utils/toast.sass';
import * as ToastUtils from 'utils/toast';
import { CancelToken } from 'axios/index';


describe('restoreCreateOrUpdatePinboardMiddleware middleware', function () {
  const createStore = (pinboard, pathname='', dispatchResults='abc') => ({
    getState: () => {
      return {
        pinboardPage: {
          pinboard,
        },
        routing: { locationBeforeTransitions: { pathname } },
      };
    },
    dispatch: sinon.stub().usingPromise(Promise).resolves(dispatchResults),
  });

  beforeEach(function () {
    sinon.stub(CancelToken, 'source');
    sinon.stub(window, 'addEventListener');
  });

  afterEach(function () {
    Toastify.toast.resetHistory();
  });

  it('should not dispatch any action if action is not adding or removing items', function () {
    const action = {
      type: 'other action',
    };
    const store = createStore();
    let dispatched;

    restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.called.should.be.false();
  });

  it('should handle UPDATE_PINBOARD_INFO and dispatch updatePinboardInfoState', function (done) {
    const action = {
      type: UPDATE_PINBOARD_INFO,
      payload: {
        'title': 'Updated Title',
        'description': 'Updated Description',
        'unit_id': '123',
      },
    };
    const store = createStore(PinboardFactory.build());
    let dispatched;
    restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(updatePinboardInfoState({
      'title': 'Updated Title',
      'description': 'Updated Description',
      'unit_id': '123',
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ORDER_PINBOARD and dispatch orderPinboardState', function (done) {
    const action = {
      type: ORDER_PINBOARD,
      payload: {
        type: 'OFFICER',
        ids: ['123', '789', '456'],
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(orderPinboardState({
      type: 'OFFICER',
      ids: ['123', '789', '456'],
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ADD_OR_REMOVE_ITEM_IN_PINBOARD and dispatch addItemToPinboardState', function (done) {
    const action = {
      type: ADD_OR_REMOVE_ITEM_IN_PINBOARD,
      payload: {
        id: '123',
        type: 'CR',
        isPinned: false,
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(addItemToPinboardState({
      id: '123',
      type: 'CR',
      isPinned: false,
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ADD_OR_REMOVE_ITEM_IN_PINBOARD and dispatch removeItemFromPinboardState', function (done) {
    const action = {
      type: ADD_OR_REMOVE_ITEM_IN_PINBOARD,
      payload: {
        id: '123',
        type: 'CR',
        isPinned: true,
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(removeItemFromPinboardState({
      id: '123',
      type: 'CR',
      isPinned: true,
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ADD_ITEM_IN_PINBOARD_PAGE and dispatch addItemToPinboardState', function (done) {
    const action = {
      type: ADD_ITEM_IN_PINBOARD_PAGE,
      payload: {
        id: '123',
        type: 'CR',
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(addItemToPinboardState({
      id: '123',
      type: 'CR',
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE and dispatch removeItemFromPinboardState', function (done) {
    const action = {
      type: REMOVE_ITEM_IN_PINBOARD_PAGE,
      payload: {
        id: '123',
        type: 'CR',
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(removeItemFromPinboardState({
      id: '123',
      type: 'CR',
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  describe('handling SAVE_PINBOARD', function () {
    it('should dispatch createPinboard', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: null,
      };
      const store = createStore(PinboardFactory.build({
        'id': null,
        'officer_ids': [123, 456],
        'trr_ids': [789],
        'crids': ['abc'],
        'saving': false,
        'hasPendingChanges': true,
      }));

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(createPinboard({
        id: null,
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: ['abc'],
        trrIds: ['789'],
      }));

      setTimeout(
        () => {
          store.dispatch.should.be.calledWith(savePinboard());
          done();
        },
        50
      );
    });

    it('should dispatch updatePinboard', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: null,
      };
      const store = createStore(PinboardFactory.build({
        'id': '66ef1560',
        'officer_ids': [123, 456],
        'saving': false,
        'hasPendingChanges': true,
      }));

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(updatePinboard({
        id: '66ef1560',
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: [],
        trrIds: [],
      }));

      setTimeout(
        () => {
          store.dispatch.should.be.calledWith(savePinboard());
          done();
        },
        50
      );
    });

    it('should dispatch nothing when saving is true', function () {
      const action = {
        type: SAVE_PINBOARD,
        payload: null,
      };
      const store = createStore(PinboardFactory.build({
        'id': '66ef1560',
        'officer_ids': [123, 456],
        'saving': true,
      }));

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.called();
    });

    it('should dispatch updatePinboard when not up to date', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123],
        }),
      };
      const store = createStore(PinboardFactory.build({
        'id': null,
        'officer_ids': [123, 456],
        'saving': false,
        'hasPendingChanges': true,
      }));

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(createPinboard({
        id: null,
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: [],
        trrIds: [],
      }));

      setTimeout(
        () => {
          store.dispatch.should.be.calledWith(savePinboard());
          done();
        },
        50
      );
    });

    it('should stop the loop if nothing else to save', function () {
      const action = {
        type: SAVE_PINBOARD,
        payload: PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123, 456],
        }),
      };
      const store = createStore(PinboardFactory.build({
        'id': '66ef1560',
        'officer_ids': [123, 456],
        'saving': false,
      }));

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.called();
    });

    it('should fetch data at end the loop when being on the pinboard page', function () {
      const action = {
        type: SAVE_PINBOARD,
        payload: PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123, 456],
        }),
      };
      const store = createStore(
        PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123, 456],
          'saving': false,
          'needRefreshData': true,
        }),
        '/pinboard/66ef1560/'
      );

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('66ef1560'));
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '66ef1560' }));
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '66ef1560' }));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('66ef1560'));
      store.dispatch.should.be.calledWith(performFetchPinboardRelatedData());
    });

    it('should retry saving on failure after 1 second', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: PinboardFactory.build({ 'id': '66ef1560' }),
      };
      const store = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
                'saving': false,
                'hasPendingChanges': true,
              }),
            },
          };
        },
        dispatch: sinon.stub().usingPromise(Promise).rejects(new Error('abc')),
      };

      const realSetTimeout = setTimeout;
      const clock = sinon.useFakeTimers();

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledOnce();
      store.dispatch.should.be.calledWith(updatePinboard({
        id: '66ef1560',
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: [],
        trrIds: [],
      }));

      realSetTimeout(
        () => {
          clock.tick(1500);

          store.dispatch.should.be.calledTwice();
          store.dispatch.should.be.calledWith(savePinboard());

          done();
        },
        50,
      );
    });

    it('should retry maximum 60 times', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: null,
      };
      const store = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
                'saving': false,
                'hasPendingChanges': true,
              }),
            },
          };
        },
        dispatch: sinon.stub().usingPromise(Promise).resolves('abc'),
      };

      restoreCreateOrUpdatePinboardMiddleware(store)(action => action)(action);

      const failingStore = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
                'saving': false,
                'hasPendingChanges': true,
              }),
            },
          };
        },
        dispatch: sinon.stub().usingPromise(Promise).rejects(new Error('abc')),
      };

      sinon.stub(ToastUtils, 'showAlertToast').returns('toast-id');
      const realSetTimeout = setTimeout;
      const clock = sinon.useFakeTimers();

      function repeatSave(count) {
        if (count < 61) {
          restoreCreateOrUpdatePinboardMiddleware(failingStore)(action => action)(action);
          realSetTimeout(
            () => {
              clock.tick(2000);
              repeatSave(count + 1);
            },
            10
          );
        } else {
          failingStore.dispatch.callCount.should.equal(121);
          ToastUtils.showAlertToast.should.be.calledOnce();
          ToastUtils.showAlertToast.should.be.calledWith('Failed to save pinboard. Click to try again!');

          // click on the toast should try to resume saving pinboard
          failingStore.dispatch.resetHistory();
          const toastOnClick = ToastUtils.showAlertToast.getCall(0).args[1];
          toastOnClick();

          failingStore.dispatch.should.be.calledOnce();
          failingStore.dispatch.should.be.calledWith(savePinboard());

          done();
        }
      }

      repeatSave(0);
    });

    it('should handling internet connection lost and retry when online back', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: null,
      };
      const connectionErrorStore = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
                'saving': false,
                'hasPendingChanges': true,
              }),
            },
          };
        },
        dispatch: sinon.stub().usingPromise(Promise).rejects(new Error('No internet connection')),
      };

      sinon.stub(ToastUtils, 'showAlertToast').returns('toast-id');
      Toastify.toast.dismiss.resetHistory();
      const onLineStub = sinon.stub(window.navigator, 'onLine').value(false);
      const realSetTimeout = setTimeout;
      const clock = sinon.useFakeTimers();

      const actionHandler = restoreCreateOrUpdatePinboardMiddleware(connectionErrorStore)(action => action);
      window.addEventListener.should.be.calledOnce();
      window.addEventListener.should.be.calledWith('online');
      const onLineCallBack = window.addEventListener.getCall(0).args[1];
      const delayNextSave = count => {
        actionHandler(action);
        realSetTimeout(
          () => {
            clock.tick(200);
            repeatSave(count + 1);
          },
          100,
        );
      };

      function repeatSave(count) {
        if (count < 3) {
          delayNextSave(count);
        } else if (count === 3) {
          // Not show retrying toast within 3 retries
          connectionErrorStore.dispatch.callCount.should.equal(6);
          ToastUtils.showAlertToast.should.not.be.called();

          connectionErrorStore.dispatch.resetHistory();
          delayNextSave(count);
        } else if (count === 4) {
          // show retrying toast at the 4th retry
          connectionErrorStore.dispatch.should.be.calledOnce();
          ToastUtils.showAlertToast.should.be.calledOnce();
          ToastUtils.showAlertToast.should.be.calledWith('Connection lost. Trying to save ...');

          connectionErrorStore.dispatch.resetHistory();
          ToastUtils.showAlertToast.resetHistory();
          delayNextSave(count);
        } else {
          // Not showing any second retrying toast
          connectionErrorStore.dispatch.should.be.calledOnce();
          ToastUtils.showAlertToast.should.not.be.called();
          Toastify.toast.dismiss.should.not.be.called();

          // saving pinboard when connection is back
          connectionErrorStore.dispatch.resetHistory();
          onLineStub.value(true);
          onLineCallBack();

          connectionErrorStore.dispatch.should.be.calledOnce();
          connectionErrorStore.dispatch.should.be.calledWith(savePinboard());
          Toastify.toast.dismiss.should.be.calledOnce();
          Toastify.toast.dismiss.should.be.calledWith('toast-id');

          // Don't try to save pinboard if there was no updates while offline
          Toastify.toast.dismiss.resetHistory();
          connectionErrorStore.dispatch.resetHistory();
          onLineStub.value(true);
          onLineCallBack();

          connectionErrorStore.dispatch.should.not.be.called();
          Toastify.toast.dismiss.should.not.be.called();

          Toastify.toast.dismiss.resetHistory();
          done();
        }
      }

      repeatSave(0);
    });

    it('should handling internet connection lost and retry when click on the toast', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: null,
      };
      const connectionErrorStore = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
                'saving': false,
                'hasPendingChanges': true,
              }),
            },
          };
        },
        dispatch: sinon.stub().usingPromise(Promise).rejects(new Error('No internet connection')),
      };

      sinon.stub(ToastUtils, 'showAlertToast').returns('toast-id');
      Toastify.toast.dismiss.resetHistory();
      sinon.stub(window.navigator, 'onLine').value(false);
      const realSetTimeout = setTimeout;
      const clock = sinon.useFakeTimers();

      const actionHandler = restoreCreateOrUpdatePinboardMiddleware(connectionErrorStore)(action => action);
      const delayNextSave = count => {
        actionHandler(action);
        realSetTimeout(
          () => {
            clock.tick(200);
            repeatSave(count + 1);
          },
          100,
        );
      };

      function repeatSave(count) {
        if (count < 3) {
          delayNextSave(count);
        } else if (count === 3) {
          // Not show retrying toast within 3 retries
          connectionErrorStore.dispatch.callCount.should.equal(6);
          ToastUtils.showAlertToast.should.not.be.called();

          connectionErrorStore.dispatch.resetHistory();
          delayNextSave(count);
        } else if (count === 4) {
          // show retrying toast at the 4th retry
          connectionErrorStore.dispatch.should.be.calledOnce();
          ToastUtils.showAlertToast.should.be.calledOnce();
          ToastUtils.showAlertToast.should.be.calledWith('Connection lost. Trying to save ...');

          // click on the toast should try to resume saving pinboard
          const toastOnClick = ToastUtils.showAlertToast.getCall(0).args[1];
          connectionErrorStore.dispatch.resetHistory();

          ToastUtils.showAlertToast.resetHistory();
          Toastify.toast.dismiss.should.not.be.called();
          toastOnClick();

          connectionErrorStore.dispatch.should.be.calledOnce();
          connectionErrorStore.dispatch.should.be.calledWith(savePinboard());
          Toastify.toast.dismiss.should.be.calledOnce();
          Toastify.toast.dismiss.should.be.calledWith('toast-id');

          Toastify.toast.dismiss.resetHistory();
          done();
        }
      }

      repeatSave(0);
    });
  });

  it('should handle @@router/LOCATION_CHANGE and do nothing if not saving and isPinboardRestored', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: { pathname: '/search/' },
    };
    const store = createStore(PinboardFactory.build({
      'id': '66ef1560',
      'officer_ids': [123, 456],
      'saving': false,
      isPinboardRestored: true,
    }));

    let dispatched;
    restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.not.be.called();
  });

  describe('Session creator', function () {
    beforeEach(function () {
      Toastify.toast.resetHistory();
    });

    const testCreatePinboardWith = (action, pathname, done) => {
      const store = createStore(
        PinboardFactory.build({
          'id': null,
          'officer_ids': [],
          'saving': false,
        }),
        pathname,
        {
          payload: {
            id: 'abc123',
            'officer_ids': [1, 3, 4, 5],
            crids: ['1053673'],
            'trr_ids': [1, 2],
          },
        }
      );

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(createPinboard({
        officerIds: [1, 3, 4, 5],
        crids: ['1053673'],
        trrIds: [1, 2],
      }));

      setTimeout(
        () => {
          Toastify.toast.should.not.be.called();
          done();
        },
        50
      );
    };

    it('should handle @@router/LOCATION_CHANGE with query to create pinboard but may not show toasts', function (done) {
      const pathname = '/pinboard/?officer-ids=1,3,4,5&crids=1053673&trr-ids=1,2';
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          query: {
            'officer-ids': '1,3,4,5',
            crids: '1053673',
            'trr-ids': '1,2',
          },
          pathname,
        },
      };
      testCreatePinboardWith(action, pathname, done);
    });

    it('should accept params without s', function (done) {
      const pathname = '/pinboard/?officer-id=1,3,4,5&crid=1053673&trr-id=1,2';
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          query: {
            'officer-id': '1,3,4,5',
            crid: '1053673',
            'trr-id': '1,2',
          },
          pathname,
        },
      };
      testCreatePinboardWith(action, pathname, done);
    });

    it('should accept params with under score', function (done) {
      const pathname = '/pinboard/?officer_ids=1,3,4,5&crid=1053673&trr_ids=1,2';
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          query: {
            'officer_ids': '1,3,4,5',
            crid: '1053673',
            'trr_ids': '1,2',
          },
          pathname,
        },
      };
      testCreatePinboardWith(action, pathname, done);
    });

    it('should accept camelCase params', function (done) {
      const pathname = '/pinboard/?officerId=1,3,4,5&crids=1053673&trrIds=1,2';
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          query: {
            officerId: '1,3,4,5',
            crid: '1053673',
            trrIds: '1,2',
          },
          pathname,
        },
      };
      testCreatePinboardWith(action, pathname, done);
    });

    it('should accept params with some capitalizing mistakes', function (done) {
      const pathname = '/pinboard/?officeR-ids=1,3,4,5&CRids=1053673&tRRIds=1,2';
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          query: {
            'officeR-ids': '1,3,4,5',
            CRids: '1053673',
            tRRIds: '1,2',
          },
          pathname,
        },
      };
      testCreatePinboardWith(action, pathname, done);
    });

    it('should handle @@router/LOCATION_CHANGE to create pinboard and show toast', function (done) {
      Toastify.toast.should.not.be.called();

      const pathname = '/pinboard/?officer-id=1&crids=xyz567,1053673,tyu890&trr-ids=3,99';
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          query: {
            'officer-ids': '1',
            crids: 'xyz567,1053673,tyu890',
            'trr-ids': '3,99',
          },
          pathname,
        },
      };
      const store = createStore(
        PinboardFactory.build({
          'id': null,
          'saving': false,
        }),
        pathname,
        {
          payload: {
            id: 'abc123',
            'officer_ids': [1],
            crids: ['1053673'],
            'trr_ids': [],
            'not_found_items': {
              'officer_ids': [],
              crids: ['xyz567', 'tyu890'],
              'trr_ids': [3, 99],
            },
          },
        }
      );

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(createPinboard({
        officerIds: [1],
        crids: ['xyz567', '1053673', 'tyu890'],
        trrIds: [3, 99],
      }));

      setTimeout(
        () => {
          Toastify.toast.should.be.calledTwice();
          Toastify.toast.should.be.calledWith(
            '1 out of 3 allegations were added to this pinboard. ' +
            '2 out of 3 allegation IDs could not be recognized (xyz567, tyu890).'
          );
          Toastify.toast.should.be.calledWith('2 out of 2 TRR IDs could not be recognized (3, 99).');

          done();
        },
        50);
    });

    it('should skip invalid param and show invalid param message', function (done) {
      const pathname = '/pinboard/?officer-ids=1&crids=xyz567,1053673,tyu890&trr-ids=3,99&invalid-param=1,2';
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          query: {
            'officer-ids': '1',
            crids: 'xyz567,1053673,tyu890',
            'trr-ids': '3,99',
            'invalid-param': '1,2',
          },
          pathname,
        },
      };
      const store = createStore(
        PinboardFactory.build({
          'id': null,
          'saving': false,
        }),
        pathname,
        {
          payload: {
            id: 'abc123',
            'officer_ids': [1],
            crids: ['1053673'],
            'trr_ids': [],
            'not_found_items': {
              'officer_ids': [],
              crids: ['xyz567', 'tyu890'],
              'trr_ids': [3, 99],
            },
          },
        },
      );

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(createPinboard({
        officerIds: [1],
        crids: ['xyz567', '1053673', 'tyu890'],
        trrIds: [3, 99],
      }));

      setTimeout(
        () => {
          Toastify.toast.should.be.calledThrice();
          Toastify.toast.should.be.calledWith('invalid-param is not recognized.');
          Toastify.toast.should.be.calledWith(
            '1 out of 3 allegations were added to this pinboard. ' +
            '2 out of 3 allegation IDs could not be recognized (xyz567, tyu890).',
          );
          Toastify.toast.should.be.calledWith('2 out of 2 TRR IDs could not be recognized (3, 99).');

          Toastify.toast.resetHistory();
          done();
        },
        50,
      );
    });

    it('should skip invalid params and show invalid params message', function (done) {
      const pathname = '/pinboard/?officer-ids=1&crids=xyz567,1053673,tyu890&invalid-param-a=1,2&invalid-param-b=2,1';
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          query: {
            'officer-ids': '1',
            crids: 'xyz567,1053673,tyu890',
            'invalid-param-a': '1,2',
            'invalid-param-b': '2,1',
          },
          pathname,
        },
      };
      const store = createStore(
        PinboardFactory.build({
          'id': null,
          'saving': false,
        }),
        pathname,
        {
          payload: {
            id: 'abc123',
            'officer_ids': [1],
            crids: ['1053673'],
            'trr_ids': [],
            'not_found_items': {
              'officer_ids': [],
              crids: ['xyz567', 'tyu890'],
            },
          },
        },
      );

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(createPinboard({
        officerIds: [1],
        crids: ['xyz567', '1053673', 'tyu890'],
        trrIds: [],
      }));

      setTimeout(
        () => {
          Toastify.toast.should.be.calledTwice();
          Toastify.toast.should.be.calledWith('invalid-param-a, invalid-param-b are not recognized.');
          Toastify.toast.should.be.calledWith(
            '1 out of 3 allegations were added to this pinboard. ' +
            '2 out of 3 allegation IDs could not be recognized (xyz567, tyu890).',
          );
          Toastify.toast.resetHistory();
          done();
        },
        50,
      );
    });
  });

  describe('Restore pinboard', function () {
    it('should not dispatch if pinboard is restored', function () {
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/search/',
        },
      };
      const store = createStore(PinboardFactory.build({
        'id': '2bd40cf2',
        'officer_ids': [123, 456],
        'isPinboardRestored': true,
      }));

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.called();
    });

    it('should not dispatch if location change is pinboard detail page', function () {
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/pinboard/5cd06f2b/',
        },
      };
      const store = createStore(PinboardFactory.build({
        'id': '2bd40cf2',
        'officer_ids': [123, 456],
        'isPinboardRestored': true,
      }));

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.called();
    });

    it(
      'should dispatch fetchLatestRetrievedPinboard when LOCATION_CHANGE to some page (not pinboard page)' +
      ' and pinboard has not been restored',
      function () {
        const action = {
          type: '@@router/LOCATION_CHANGE',
          payload: {
            pathname: '/search/',
          },
        };
        const store = createStore(PinboardFactory.build({
          'id': '2bd40cf2',
          'officer_ids': [123, 456],
          'isPinboardRestored': false,
        }));

        let dispatched;
        restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
        dispatched.should.eql(action);

        store.dispatch.should.be.calledOnce();
        store.dispatch.should.be.calledWith(fetchLatestRetrievedPinboard({ create: false }));
      }
    );

    it(
      'should dispatch fetchLatestRetrievedPinboard with create is true ' +
      'when LOCATION_CHANGE to pinboard page without id',
      function () {
        const action = {
          type: '@@router/LOCATION_CHANGE',
          payload: {
            pathname: '/pinboard/',
          },
        };
        const store = createStore({});

        let dispatched;
        restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
        dispatched.should.eql(action);

        store.dispatch.should.be.calledOnce();
        store.dispatch.should.be.calledWith(fetchLatestRetrievedPinboard({ create: true }));
      }
    );

    it('should not dispatch fetchLatestRetrievedPinboard if there is no pinboard id but query exists', function () {
      const pathname = '/pinboard/?officer-ids=1,3,4,5,0&crids=1053673&trr-ids=,0,1';
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname,
          query: extractQuery(pathname),
        },
      };
      const store = createStore({});

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.calledWith(fetchLatestRetrievedPinboard({ create: false }));
      store.dispatch.should.not.be.calledWith(fetchLatestRetrievedPinboard({ create: true }));
      store.dispatch.should.not.be.calledWith(fetchLatestRetrievedPinboard());
    });

    it('should fetchLatestRetrievedPinboard if there is query but not on pinboard page', function () {
      const pathname = '/search/?officer-ids=1,3,4,5,0&crids=1053673&trr-ids=,0,1';
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname,
          query: extractQuery(pathname),
        },
      };
      const store = createStore({});

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(fetchLatestRetrievedPinboard({ create: false }));
    });
  });

  describe('toast', function () {
    it('should handle ADD_OR_REMOVE_ITEM_IN_PINBOARD and show adding toast', function (done) {

      const action = {
        type: ADD_OR_REMOVE_ITEM_IN_PINBOARD,
        payload: {
          id: '123',
          type: 'CR',
          isPinned: false,
        },
      };
      const store = createStore(PinboardFactory.build({
        'id': null,
        'title': '',
      }));

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(addItemToPinboardState({
        id: '123',
        type: 'CR',
        isPinned: false,
      }));

      setTimeout(
        () => {
          const browserHistoryPush = sinon.stub(browserHistory, 'push');
          Toastify.toast.should.be.calledOnce();
          Toastify.toast.getCall(0).args[0].should.eql('CR added');
          Toastify.toast.getCall(0).args[1]['className'].should.eql(`${toastStyles.toastWrapper} added`);
          Toastify.toast.getCall(0).args[1]['transition'].should.eql(
            Toastify.cssTransition({
              enter: 'toast-enter',
              exit: 'toast-exit',
              duration: 500,
              appendPosition: true,
            }),
          );
          Toastify.toast.getCall(0).args[1]['onClick']();
          browserHistoryPush.should.be.calledWith('/pinboard/');
          Toastify.toast.resetHistory();
          done();
        },
        50
      );
    });

    it('should handle ADD_OR_REMOVE_ITEM_IN_PINBOARD and show removing toast', function (done) {
      const browserHistoryPush = sinon.stub(browserHistory, 'push');
      const action = {
        type: ADD_OR_REMOVE_ITEM_IN_PINBOARD,
        payload: {
          id: '123',
          type: 'CR',
          isPinned: true,
        },
      };
      const store = createStore(PinboardFactory.build({
        'id': '66ef1560',
        'title': 'Pinboard Title',
      }));

      let dispatched;
      restoreCreateOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(removeItemFromPinboardState({
        id: '123',
        type: 'CR',
        isPinned: true,
      }));

      setTimeout(
        () => {
          Toastify.toast.should.be.calledOnce();
          Toastify.toast.getCall(0).args[0].should.eql('CR removed');
          Toastify.toast.getCall(0).args[1]['className'].should.eql(`${toastStyles.toastWrapper} removed`);
          Toastify.toast.getCall(0).args[1]['transition'].should.eql(
            Toastify.cssTransition({
              enter: 'toast-enter',
              exit: 'toast-exit',
              duration: 500,
              appendPosition: true,
            }),
          );
          Toastify.toast.getCall(0).args[1]['onClick']();
          browserHistoryPush.should.be.calledWith('/pinboard/66ef1560/pinboard-title/');
          Toastify.toast.resetHistory();
          done();
        },
        50
      );
    });
  });
});
