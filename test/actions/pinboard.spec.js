import {
  createPinboard,
  updatePinboard,
  fetchPinboard,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
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
} from 'actions/pinboard';
import constants from 'constants';
import { v2Url } from 'utils/url-util';


describe('pinboard actions', function () {
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
});
