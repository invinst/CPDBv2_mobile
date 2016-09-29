import {
  subscribeEmail,
  SUBSCRIBE_EMAIL_REQUEST, SUBSCRIBE_EMAIL_SUCCESS, SUBSCRIBE_EMAIL_FAILURE
} from 'actions/vftg';
import { v2Url } from 'utils/UrlUtil';
import constants from 'constants';


describe('suggestions actions', function () {
  describe('subscribeEmail', function () {
    it('should return right action', function () {
      const email = 'email';
      subscribeEmail(email).should.eql({
        types: [SUBSCRIBE_EMAIL_REQUEST, SUBSCRIBE_EMAIL_SUCCESS, SUBSCRIBE_EMAIL_FAILURE],
        payload: {
          request: {
            url: v2Url(constants.VFTG_API_ENDPOINT),
            method: 'POST',
            adapter: undefined,
            data: { email: email }
          }
        }
      });
    });
  });
});
