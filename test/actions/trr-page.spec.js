import {
  requestTRR,
  TRR_REQUEST_START,
  TRR_REQUEST_SUCCESS,
  TRR_REQUEST_FAILURE,
} from 'actions/trr-page';
import constants from 'constants';
import { v2Url } from 'utils/UrlUtil';


describe('trr-page actions', function () {
  describe('requestTRR', function () {
    it('should return right action', function () {

      requestTRR(11).should.eql({
        types: [TRR_REQUEST_START, TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE],
        meta: { id: 11 },
        payload: {
          request: {
            url: `${v2Url(constants.TRR_API_ENDPOINT)}11/`,
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });
});
