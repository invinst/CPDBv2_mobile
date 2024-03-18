import {
  fetchAppConfig,
  APP_CONFIG_FETCH_START,
  APP_CONFIG_FETCH_FAILURE,
  APP_CONFIG_FETCH_SUCCESS,
  APP_CONFIG_LOADED,
  appConfigLoaded,
} from 'actions/common/app-config';
import { APP_CONFIG_API_ENDPOINT } from 'constants';
import { v2Url } from 'utils/url-util';


describe('App config actions', function () {
  describe('fetchAppConfig', function () {
    it('should return the right action', function () {
      fetchAppConfig().should.eql({
        types: [APP_CONFIG_FETCH_START, APP_CONFIG_FETCH_SUCCESS, APP_CONFIG_FETCH_FAILURE],
        payload: {
          request: {
            url: v2Url(APP_CONFIG_API_ENDPOINT),
            params: undefined,
            adapter: undefined,
          },
        },
      });
    });
  });

  describe('appConfigLoaded', function () {
    it('should return right action', function () {
      appConfigLoaded().should.eql({
        type: APP_CONFIG_LOADED,
      });
    });
  });
});
