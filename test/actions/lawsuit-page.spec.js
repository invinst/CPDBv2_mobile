import { fetchLawsuit } from 'actions/lawsuit-page';

import { LAWSUIT_API_ENDPOINT } from 'constants';
import {
  LAWSUIT_FETCH_START,
  LAWSUIT_FETCH_SUCCESS,
  LAWSUIT_FETCH_FAILURE,
} from 'actions/lawsuit-page';

describe('LawsuitPage actions', function () {
  describe('fetchLawsuit', function () {
    it('should return the right action', function () {
      fetchLawsuit(123).should.eql({
        types: [LAWSUIT_FETCH_START, LAWSUIT_FETCH_SUCCESS, LAWSUIT_FETCH_FAILURE],
        payload: {
          request: {
            url: `${LAWSUIT_API_ENDPOINT}123/`,
            params: undefined,
            adapter: undefined,
          },
        },
      });
    });
  });
});
