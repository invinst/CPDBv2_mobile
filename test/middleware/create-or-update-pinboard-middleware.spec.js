import { Promise } from 'es6-promise';
import { stub, spy } from 'sinon';
import { browserHistory } from 'react-router';

import createOrUpdatePinboardMiddleware from 'middleware/create-or-update-pinboard-middleware';
import {
  createPinboard,
  updatePinboard,
  fetchPinboard,
  fetchPinboardSocialGraph,
  fetchPinboardGeographicData,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  fetchPinboardRelevantDocuments,
  ADD_ITEM_TO_PINBOARD,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  fetchPinboardOfficers,
  fetchPinboardComplaints,
  fetchPinboardTRRs,
} from 'actions/pinboard';
import { OwnedPinboardFactory } from 'utils/tests/factories/pinboard';


describe('create-or-update-pinboard-middleware', function () {
  const createStore = (pinboard, pathname='') => ({
    getState: () => {
      return {
        pinboard,
        routing: { locationBeforeTransitions: { pathname } }
      };
    },
    dispatch: stub().usingPromise(Promise).resolves('abc')
  });

  const createAddItemToPinboardAction = (item) => ({
    type: ADD_ITEM_TO_PINBOARD,
    payload: {
      id: item.id,
      type: item.type,
      isPinned: item.isPinned,
    }
  });

  const createRemoveItemInPinboardPageAction = (item) => ({
    type: REMOVE_ITEM_IN_PINBOARD_PAGE,
    payload: {
      id: item.id,
      type: item.type,
      isPinned: item.isPinned,
    }
  });

  it('should not dispatch any action if action is not adding or removing items', function () {
    const action = {
      type: 'other action'
    };
    const store = createStore();
    let dispatched;

    createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.called.should.be.false();
  });

  it('should dispatch createPinboard action if a first CR item is added to pinboard', function () {
    const action = createAddItemToPinboardAction({
      id: '1',
      type: 'CR',
      isPinned: false,
    });
    const store = createStore(OwnedPinboardFactory.build());
    let dispatched;

    createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(createPinboard({
      id: null,
      title: '',
      officerIds: [],
      crids: ['1'],
      trrIds: [],
      description: '',
      url: '',
      itemsCount: 0,
      ownedByCurrentUser: false,
    })).should.be.true();
  });

  it('should dispatch createPinboard action if a first OFFICER item is added to pinboard', function () {
    const action = createAddItemToPinboardAction({
      id: '1',
      type: 'OFFICER',
      isPinned: false,
    });
    const store = createStore(OwnedPinboardFactory.build());
    let dispatched;

    createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(createPinboard({
      id: null,
      title: '',
      officerIds: ['1'],
      crids: [],
      trrIds: [],
      description: '',
      url: '',
      itemsCount: 0,
      ownedByCurrentUser: false,
    })).should.be.true();
  });

  it('should dispatch createPinboard action if a first TRR item is added to pinboard', function () {
    const action = createAddItemToPinboardAction({
      id: '1',
      type: 'TRR',
      isPinned: false,
    });
    const store = createStore(OwnedPinboardFactory.build());
    let dispatched;

    createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(createPinboard({
      id: null,
      title: '',
      officerIds: [],
      crids: [],
      trrIds: ['1'],
      description: '',
      url: '',
      itemsCount: 0,
      ownedByCurrentUser: false,
    })).should.be.true();
  });

  it('should handle PINBOARD_CREATE_REQUEST_SUCCESS when on pinboard page', function () {
    spy(browserHistory, 'push');

    const store = createStore(OwnedPinboardFactory.build(), '/pinboard/abc123/');
    const action = { type: PINBOARD_CREATE_REQUEST_SUCCESS, payload: { id: 'def456' } };
    createOrUpdatePinboardMiddleware(store)(() => {})(action);
    browserHistory.push.should.be.calledWith('/pinboard/def456/');

    browserHistory.push.restore();
  });

  it('should not handle PINBOARD_CREATE_REQUEST_SUCCESS when not on pinboard page', function () {
    spy(browserHistory, 'push');

    const store = createStore(OwnedPinboardFactory.build(), '/not-pinboard/abc123/');
    const action = { type: PINBOARD_CREATE_REQUEST_SUCCESS, payload: { id: 'def456' } };
    createOrUpdatePinboardMiddleware(store)(() => {})(action);
    browserHistory.push.should.not.be.called();

    browserHistory.push.restore();
  });

  it('should handle PINBOARD_UPDATE_REQUEST_SUCCESS when on pinboard page', function () {
    const store = createStore(OwnedPinboardFactory.build(), '/pinboard/abc123/');
    const action = { type: PINBOARD_UPDATE_REQUEST_SUCCESS, payload: { id: 'def456' } };
    createOrUpdatePinboardMiddleware(store)(() => {})(action);

    store.dispatch.should.be.calledWith(fetchPinboard('def456'));
    store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('def456'));
    store.dispatch.should.be.calledWith(fetchPinboardGeographicData('def456'));
    store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('def456'));
    store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('def456'));
    store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('def456'));
    store.dispatch.should.be.calledWith(fetchPinboardOfficers('def456'));
    store.dispatch.should.be.calledWith(fetchPinboardComplaints('def456'));
    store.dispatch.should.be.calledWith(fetchPinboardTRRs('def456'));
  });

  it('should not handle PINBOARD_UPDATE_REQUEST_SUCCESS when not on pinboard page', function () {
    const store = createStore(OwnedPinboardFactory.build(), '/not-pinboard/abc123/');
    const action = { type: PINBOARD_UPDATE_REQUEST_SUCCESS, payload: { id: 'def456' } };
    createOrUpdatePinboardMiddleware(store)(() => {})(action);

    store.dispatch.should.not.be.called();
  });

  context('when an item is added', function () {
    it('should dispatch updatePinboard if user owns the pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'CR',
        isPinned: false,
      });
      const store = createStore(OwnedPinboardFactory.build({
        id: '99',
        crids: ['2'],
        ownedByCurrentUser: true,
      }));
      let dispatched;

      createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(updatePinboard({
        id: '99',
        title: '',
        crids: ['2', '1'],
        officerIds: [],
        trrIds: [],
        description: '',
        url: '',
        itemsCount: 1,
        ownedByCurrentUser: true,
      })).should.be.true();
    });

    it('should dispatch createPinboard if user does not own the pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'OFFICER',
        isPinned: false,
      });
      const store = createStore(OwnedPinboardFactory.build({
        id: '99',
        'officer_ids': ['2'],
        ownedByCurrentUser: false,
      }));
      let dispatched;

      createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(createPinboard({
        id: '99',
        title: '',
        description: '',
        crids: [],
        officerIds: ['2', '1'],
        trrIds: [],
        url: '',
        itemsCount: 1,
        ownedByCurrentUser: false,
      })).should.be.true();
    });
  });

  context('when an item is removed', function () {
    it('should dispatch updatePinboard if user owns the pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'CR',
        isPinned: true,
      });
      const store = createStore(OwnedPinboardFactory.build({
        id: '99',
        crids: ['2', '1'],
        'officer_ids': ['a'],
        'trr_ids': ['1'],
        ownedByCurrentUser: true,
      }));
      let dispatched;

      createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(updatePinboard({
        id: '99',
        title: '',
        description: '',
        crids: ['2'],
        officerIds: ['a'],
        trrIds: ['1'],
        url: '',
        itemsCount: 4,
        ownedByCurrentUser: true,
      })).should.be.true();
    });

    it('should dispatch createPinboard if user does not own the pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: 'b',
        type: 'OFFICER',
        isPinned: true,
      });
      const store = createStore(OwnedPinboardFactory.build({
        id: '99',
        crids: ['1'],
        'officer_ids': ['a'],
        'trr_ids': ['1'],
        ownedByCurrentUser: false,
      }));
      let dispatched;

      createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(createPinboard({
        id: '99',
        title: '',
        description: '',
        crids: ['1'],
        officerIds: ['a'],
        trrIds: ['1'],
        url: '',
        itemsCount: 3,
        ownedByCurrentUser: false,
      })).should.be.true();
    });
  });

  context('when an item is removed from pinboard page', function () {
    it('should dispatch updatePinboard if user owns the pinboard', function () {
      const action = createRemoveItemInPinboardPageAction({
        id: '1',
        type: 'CR',
        isPinned: true,
      });
      const store = createStore(OwnedPinboardFactory.build({
        id: '99',
        crids: ['2', '1'],
        'officer_ids': ['a'],
        'trr_ids': ['1'],
        ownedByCurrentUser: true,
      }));
      let dispatched;

      createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(updatePinboard({
        id: '99',
        title: '',
        description: '',
        crids: ['2'],
        officerIds: ['a'],
        trrIds: ['1'],
        url: '',
        itemsCount: 3,
        ownedByCurrentUser: true,
      })).should.be.true();
    });

    it('should dispatch createPinboard if user does not own the pinboard', function () {
      const action = createRemoveItemInPinboardPageAction({
        id: 'b',
        type: 'OFFICER',
        isPinned: true,
      });
      const store = createStore(OwnedPinboardFactory.build({
        id: '99',
        crids: ['1'],
        'officer_ids': ['a'],
        'trr_ids': ['1'],
        ownedByCurrentUser: false,
      }));
      let dispatched;

      createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(createPinboard({
        id: '99',
        title: '',
        description: '',
        crids: ['1'],
        officerIds: ['a'],
        trrIds: ['1'],
        url: '',
        itemsCount: 2,
        ownedByCurrentUser: false,
      })).should.be.true();
    });
  });
});
