import { OFFICERS_API_ENDPOINT } from 'constants';
import { v2Url } from 'utils/url-util';
import {
  requestOfficers,
  OFFICERS_REQUEST_START,
  OFFICERS_REQUEST_SUCCESS,
  OFFICERS_REQUEST_FAILURE,
} from 'actions/embed';

describe('officers', function () {
  it('should return right action', function () {
    requestOfficers('1,2,3').should.eql({
      types: [
        OFFICERS_REQUEST_START,
        OFFICERS_REQUEST_SUCCESS,
        OFFICERS_REQUEST_FAILURE,
      ],
      payload: {
        request: {
          url: `${v2Url(OFFICERS_API_ENDPOINT)}`,
          adapter: undefined,
          params: { ids: '1,2,3' },
        },
      },
    });
  });
});
