import pinboardsReducer from 'reducers/pinboard-page/pinboards';
import { PINBOARDS_FETCH_REQUEST_SUCCESS } from 'actions/pinboard';


describe('pinboards reducer', function () {
  it('should return initial state', function () {
    pinboardsReducer(undefined, {}).should.eql([]);
  });

  it('should handle PINBOARDS_FETCH_REQUEST_SUCCESS', function () {
    const action = {
      type: PINBOARDS_FETCH_REQUEST_SUCCESS,
      payload: [
        {
          'id': '7f476749',
          'title': '',
          'created_at': '2020-05-06',
        },
        {
          'id': '7f476761',
          'title': 'Pinboard 1',
          'created_at': '2020-05-06',
        },
        {
          'id': '7f476777',
          'title': 'Skrull Cap',
          'created_at': '2020-05-06',
        },
      ],
    };
    pinboardsReducer([], action).should.eql([
      {
        'id': '7f476749',
        'title': '',
        'created_at': '2020-05-06',
      },
      {
        'id': '7f476761',
        'title': 'Pinboard 1',
        'created_at': '2020-05-06',
      },
      {
        'id': '7f476777',
        'title': 'Skrull Cap',
        'created_at': '2020-05-06',
      },
    ]);
  });
});
