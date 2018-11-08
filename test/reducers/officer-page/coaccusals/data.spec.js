import data from 'reducers/officer-page/coaccusals/data';
import {
  OFFICER_COACCUSALS_REQUEST_SUCCESS,
  OFFICER_COACCUSALS_REQUEST_FAILURE,
} from 'actions/officer-page/coaccusals';

describe('data reducer', function () {
  it('should have initial state', function () {
    data(undefined, {}).should.eql({});
  });

  it('should handle OFFICER_COACCUSALS_REQUEST_SUCCESS', function () {
    data({
      1: 'coaccusal1',
      2: 'coaccusal2',
    }, {
      type: OFFICER_COACCUSALS_REQUEST_SUCCESS,
      meta: {
        id: 3
      },
      payload: 'coaccusal3'
    }).should.eql({
      1: 'coaccusal1',
      2: 'coaccusal2',
      3: 'coaccusal3',
    });
  });

  it('should handle OFFICER_COACCUSALS_REQUEST_FAILURE', function () {
    data({
      1: 'coaccusal1',
      2: 'coaccusal2',
    }, {
      type: OFFICER_COACCUSALS_REQUEST_FAILURE,
      meta: {
        id: 3
      },
      payload: 'coaccusal3'
    }).should.eql({
      1: 'coaccusal1',
      2: 'coaccusal2',
    });
  });
});
