import { Promise } from 'es6-promise';
import { stub } from 'sinon';

import createOrUpdatePinboardMiddleware from 'middleware/create-or-update-pinboard-middleware';
import { ADD_ITEM_TO_PINBOARD, REMOVE_ITEM_IN_PINBOARD_PAGE } from 'actions/pinboard';
import { createPinboard, updatePinboard } from 'actions/pinboard';
import { PinboardFactory } from 'utils/tests/factories/pinboard';


describe('create-or-update-pinboard-middleware', function () {
  const createStore = (pinboard) => ({
    getState: () => {
      return {
        pinboard
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

  context('handling ADD_ITEM_TO_PINBOARD action', function () {
    it('should dispatch createPinboard action if a first CR item is added to pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'CR',
        isPinned: false,
      });
      const store = createStore(PinboardFactory.build());
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
      const store = createStore(PinboardFactory.build());
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
      })).should.be.true();
    });

    it('should dispatch createPinboard action if a first TRR item is added to pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'TRR',
        isPinned: false,
      });
      const store = createStore(PinboardFactory.build());
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
      })).should.be.true();
    });

    it('should dispatch updatePinboard if succesive items are added', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'CR',
        isPinned: false,
      });
      const store = createStore(PinboardFactory.build({
        id: '99',
        crids: ['2'],
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
      })).should.be.true();
    });
  });

  context('handling REMOVE_ITEM_IN_PINBOARD_PAGE', function () {
    it('should dispatch updatePinboard if an item is removed', function () {
      const action = createRemoveItemInPinboardPageAction({
        id: '1',
        type: 'CR',
        isPinned: true,
      });
      const store = createStore(PinboardFactory.build({
        id: '99',
        crids: ['2', '1'],
        'officer_ids': ['a'],
        'trr_ids': ['1'],
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
      })).should.be.true();
    });
  });
});
