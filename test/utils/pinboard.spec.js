import { stub } from 'sinon';

import { PinboardFactory } from 'utils/tests/factories/pinboard';
import {
  generatePinboardUrl,
  dispatchFetchPinboardPageData,
  dispatchFetchPinboardPinnedItems,
  isEmptyPinboard,
  getRequestPinboard,
  isPinboardFeatureEnabled,
  redirectToCreatedPinboard,
} from 'utils/pinboard';
import {
  fetchPinboardSocialGraph,
  fetchPinboardGeographic,
  fetchFirstPagePinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  fetchComplaintSummary,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
} from 'actions/pinboard';
import config from 'config';
import browserHistory from 'utils/history';


describe('pinboard utils', function () {
  describe('generatePinboardUrl', function () {
    it('should return empty string if pinboard is null or pinboard id is not defined', function () {
      generatePinboardUrl(null).should.be.equal('');
    });

    it('should return correct url', function () {
      generatePinboardUrl({
        id: '5cd06f2b',
        title: 'Title',
      }).should.be.equal('/pinboard/5cd06f2b/title/');

      generatePinboardUrl({
        id: '5cd06f2b',
        title: '',
      }).should.be.equal('/pinboard/5cd06f2b/untitled-pinboard/');
    });
  });

  describe('dispatchFetchPinboardPageData', function () {
    it('should dispatch correct actions', function () {
      const store = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
              }),
            },
          };
        },
        dispatch: stub().usingPromise(Promise).resolves('abc'),
      };
      dispatchFetchPinboardPageData(store, '66ef1560');

      store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardGeographic());
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '66ef1560' }));
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '66ef1560' }));

      store.dispatch.should.be.calledWith(fetchComplaintSummary('66ef1560'));

      store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('66ef1560'));
    });
  });

  describe('dispatchFetchPinboardPinnedItems', function () {
    it('should dispatch correct actions', function () {
      const store = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
              }),
            },
          };
        },
        dispatch: stub().usingPromise(Promise).resolves('abc'),
      };
      dispatchFetchPinboardPinnedItems(store, '66ef1560');

      store.dispatch.should.be.calledWith(fetchPinboardComplaints('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardOfficers('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardTRRs('66ef1560'));
    });
  });

  describe('isEmptyPinboard', function () {
    it('should return true if pinboard is empty', function () {
      const pinboard = {
        id: 'abcd1234',
        officerIds: [],
        crids: [],
        trrIds: [],
      };
      isEmptyPinboard(pinboard).should.be.true();
    });

    it('should return false if pinboard is not empty', function () {
      const pinboard = {
        id: 'abcd1234',
        officerIds: [1],
        crids: [],
        trrIds: [],
      };
      isEmptyPinboard(pinboard).should.be.false();
    });
  });

  describe('getRequestPinboard', function () {
    it('should return default pinboard', function () {
      getRequestPinboard({}).should.deepEqual({
        id: null,
        title: '',
        officerIds: [],
        crids: [],
        trrIds: [],
        description: '',
      });
    });

    it('should return correct requested pinboard', function () {
      const pinboard = {
        'id': 'abcd1234',
        'title': 'Pinboard Title',
        'officer_ids': [1, 2, 3],
        'crids': ['123456'],
        'trr_ids': [4, 5, 6],
        'description': 'Pinboard Description',
      };
      getRequestPinboard(pinboard).should.deepEqual({
        id: 'abcd1234',
        title: 'Pinboard Title',
        officerIds: ['1', '2', '3'],
        crids: ['123456'],
        trrIds: ['4', '5', '6'],
        description: 'Pinboard Description',
      });
    });
  });

  describe('isPinboardFeatureEnabled', function () {
    context('pinboard feature is disabled', function () {
      it('should return false', function () {
        stub(config.enableFeatures, 'pinboard').value(false);
        isPinboardFeatureEnabled().should.be.false();
      });
    });

    context('pinboard feature is enabled', function () {
      it('should return false', function () {
        stub(config.enableFeatures, 'pinboard').value(true);
        isPinboardFeatureEnabled().should.be.true();
      });
    });
  });

  describe('redirectToCreatedPinboard', function () {
    beforeEach(function () {
      this.browserHistoryPush = stub(browserHistory, 'push');
    });

    it('should redirect to pinboard url', function () {
      redirectToCreatedPinboard({
        payload: {
          id: '5cd06f2b',
          title: 'Pinboard title',
        },
      });
      this.browserHistoryPush.should.be.calledWith('/pinboard/5cd06f2b/pinboard-title/');
    });

    it('should not redirect if pinboard null', function () {
      redirectToCreatedPinboard({
        payload: null,
      });
      this.browserHistoryPush.should.not.be.called();
    });

    it('should not redirect if pinboard id is null', function () {
      redirectToCreatedPinboard({
        payload: {
          title: 'Pinboard title',
        },
      });
      this.browserHistoryPush.should.not.be.called();
    });
  });
});
