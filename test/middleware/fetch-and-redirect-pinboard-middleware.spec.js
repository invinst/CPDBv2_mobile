import { Promise } from 'es6-promise';
import { stub } from 'sinon';
import { CancelToken } from 'axios';
import { LOCATION_CHANGE } from 'connected-react-router';

import browserHistory from 'utils/history';
import fetchAndRedirectPinboardMiddleware from 'middleware/fetch-and-redirect-pinboard-middleware';
import { PinboardFactory } from 'utils/tests/factories/pinboard';
import {
  fetchPinboard,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardSocialGraph,
  fetchFirstPagePinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchComplaintSummary,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
  REMOVE_PINBOARD_REQUEST_SUCCESS,
} from 'actions/pinboard';


describe('fetchAndRedirectPinboardMiddleware', function () {
  const checkFetchPinboardData = (dispatch, pinboardId) => {
    dispatch.callCount.should.equal(11);
    dispatch.should.be.calledWith(fetchPinboardComplaints(pinboardId));
    dispatch.should.be.calledWith(fetchPinboardOfficers(pinboardId));
    dispatch.should.be.calledWith(fetchPinboardTRRs(pinboardId));
    dispatch.should.be.calledWith(fetchPinboardSocialGraph(pinboardId));
    dispatch.should.be.calledWith(fetchComplaintSummary(pinboardId));
    dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': pinboardId }));
    dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': pinboardId }));
    dispatch.should.be.calledWith(fetchPinboardRelevantDocuments(pinboardId));
    dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals(pinboardId));
    dispatch.should.be.calledWith(fetchPinboardRelevantComplaints(pinboardId));
  };

  const createStore = (pinboard, pathname='', toasts=[], pinboards=[]) => ({
    getState: () => {
      return {
        pinboardPage: {
          pinboard,
          pinboards,
        },
        toasts: toasts,
      };
    },
    dispatch: stub().usingPromise(Promise).resolves('abc'),
  });

  beforeEach(function () {
    stub(CancelToken, 'source');
  });

  describe('handling LOCATION_CHANGE', function () {
    beforeEach(function () {
      const pinboard = PinboardFactory.build({
        'id': '2bd40cf2',
        'officer_ids': [123, 456],
        'isPinboardRestored': true,
      });
      const toasts = [
        {
          name: 'OFFICER',
          template: '{full_name} {action_type} pinboard',
        },
        {
          name: 'CR',
          template: 'CR #{crid} {action_type} pinboard',
        },
        {
          name: 'TRR',
          template: 'TRR #{id} {action_type} pinboard',
        },
      ];
      this.store = createStore(pinboard, '', toasts);
    });

    it('should dispatch fetchPinboard when go to new pinboard page', function () {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: { pathname: '/pinboard/5cd06f2b/' },
          action: 'PUSH',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      this.store.dispatch.should.be.calledOnce();
      this.store.dispatch.should.be.calledWith(fetchPinboard('5cd06f2b'));
    });

    it('should dispatch fetch pinboard data when go to current pinboard page', function () {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: { pathname: '/pinboard/2bd40cf2/' },
          action: 'PUSH',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      checkFetchPinboardData(this.store.dispatch, '2bd40cf2');
    });

    it('should not dispatch fetchPinboard after redirect pinboard', function () {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: { pathname: '/pinboard/5cd06f2b/' },
          action: 'REPLACE',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      this.store.dispatch.should.not.be.called();
    });

    it('should not fetch pinboard data after replace the pinboard title postfix', function () {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: { pathname: '/pinboard/2bd40cf2/pinboard-title/' },
          action: 'REPLACE',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      this.store.dispatch.should.not.be.called();
    });
  });

  describe('handling PINBOARD_FETCH_REQUEST_SUCCESS', function () {
    beforeEach(function () {
      stub(browserHistory, 'replace');
      stub(browserHistory, 'location').value({ pathname: '/pinboard/2bd40cf2/old-title/' });
      this.store = createStore();
    });

    it('should fetch pinboard data if being on pinboard page', function () {
      const action = {
        type: PINBOARD_FETCH_REQUEST_SUCCESS,
        payload: {
          id: '2bd40cf2',
          title: 'Old title',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      browserHistory.replace.should.not.be.called();

      checkFetchPinboardData(this.store.dispatch, '2bd40cf2');
    });

    it('should fetch pinboard data with new id and replace location when new pinboard was returned', function () {
      const action = {
        type: PINBOARD_FETCH_REQUEST_SUCCESS,
        payload: {
          id: '5cd06f2b',
          title: 'New pinboard title',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      browserHistory.replace.should.be.calledOnce();
      browserHistory.replace.should.be.calledWith('/pinboard/5cd06f2b/new-pinboard-title/');

      checkFetchPinboardData(this.store.dispatch, '5cd06f2b');
    });

    it('should correct pinboard pathname with the return pinboard title', function () {
      const action = {
        type: PINBOARD_FETCH_REQUEST_SUCCESS,
        payload: {
          id: '5cd06f2b',
          title: 'New title',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      browserHistory.replace.should.be.calledOnce();
      browserHistory.replace.should.be.calledWith('/pinboard/5cd06f2b/new-title/');
      checkFetchPinboardData(this.store.dispatch, '5cd06f2b');
    });

    it('should do nothing if not being on a pinboard page', function () {
      stub(browserHistory, 'location').value({ pathname: '/search/' });

      const action = {
        type: PINBOARD_FETCH_REQUEST_SUCCESS,
        payload: {
          id: '5cd06f2b',
          title: 'Old title',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      browserHistory.replace.should.not.be.called();
      this.store.dispatch.should.not.be.called();
    });
  });

  describe('handling PINBOARD_CREATE_REQUEST_SUCCESS', function () {
    beforeEach(function () {
      stub(browserHistory, 'replace');
      stub(browserHistory, 'location').value({ pathname: '/pinboard/' });
      this.store = createStore();
    });

    it('should fetch new pinboard data and replace location', function () {
      const action = {
        type: PINBOARD_CREATE_REQUEST_SUCCESS,
        payload: {
          id: '5cd06f2b',
          title: '',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      browserHistory.replace.should.be.calledOnce();
      browserHistory.replace.should.be.calledWith('/pinboard/5cd06f2b/untitled-pinboard/');

      checkFetchPinboardData(this.store.dispatch, '5cd06f2b');
    });
  });

  describe('handling PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS', function () {
    beforeEach(function () {
      stub(browserHistory, 'replace');
      stub(browserHistory, 'location').value({ pathname: '/pinboard/' });
      this.store = createStore();
    });

    it('should fetch pinboard data with new id and replace location when new pinboard was returned', function () {
      const action = {
        type: PINBOARD_CREATE_REQUEST_SUCCESS,
        payload: {
          id: '5cd06f2b',
          title: '',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      browserHistory.replace.should.be.calledOnce();
      browserHistory.replace.should.be.calledWith('/pinboard/5cd06f2b/untitled-pinboard/');

      checkFetchPinboardData(this.store.dispatch, '5cd06f2b');
    });

    it('should do nothing no pinboard is returned', function () {
      const action = {
        type: PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
        payload: {},
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      browserHistory.replace.should.not.be.called();
      this.store.dispatch.should.not.be.called();
    });

    it('should do nothing if not being on a pinboard page', function () {
      stub(browserHistory, 'location').value({ pathname: '/search/' });

      const action = {
        type: PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
        payload: {
          id: '5cd06f2b',
          title: 'Old title',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      browserHistory.replace.should.not.be.called();
      this.store.dispatch.should.not.be.called();
    });
  });

  describe('handling PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS', function () {
    beforeEach(function () {
      stub(browserHistory, 'replace');
      stub(browserHistory, 'location').value({ pathname: '/pinboard/' });
      this.store = createStore();
    });

    it('should fetch pinboard data with new id and replace location when new pinboard was returned', function () {
      const action = {
        type: PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
        payload: {
          id: '5cd06f2b',
          title: '',
        },
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      browserHistory.replace.should.be.calledOnce();
      browserHistory.replace.should.be.calledWith('/pinboard/5cd06f2b/untitled-pinboard/');

      checkFetchPinboardData(this.store.dispatch, '5cd06f2b');
    });

    it('should do nothing no pinboard is returned', function () {
      const action = {
        type: PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
        payload: {},
      };

      let dispatched;
      fetchAndRedirectPinboardMiddleware(this.store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      browserHistory.replace.should.not.be.called();
      this.store.dispatch.should.not.be.called();
    });
  });

  describe('handling REMOVE_PINBOARD_REQUEST_SUCCESS', function () {
    beforeEach(function () {
      stub(browserHistory, 'replace');
      stub(browserHistory, 'push');
    });

    context('remove current pinboard', function () {
      let action;
      beforeEach(function () {
        action = {
          type: REMOVE_PINBOARD_REQUEST_SUCCESS,
          request: { url: 'http://localhost:8000/api/v2/mobile/pinboards/ab72f2/' },
        };
      });

      context('current pinboard is last pinboard', function () {
        it('should redirect to /pinboard/', function () {
          const store = createStore({ id: 'ab72f2' }
            , '',
            [],
            []
          );
          let dispatched;

          fetchAndRedirectPinboardMiddleware(store)(action => dispatched = action)(action);
          dispatched.should.eql(action);

          browserHistory.push.should.be.calledOnce();
          browserHistory.push.should.be.calledWith('/pinboard/');
          browserHistory.replace.should.not.be.called();
        });
      });

      context('current pinboard is not last pinboard', function () {
        it('should redirect to most recent viewed pinboard', function () {
          const store = createStore({ id: 'ab72f2' }
            , '',
            [],
            [{ id: '63f12b', title: 'Recent Pinboard' }, { id: 'ab23f7', title: 'Other pinboard' }]
          );
          let dispatched;

          fetchAndRedirectPinboardMiddleware(store)(action => dispatched = action)(action);
          dispatched.should.eql(action);

          browserHistory.push.should.be.calledOnce();
          browserHistory.push.should.be.calledWith('/pinboard/63f12b/recent-pinboard/');
          browserHistory.replace.should.not.be.called();
        });
      });
    });

    context('remove not current pinboard', function () {
      it('should no redirect', function () {
        const store = createStore({ id: 'ab72f2' }
          , '',
          [],
          [{ id: 'ac12f9' }, { id: '123f98' }, { id: '35ac4f' }]
        );
        const action = {
          type: REMOVE_PINBOARD_REQUEST_SUCCESS,
          request: { url: 'http://localhost:8000/api/v2/mobile/pinboards/ac12f9/' },
        };
        let dispatched;
        fetchAndRedirectPinboardMiddleware(store)(action => dispatched = action)(action);
        dispatched.should.eql(action);

        browserHistory.push.should.not.be.called();
        browserHistory.replace.should.not.be.called();
      });
    });
  });
});
