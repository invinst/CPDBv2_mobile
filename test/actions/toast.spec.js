import {
  fetchToast,
  TOAST_REQUEST_FAILURE,
  TOAST_REQUEST_START,
  TOAST_REQUEST_SUCCESS,
} from 'actions/toast';
import { v2Url } from 'utils/url-util';
import constants from 'constants';

describe('toast actions', function () {
  describe('fetchToast', function () {
    it('should return the right action', function () {
      fetchToast().should.eql({
        types: [TOAST_REQUEST_START, TOAST_REQUEST_SUCCESS, TOAST_REQUEST_FAILURE],
        payload: {
          request: {
            url: v2Url(constants.TOAST_API_ENDPOINT),
            params: undefined,
            adapter: undefined,
          },
        },
      });
    });
  });
});
