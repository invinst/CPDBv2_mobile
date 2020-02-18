import { Promise } from 'es6-promise';
import { stub } from 'sinon';
import { CancelToken } from 'axios';

import fetchToastMiddleware from 'middleware/fetch-toast-middleware';
import { fetchToast } from 'actions/toast';


describe('fetchToastMiddleware', function () {
  const createStore = (toasts=[]) => ({
    getState: () => {
      return {
        toasts: toasts,
      };
    },
    dispatch: stub().usingPromise(Promise).resolves('success'),
  });

  beforeEach(function () {
    this.cancelTokenSource = stub(CancelToken, 'source');
  });

  afterEach(function () {
    this.cancelTokenSource.restore();
  });

  describe('handling @@router/LOCATION_CHANGE', function () {
    it('should not dispatch fetchToast when toasts have already been fetched', function () {
      const store = createStore([
        {
          name: 'OFFICER',
          template: '{full_name} {action_type} pinboard',
        },
        {
          name: 'CR',
          template: 'CR #{crid} {action_type} pinboard',
        },
        {
          name: 'TRR',
          template: 'TRR #{id} {action_type} pinboard',
        },
      ]);
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/pinboard/',
        },
      };
      let dispatched;
      fetchToastMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.calledWith(fetchToast());
    });

    it('should dispatch fetchToast when toasts have not been fetched', function () {
      const store = createStore();
      const action = {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/pinboard/',
        },
      };
      let dispatched;
      fetchToastMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(fetchToast());
    });
  });
});
