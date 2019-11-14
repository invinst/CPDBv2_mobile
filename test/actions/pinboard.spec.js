import { CancelToken } from 'axios';
import { spy, stub } from 'sinon';

import {
  createPinboard,
  updatePinboard,
  addItemToPinboardState,
  removeItemFromPinboardState,
  orderPinboardState,
  savePinboard,
  orderPinboard,
  fetchPinboard,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardSocialGraph,
  fetchFirstPagePinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchOtherPagesPinboardGeographicCrs,
  fetchOtherPagesPinboardGeographicTrrs,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  removeItemInPinboardPage,
  addItemInPinboardPage,
  fetchLatestRetrievedPinboard,
  PINBOARD_CREATE_REQUEST_START,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_FAILURE,
  PINBOARD_UPDATE_REQUEST_START,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_FAILURE,
  ADD_ITEM_TO_PINBOARD_STATE,
  REMOVE_ITEM_FROM_PINBOARD_STATE,
  ORDER_PINBOARD_STATE,
  SAVE_PINBOARD,
  ORDER_PINBOARD,
  PINBOARD_FETCH_REQUEST_START,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_FAILURE,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_CANCELLED,
  PINBOARD_OFFICERS_FETCH_REQUEST_START,
  PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
  PINBOARD_OFFICERS_FETCH_REQUEST_FAILURE,
  PINBOARD_OFFICERS_FETCH_REQUEST_CANCELLED,
  PINBOARD_TRRS_FETCH_REQUEST_START,
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRRS_FETCH_REQUEST_FAILURE,
  PINBOARD_TRRS_FETCH_REQUEST_CANCELLED,
  PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START,
  PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
  PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
  PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_CANCELLED,
  PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
  PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
  PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
  PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_CANCELLED,
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_CANCELLED,
  PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
  PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
  PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
  PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_CANCELLED,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ADD_ITEM_IN_PINBOARD_PAGE,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_FAILURE,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED,
  PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START,
  PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
  PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE,
  PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED,
  PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START,
  PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
  PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE,
  PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED,
} from 'actions/pinboard';
import constants from 'constants';
import { v2Url } from 'utils/url-util';


