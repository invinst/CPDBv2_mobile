import { Promise } from 'es6-promise';
import { stub } from 'sinon';
import { browserHistory } from 'react-router';

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
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS, PINBOARD_CREATE_REQUEST_SUCCESS,
} from 'actions/pinboard';


describe('fetchAndRedirectPinboardMiddleware', function () {
  const createStore = (pinboard, pathname='') => ({
    getState: () => {
      return {
        pinboardPage: {
          pinboard,
        },
      };
    },
    dispatch: stub().usingPromise(Promise).resolves('abc'),
  });

  describe('handling @@router/LOCATION_CHANGE', function () {
    it('should dispatch fetchPinboard when go to new pinboard page', function () {
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/pinboard/5cd06f2b/',
          action: 'PUSH',
        },
      };
      const store = createStore(PinboardFactory.build({
        'id': '2bd40cf2',
        'officer_ids': [123, 456],
        'isPinboardRestored': true,
      }));

      let dispatched;
      fetchAndRedirectPinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledOnce();
      store.dispatch.should.be.calledWith(fetchPinboard('5cd06f2b'));
    });

    it('should dispatch fetch pinboard data when go to current pinboard page', function () {
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/pinboard/2bd40cf2/',
          action: 'PUSH',
        },
      };
      const store = createStore(PinboardFactory.build({
        'id': '2bd40cf2',
        'officer_ids': [123, 456],
        'isPinboardRestored': true,
      }));

      let dispatched;
      fetchAndRedirectPinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.callCount.should.equal(10);
      store.dispatch.should.be.calledWith(fetchPinboardComplaints('2bd40cf2'));
      store.dispatch.should.be.calledWith(fetchPinboardOfficers('2bd40cf2'));
      store.dispatch.should.be.calledWith(fetchPinboardTRRs('2bd40cf2'));
      store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('2bd40cf2'));
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '2bd40cf2' }));
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '2bd40cf2' }));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('2bd40cf2'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('2bd40cf2'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('2bd40cf2'));
    });

    it('should not dispatch fetchPinboard after redirect pinboard', function () {
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/pinboard/5cd06f2b/',
          action: 'REPLACE',
        },
      };
      const store = createStore(PinboardFactory.build({
        'id': '2bd40cf2',
        'officer_ids': [123, 456],
        'isPinboardRestored': true,
      }));

      let dispatched;
      fetchAndRedirectPinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.called();
    });

    it('should not fetch pinboard data after replace the pinboard title postfix', function () {
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/pinboard/2bd40cf2/pinboard-title/',
          action: 'REPLACE',
        },
      };
      const store = createStore(PinboardFactory.build({
        'id': '2bd40cf2',
        'title': 'Pinboard title',
        'officer_ids': [123, 456],
        'isPinboardRestored': true,
      }));

      let dispatched;
      fetchAndRedirectPinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.called();
    });
  });

  describe('handling PINBOARD_FETCH_REQUEST_SUCCESS', function () {
    beforeEach(function () {
      stub(browserHistory, 'replace');
      stub(browserHistory, 'getCurrentLocation').returns({ pathname: '/pinboard/2bd40cf2/old-title/' });
      this.store = createStore();
    });

    afterEach(function () {
      browserHistory.replace.restore();
      browserHistory.getCurrentLocation.restore();
      this.store.dispatch.resetHistory();
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

      this.store.dispatch.callCount.should.equal(10);
      this.store.dispatch.should.be.calledWith(fetchPinboardComplaints('2bd40cf2'));
      this.store.dispatch.should.be.calledWith(fetchPinboardOfficers('2bd40cf2'));
      this.store.dispatch.should.be.calledWith(fetchPinboardTRRs('2bd40cf2'));
      this.store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('2bd40cf2'));
      this.store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '2bd40cf2' }));
      this.store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '2bd40cf2' }));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('2bd40cf2'));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('2bd40cf2'));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('2bd40cf2'));
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

      this.store.dispatch.callCount.should.equal(10);
      this.store.dispatch.should.be.calledWith(fetchPinboardComplaints('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardOfficers('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardTRRs('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '5cd06f2b' }));
      this.store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '5cd06f2b' }));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('5cd06f2b'));
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
      this.store.dispatch.callCount.should.equal(10);
    });

    it('should do nothing if not being on a pinboard page', function () {
      browserHistory.getCurrentLocation.restore();
      stub(browserHistory, 'getCurrentLocation').returns({ pathname: '/search/' });

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
      stub(browserHistory, 'getCurrentLocation').returns({ pathname: '/pinboard/' });
      this.store = createStore();
    });

    afterEach(function () {
      browserHistory.replace.restore();
      browserHistory.getCurrentLocation.restore();
      this.store.dispatch.resetHistory();
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

      this.store.dispatch.callCount.should.equal(10);
      this.store.dispatch.should.be.calledWith(fetchPinboardComplaints('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardOfficers('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardTRRs('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '5cd06f2b' }));
      this.store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '5cd06f2b' }));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('5cd06f2b'));
    });
  });

  describe('handling PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS', function () {
    beforeEach(function () {
      stub(browserHistory, 'replace');
      stub(browserHistory, 'getCurrentLocation').returns({ pathname: '/pinboard/' });
      this.store = createStore();
    });

    afterEach(function () {
      browserHistory.replace.restore();
      browserHistory.getCurrentLocation.restore();
      this.store.dispatch.resetHistory();
    });

    it('should fetch pinboard data with new id and replace location when new pinboard was returned', function () {
      const action = {
        type: PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
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

      this.store.dispatch.callCount.should.equal(10);
      this.store.dispatch.should.be.calledWith(fetchPinboardComplaints('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardOfficers('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardTRRs('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '5cd06f2b' }));
      this.store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '5cd06f2b' }));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('5cd06f2b'));
      this.store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('5cd06f2b'));
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
      browserHistory.getCurrentLocation.restore();
      stub(browserHistory, 'getCurrentLocation').returns({ pathname: '/search/' });

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
});
