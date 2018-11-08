import constants from 'constants';
import { v2Url } from 'utils/url-util';
import * as actions from 'actions/embed';

describe('officers', function () {
  it('should return right action', function () {
    actions.requestOfficers('1,2,3').should.eql({
      types: [
        actions.OFFICERS_REQUEST_START,
        actions.OFFICERS_REQUEST_SUCCESS,
        actions.OFFICERS_REQUEST_FAILURE
      ],
      payload: {
        request: {
          url: `${v2Url(constants.OFFICERS_API_ENDPOINT)}`,
          adapter: undefined,
          params: { ids: '1,2,3' }
        }
      }
    });
  });
});