describe('pinboard actions', function () {
  let cancel;

  beforeEach(function () {
    cancel = spy();
    stub(CancelToken, 'source').returns({
      token: 'token',
      cancel,
    });
  });

  afterEach(function () {
    CancelToken.source.restore();
  });

  describe('removeItemInPinboardPage', function () {
    it('should return correct action', function () {
      removeItemInPinboardPage({
        id: '1234',
        type: 'OFFICER',
      }).should.deepEqual({
        type: REMOVE_ITEM_IN_PINBOARD_PAGE,
        payload: {
          id: '1234',
          type: 'OFFICER',
          isPinned: true,
        },
      });
    });
  });

  describe('addItemInPinboardPage', function () {
    it('should return correct action', function () {
      addItemInPinboardPage({
        id: '1234',
        type: 'OFFICER',
      }).should.deepEqual({
        type: ADD_ITEM_IN_PINBOARD_PAGE,
        payload: {
          id: '1234',
          type: 'OFFICER',
          isPinned: false,
        },
      });
    });
  });

  describe('createPinboard', function () {
    it('should return correct action', function () {
      createPinboard({ officerIds: [], crids: ['abc'], trrIds: ['1'] }).should.deepEqual({
        types: [
          PINBOARD_CREATE_REQUEST_START,
          PINBOARD_CREATE_REQUEST_SUCCESS,
          PINBOARD_CREATE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: v2Url(constants.PINBOARDS_API_ENDPOINT),
            method: 'POST',
            adapter: undefined,
            cancelToken: 'token',
            data: {
              'officer_ids': [],
              crids: ['abc'],
              'trr_ids': ['1'],
            },
          },
        },
      });
    });

    it('should cancel old fetch requests if new request is called', function () {
      createPinboard({ officerIds: [], crids: ['abc'], trrIds: [1] });
      createPinboard({ officerIds: [], crids: ['abc'], trrIds: [1] });
      cancel.called.should.be.true();
    });
  });

  describe('updatePinboard', function () {
    it('should return correct action', function () {
      const pinboard = {
        id: '66ef1560',
        title: 'Title',
        description: 'Description',
        officerIds: ['1'],
        crids: [],
        trrIds: [],
      };
      updatePinboard(pinboard).should.deepEqual({
        types: [
          PINBOARD_UPDATE_REQUEST_START,
          PINBOARD_UPDATE_REQUEST_SUCCESS,
          PINBOARD_UPDATE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: v2Url(`${constants.PINBOARDS_API_ENDPOINT}66ef1560/`),
            method: 'PUT',
            adapter: undefined,
            data: {
              title: 'Title',
              description: 'Description',
              'officer_ids': ['1'],
              crids: [],
              'trr_ids': [],
            },
          },
        },
      });
    });

    it('should cancel old fetch requests if new request is called', function () {
      const pinboard = {
        id: '5cd06f2b',
        title: 'Title',
        officerIds: ['1'],
        crids: [],
        trrIds: ['1'],
      };
      updatePinboard(pinboard);
      updatePinboard(pinboard);
      cancel.called.should.be.true();
    });
  });

  describe('addItemToPinboardState', function () {
    it('should return correct action', function () {
      addItemToPinboardState({
        id: '1234',
        type: 'OFFICER',
      }).should.deepEqual({
        type: ADD_ITEM_TO_PINBOARD_STATE,
        payload: {
          id: '1234',
          type: 'OFFICER',
        },
      });
    });
  });

  describe('removeItemFromPinboardState', function () {
    it('should return correct action', function () {
      removeItemFromPinboardState({
        id: '1234',
        type: 'OFFICER',
      }).should.deepEqual({
        type: REMOVE_ITEM_FROM_PINBOARD_STATE,
        payload: {
          id: '1234',
          type: 'OFFICER',
        },
      });
    });
  });

  describe('orderPinboardState', function () {
    it('should return correct action', function () {
      orderPinboardState({
        ids: ['1234', '456'],
        type: 'OFFICER',
      }).should.deepEqual({
        type: ORDER_PINBOARD_STATE,
        payload: {
          ids: ['1234', '456'],
          type: 'OFFICER',
        },
      });
    });
  });

  describe('savePinboard', function () {
    it('should return correct action', function () {
      savePinboard({
        id: 1,
        title: 'Pinboard Title',
        'officer_ids': [12],
        crids: ['abc'],
        'trr_ids': [1],
        description: 'Description',
        isPinboardRestored: false,
      }).should.deepEqual({
        type: SAVE_PINBOARD,
        payload: {
          id: 1,
          title: 'Pinboard Title',
          'officer_ids': [12],
          crids: ['abc'],
          'trr_ids': [1],
          description: 'Description',
          isPinboardRestored: false,
        },
      });
    });
  });

  describe('orderPinboard', function () {
    it('should return correct action', function () {
      orderPinboard({
        ids: ['1234', '456'],
        type: 'OFFICER',
      }).should.deepEqual({
        type: ORDER_PINBOARD,
        payload: {
          ids: ['1234', '456'],
          type: 'OFFICER',
        },
      });
    });
  });

  describe('fetchPinboard', function () {
    it('shoud return correct action', function () {
      fetchPinboard('66ef1560').should.deepEqual({
        types: [
          PINBOARD_FETCH_REQUEST_START,
          PINBOARD_FETCH_REQUEST_SUCCESS,
          PINBOARD_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: v2Url(`${constants.PINBOARDS_API_ENDPOINT}66ef1560/`),
            params: undefined,
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboardComplaints', function () {
    it('should return correct action', function () {
      fetchPinboardComplaints('66ef1560').should.deepEqual({
        types: [
          PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
          PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
          PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE,
          PINBOARD_COMPLAINTS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: v2Url(`${constants.PINBOARDS_API_ENDPOINT}66ef1560/complaints/`),
            params: undefined,
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboardOfficers', function () {
    it('should return correct action', function () {
      fetchPinboardOfficers('66ef1560').should.deepEqual({
        types: [
          PINBOARD_OFFICERS_FETCH_REQUEST_START,
          PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
          PINBOARD_OFFICERS_FETCH_REQUEST_FAILURE,
          PINBOARD_OFFICERS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: v2Url(`${constants.PINBOARDS_API_ENDPOINT}66ef1560/officers/`),
            params: undefined,
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboardTRRs', function () {
    it('should return correct action', function () {
      fetchPinboardTRRs('66ef1560').should.deepEqual({
        types: [
          PINBOARD_TRRS_FETCH_REQUEST_START,
          PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
          PINBOARD_TRRS_FETCH_REQUEST_FAILURE,
          PINBOARD_TRRS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: v2Url(`${constants.PINBOARDS_API_ENDPOINT}66ef1560/trrs/`),
            params: undefined,
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboardSocialGraph', function () {
    it('should return correct action', function () {
      fetchPinboardSocialGraph('268a5e58').should.deepEqual({
        types: [
          PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START,
          PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
          PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
          PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.SOCIAL_GRAPH_API_ENDPOINT)}network/?pinboard_id=268a5e58`,
            params: undefined,
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchFirstPagePinboardGeographicCrs', function () {
    it('should return correct action', function () {
      fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '268a5e58' }).should.deepEqual({
        types: [
          FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START,
          FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
          FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE,
          FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: v2Url(constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_ENDPOINT),
            params: { 'pinboard_id': '268a5e58' },
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchOtherPagesPinboardGeographicCrs', function () {
    it('should return correct action', function () {
      fetchOtherPagesPinboardGeographicCrs({ 'pinboard_id': '268a5e58' }).should.deepEqual({
        types: [
          PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START,
          PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
          PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE,
          PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: v2Url(constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_ENDPOINT),
            params: { 'pinboard_id': '268a5e58' },
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchFirstPagePinboardGeographicTrrs', function () {
    it('should return correct action', function () {
      fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '268a5e58' }).should.deepEqual({
        types: [
          FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START,
          FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
          FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE,
          FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: v2Url(constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_ENDPOINT),
            params: { 'pinboard_id': '268a5e58' },
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchOtherPagesPinboardGeographicTrrs', function () {
    it('should return correct action', function () {
      fetchOtherPagesPinboardGeographicTrrs({ 'pinboard_id': '268a5e58' }).should.deepEqual({
        types: [
          PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START,
          PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
          PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE,
          PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: v2Url(constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_ENDPOINT),
            params: { 'pinboard_id': '268a5e58' },
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboardRelevantDocuments', function () {
    it('should return correct action', function () {
      fetchPinboardRelevantDocuments('66ef1560').should.deepEqual({
        types: [
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-documents/?`,
            params: undefined,
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });

    it('should return correct action with params', function () {
      fetchPinboardRelevantDocuments(
        '66ef1560',
        { limit: '20', offset: '20' }
      ).should.deepEqual({
        types: [
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-documents/?limit=20&offset=20`,
            params: undefined,
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboardRelevantCoaccusals', function () {
    it('shoud return correct action', function () {
      fetchPinboardRelevantCoaccusals('66ef1560').should.deepEqual({
        types: [
          PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
          PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
          PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
          PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-coaccusals/?`,
            params: undefined,
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });

    it('shoud return correct action with params', function () {
      fetchPinboardRelevantCoaccusals(
        '66ef1560',
        { limit: '20', offset: '20' }
      ).should.deepEqual({
        types: [
          PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
          PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
          PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
          PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-coaccusals/?limit=20&offset=20`,
            params: undefined,
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboardRelevantComplaints', function () {
    it('shoud return correct action', function () {
      fetchPinboardRelevantComplaints('66ef1560').should.deepEqual({
        types: [
          PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
          PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
          PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
          PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-complaints/?`,
            params: undefined,
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });

    it('shoud return correct action with params', function () {
      fetchPinboardRelevantComplaints(
        '66ef1560',
        { limit: '20', offset: '20' }
      ).should.deepEqual({
        types: [
          PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
          PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
          PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
          PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-complaints/?limit=20&offset=20`,
            params: undefined,
            adapter: undefined,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchLatestRetrievedPinboard', function () {
    it('should return correct action', function () {
      fetchLatestRetrievedPinboard().should.deepEqual({
        types: [
          PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START,
          PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
          PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}latest-retrieved-pinboard/`,
            params: undefined,
            adapter: undefined,
          },
        },
      });
    });
  });
});
