import should from 'should';

import pinboardReducer from 'reducers/pinboard';
import {
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
} from 'actions/pinboard';


describe('Pinboard reducer', function () {
  it('should have initial state', function () {
    should(pinboardReducer(undefined, {})).eql(null);
  });

  it('should handle PINBOARD_CREATE_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: 2,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: [],
        'trr_ids': [],
      },
      {
        type: PINBOARD_CREATE_REQUEST_SUCCESS,
        payload: {
          id: 1,
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
        }
      }
    ).should.deepEqual({
      id: 1,
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      'trr_ids': [1],
    });
  });

  it('should handle PINBOARD_UPDATE_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {},
      {
        type: PINBOARD_UPDATE_REQUEST_SUCCESS,
        payload: {
          id: 1,
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
        }
      }
    ).should.deepEqual({
      id: 1,
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      'trr_ids': [1],
    });
  });

  it('shoudl handle PINBOARD_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: 2,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: [],
        'trr_ids': [],
      },
      {
        type: PINBOARD_FETCH_REQUEST_SUCCESS,
        payload: {
          id: 1,
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
        }
      }
    ).should.deepEqual({
      id: 1,
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      'trr_ids': [1],
    });
  });

  it('should handle PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {},
      {
        type: PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
        payload: { id: 1 }
      }
    ).should.deepEqual({
      id: 1,
      isPinboardRestored: true,
    });
  });
});
