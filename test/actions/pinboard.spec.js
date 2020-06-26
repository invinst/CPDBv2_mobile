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
  updatePinboardFromSource,
  createNewPinboard,
  fetchPinboards,
  duplicatePinboard,
  createNewEmptyPinboard,
  hideShowPinboardsList,
  removePinboard,
  viewPinboard,
  fetchComplaintSummary,
  fetchTRRSummary,
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
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_START,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_FAILURE,
  PINBOARD_CREATE_NEW_REQUEST_START,
  PINBOARD_CREATE_NEW_REQUEST_SUCCESS,
  PINBOARD_CREATE_NEW_REQUEST_FAILURE,
  PINBOARDS_FETCH_REQUEST_START,
  PINBOARDS_FETCH_REQUEST_SUCCESS,
  PINBOARDS_FETCH_REQUEST_FAILURE,
  HIDE_SHOW_PINBOARDS_LIST,
  VIEW_PINBOARD_REQUEST_START,
  VIEW_PINBOARD_REQUEST_SUCCESS,
  VIEW_PINBOARD_REQUEST_FAILURE,
  REMOVE_PINBOARD_REQUEST_START,
  REMOVE_PINBOARD_REQUEST_SUCCESS,
  REMOVE_PINBOARD_REQUEST_FAILURE,
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_FAILURE,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'actions/pinboard';
import {
  PINBOARDS_API_ENDPOINT,
  SOCIAL_GRAPH_API_ENDPOINT,
  SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_ENDPOINT,
  SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_ENDPOINT,
} from 'constants';
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
            url: v2Url(PINBOARDS_API_ENDPOINT),
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
            url: v2Url(`${PINBOARDS_API_ENDPOINT}66ef1560/`),
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
            url: v2Url(`${PINBOARDS_API_ENDPOINT}66ef1560/`),
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
            url: v2Url(`${PINBOARDS_API_ENDPOINT}66ef1560/complaints/`),
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
            url: v2Url(`${PINBOARDS_API_ENDPOINT}66ef1560/officers/`),
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
            url: v2Url(`${PINBOARDS_API_ENDPOINT}66ef1560/trrs/`),
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
            url: `${v2Url(SOCIAL_GRAPH_API_ENDPOINT)}network/?pinboard_id=268a5e58`,
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
            url: v2Url(SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_ENDPOINT),
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
            url: v2Url(SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_ENDPOINT),
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
            url: v2Url(SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_ENDPOINT),
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
            url: v2Url(SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_ENDPOINT),
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
            url: `${v2Url(PINBOARDS_API_ENDPOINT)}66ef1560/relevant-documents/?`,
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
            url: `${v2Url(PINBOARDS_API_ENDPOINT)}66ef1560/relevant-documents/?limit=20&offset=20`,
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
            url: `${v2Url(PINBOARDS_API_ENDPOINT)}66ef1560/relevant-coaccusals/?`,
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
            url: `${v2Url(PINBOARDS_API_ENDPOINT)}66ef1560/relevant-coaccusals/?limit=20&offset=20`,
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
            url: `${v2Url(PINBOARDS_API_ENDPOINT)}66ef1560/relevant-complaints/?`,
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
            url: `${v2Url(PINBOARDS_API_ENDPOINT)}66ef1560/relevant-complaints/?limit=20&offset=20`,
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
            url: `${v2Url(PINBOARDS_API_ENDPOINT)}latest-retrieved-pinboard/`,
            params: undefined,
            adapter: undefined,
          },
        },
      });
    });
  });

  describe('updatePinboardFromSource', function () {
    it('should return correct action', function () {
      updatePinboardFromSource('abcd1234', 'abcd5678').should.deepEqual({
        types: [
          PINBOARD_UPDATE_FROM_SOURCE_REQUEST_START,
          PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
          PINBOARD_UPDATE_FROM_SOURCE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(PINBOARDS_API_ENDPOINT)}abcd1234/`,
            method: 'PUT',
            adapter: undefined,
            data: {
              'source_pinboard_id': 'abcd5678',
            },
          },
        },
      });
    });
  });

  describe('createNewPinboard', function () {
    it('should return correct action', function () {
      createNewPinboard({ officerIds: [], crids: ['abc'], trrIds: [1] }).should.deepEqual({
        types: [
          PINBOARD_CREATE_NEW_REQUEST_START,
          PINBOARD_CREATE_NEW_REQUEST_SUCCESS,
          PINBOARD_CREATE_NEW_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: v2Url(PINBOARDS_API_ENDPOINT),
            method: 'POST',
            adapter: undefined,
            data: {
              'officer_ids': [],
              crids: ['abc'],
              'trr_ids': [1],
              'source_pinboard_id': undefined,
            },
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboards', function () {
    it('should return correct action', function () {
      fetchPinboards().should.eql({
        types: [
          PINBOARDS_FETCH_REQUEST_START,
          PINBOARDS_FETCH_REQUEST_SUCCESS,
          PINBOARDS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: v2Url(PINBOARDS_API_ENDPOINT),
            params: undefined,
            adapter: undefined,
          },
        },
      });
    });
  });

  describe('duplicatePinboard', function () {
    it('should return correct action', function () {
      duplicatePinboard('adg234r6').should.deepEqual({
        types: [
          PINBOARD_CREATE_NEW_REQUEST_START,
          PINBOARD_CREATE_NEW_REQUEST_SUCCESS,
          PINBOARD_CREATE_NEW_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: v2Url(PINBOARDS_API_ENDPOINT),
            method: 'POST',
            adapter: undefined,
            data: {
              'officer_ids': undefined,
              crids: undefined,
              'trr_ids': undefined,
              'source_pinboard_id': 'adg234r6',
            },
            cancelToken: 'token',
          },
        },
      });
    });

    it('should cancel old fetch requests if new request is called', function () {
      duplicatePinboard('adg234r6');
      duplicatePinboard('adg234r6');
      cancel.called.should.be.true();
    });
  });

  describe('createNewEmptyPinboard', function () {
    it('should return correct action', function () {
      createNewEmptyPinboard().should.deepEqual({
        types: [
          PINBOARD_CREATE_NEW_REQUEST_START,
          PINBOARD_CREATE_NEW_REQUEST_SUCCESS,
          PINBOARD_CREATE_NEW_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: v2Url(PINBOARDS_API_ENDPOINT),
            method: 'POST',
            adapter: undefined,
            data: {
              'officer_ids': [],
              crids: [],
              'trr_ids': [],
              'source_pinboard_id': undefined,
            },
            cancelToken: 'token',
          },
        },
      });
    });

    it('should cancel old fetch requests if new request is called', function () {
      createNewEmptyPinboard();
      createNewEmptyPinboard();
      cancel.called.should.be.true();
    });
  });

  describe('hideShowPinboardsList', function () {
    it('should return correct action', function () {
      hideShowPinboardsList(true).should.deepEqual({
        type: HIDE_SHOW_PINBOARDS_LIST,
        payload: true,
      });
    });
  });

  describe('removePinboard', function () {
    it('should return correct action', function () {
      removePinboard('123f56').should.deepEqual({
        types: [
          REMOVE_PINBOARD_REQUEST_START,
          REMOVE_PINBOARD_REQUEST_SUCCESS,
          REMOVE_PINBOARD_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            adapter: undefined,
            data: undefined,
            method: 'DELETE',
            url: '/mobile/pinboards/123f56/',
          },
        },
      });
    });
  });

  describe('viewPinboard', function () {
    it('should return correct action', function () {
      viewPinboard('123f78').should.deepEqual({
        types: [
          VIEW_PINBOARD_REQUEST_START,
          VIEW_PINBOARD_REQUEST_SUCCESS,
          VIEW_PINBOARD_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            adapter: undefined,
            data: undefined,
            method: 'POST',
            url: '/mobile/pinboards/123f78/view/',
          },
        },
      });
    });
  });

  describe('fetchComplaintSummary', function () {
    it('should return correct action', function () {
      fetchComplaintSummary('84ab47').should.deepEqual({
        types: [
          PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_START,
          PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_SUCCESS,
          PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            adapter: undefined,
            params: undefined,
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}84ab47/complaint-summary/`,
          },
        },
      });
    });
  });

  describe('fetchTRRSummary', function () {
    it('should return correct action', function () {
      fetchTRRSummary('84ab47').should.deepEqual({
        types: [
          PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START,
          PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS,
          PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            adapter: undefined,
            params: undefined,
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}84ab47/trr-summary/`,
          },
        },
      });
    });
  });
});
