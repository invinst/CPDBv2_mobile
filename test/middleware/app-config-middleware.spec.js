import { LOCATION_CHANGE } from 'connected-react-router';
import { stub } from 'sinon';
import { Promise } from 'es6-promise';

import { APP_CONFIG_FETCH_SUCCESS } from 'actions/common/app-config';
import appConfigMiddleware from 'middleware/app-config-middleware';
import * as appConfig from 'utils/app-config';
import { fetchAppConfig } from 'actions/common/app-config';


describe('app-config-middleware', function () {
  it('should update app config on APP_CONFIG_FETCH_SUCCESS', function () {
    const action = {
      type: APP_CONFIG_FETCH_SUCCESS,
      payload: {
        'PINBOARD_INTRODUCTION_DELAY': '2500',
      },
    };
    appConfigMiddleware()(() => {})(action);
    appConfig.default.get('PINBOARD_INTRODUCTION_DELAY').should.eql(2500);
  });

  it('should dispatch fetchAppConfig if appConfig.isEmpty() is true', function () {
    const store = {
      getState: () => ({}),
      dispatch: stub().usingPromise(Promise).resolves('success'),
    };
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/',
      },
    };
    stub(appConfig.default, 'isEmpty').returns(true);
    let dispatched;
    appConfigMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.should.be.calledWith(fetchAppConfig());
  });

  it('should not dispatch fetchAppConfig if appConfig.isEmpty() is false', function () {
    const store = {
      getState: () => ({}),
      dispatch: stub().usingPromise(Promise).resolves('success'),
    };
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/',
      },
    };
    stub(appConfig.default, 'isEmpty').returns(false);
    let dispatched;
    appConfigMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.should.not.be.called();
  });
});
