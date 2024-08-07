import should from 'should';


import appConfigRequestingReducer from 'reducers/app-config-requesting';
import { APP_CONFIG_FETCH_FAILURE, APP_CONFIG_LOADED } from 'actions/common/app-config';


describe('appConfigRequestingReducer', function () {
  it('should have initial state', function () {
    should(appConfigRequestingReducer(undefined, {})).be.true();
  });

  it('should handle APP_CONFIG_FETCH_SUCCESS', function () {
    appConfigRequestingReducer(
      true,
      { type: APP_CONFIG_LOADED }
    ).should.be.false();
  });

  it('should handle APP_CONFIG_FETCH_FAILURE', function () {
    appConfigRequestingReducer(
      true,
      { type: APP_CONFIG_FETCH_FAILURE }
    ).should.be.false();
  });
});
