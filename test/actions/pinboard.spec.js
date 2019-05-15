import {
  createPinboard,
  updatePinboard,
  fetchPinboard,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardSocialGraph,
  fetchPinboardGeographicData,
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
  PINBOARD_FETCH_REQUEST_START,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_FAILURE,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE,
  PINBOARD_OFFICERS_FETCH_REQUEST_START,
  PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
  PINBOARD_OFFICERS_FETCH_REQUEST_FAILURE,
  PINBOARD_TRRS_FETCH_REQUEST_START,
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRRS_FETCH_REQUEST_FAILURE,
  PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START,
  PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
  PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
  PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_START,
  PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS,
  PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_FAILURE,
  PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
  PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
  PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
  PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
  PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
  PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
  PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ADD_ITEM_IN_PINBOARD_PAGE,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_FAILURE,
} from 'actions/pinboard';
import constants from 'constants';
import { v2Url } from 'utils/url-util';


describe('pinboard actions', function () {
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
            data: {
              'officer_ids': [],
              crids: ['abc'],
              'trr_ids': ['1'],
            }
          }
        }
      });
    });
  });

  describe('updatePinboard', function () {
    it('should return correct action', function () {
      const pinboard = {
        id: '66ef1560',
        title: 'Title',
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
              'officer_ids': ['1'],
              crids: [],
              'trr_ids': [],
            }
          }
        }
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
          }
        }
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
        ],
        payload: {
          request: {
            url: v2Url(`${constants.PINBOARDS_API_ENDPOINT}66ef1560/complaints/`),
            params: undefined,
            adapter: undefined,
          }
        }
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
        ],
        payload: {
          request: {
            url: v2Url(`${constants.PINBOARDS_API_ENDPOINT}66ef1560/officers/`),
            params: undefined,
            adapter: undefined,
          }
        }
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
        ],
        payload: {
          request: {
            url: v2Url(`${constants.PINBOARDS_API_ENDPOINT}66ef1560/trrs/`),
            params: undefined,
            adapter: undefined,
          }
        }
      });
    });
  });

  describe('fetchPinboardSocialGraph', function () {
    it('shoud return correct action', function () {
      fetchPinboardSocialGraph('268a5e58').should.deepEqual({
        types: [
          PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START,
          PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
          PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}268a5e58/social-graph/`,
            params: undefined,
            adapter: undefined,
          }
        }
      });
    });
  });

  describe('fetchPinboardGeographicData', function () {
    it('should return correct action', function () {
      fetchPinboardGeographicData('268a5e58').should.deepEqual({
        types: [
          PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_START,
          PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS,
          PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}268a5e58/geographic-data/`,
            params: undefined,
            adapter: undefined,
          }
        }
      });
    });
  });

  describe('fetchPinboardRelevantDocuments', function () {
    it('shoud return correct action', function () {
      fetchPinboardRelevantDocuments('66ef1560').should.deepEqual({
        types: [
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-documents/?`,
            params: undefined,
            adapter: undefined,
          }
        }
      });
    });

    it('shoud return correct action with params', function () {
      fetchPinboardRelevantDocuments(
        '66ef1560',
        { limit: '20', offset: '20' }
      ).should.deepEqual({
        types: [
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
          PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-documents/?limit=20&offset=20`,
            params: undefined,
            adapter: undefined,
          }
        }
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
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-coaccusals/?`,
            params: undefined,
            adapter: undefined,
          }
        }
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
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-coaccusals/?limit=20&offset=20`,
            params: undefined,
            adapter: undefined,
          }
        }
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
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-complaints/?`,
            params: undefined,
            adapter: undefined,
          }
        }
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
        ],
        payload: {
          request: {
            url: `${v2Url(constants.PINBOARDS_API_ENDPOINT)}66ef1560/relevant-complaints/?limit=20&offset=20`,
            params: undefined,
            adapter: undefined,
          }
        }
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
          }
        }
      });
    });
  });
});
