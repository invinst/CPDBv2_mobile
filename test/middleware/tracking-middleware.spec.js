import { stub } from 'sinon';
import { LOCATION_CHANGE } from 'connected-react-router';

import { PINBOARD_FETCH_REQUEST_SUCCESS, viewPinboard } from 'actions/pinboard';
import trackingMiddleware from 'middleware/tracking-middleware';
import browserHistory from 'utils/history';

describe('tracking-middleware', function () {
  describe('handling PINBOARD_FETCH_REQUEST_SUCCESS', function () {
    context('on pinboard page', function () {
      it('should dispatch viewPinboard with correct pinboard id', function () {
        let dispatched;
        const store = {
          getState: () => ({

          }),
          dispatch: stub(),
        };
        browserHistory.location = { pathname: '/pinboard/72a4f2/untitled-pinboard/' };
        const action = { type: PINBOARD_FETCH_REQUEST_SUCCESS, payload: { id: '72a4f2' } };
        trackingMiddleware(store)(action => dispatched = action)(action);
        dispatched.should.eql(action);
        store.dispatch.should.be.calledOnce();
        store.dispatch.should.be.calledWith(viewPinboard('72a4f2'));
      });
    });

    context('not on pinboard page', function () {
      it('should not dispatch viewPinboard', function () {
        let dispatched;
        const store = {
          getState: () => ({

          }),
          dispatch: stub(),
        };
        browserHistory.location = { pathname: '/officer/officer/8658/corey-flagg/' };
        const action = { type: PINBOARD_FETCH_REQUEST_SUCCESS, payload: { id: '72a4f2' } };
        trackingMiddleware(store)(action => dispatched = action)(action);
        dispatched.should.eql(action);
        store.dispatch.should.not.be.called();
      });
    });
  });

  describe('handling LOCATION_CHANGE', function () {
    context('on pinboard page', function () {
      let action;

      beforeEach(function () {
        action = {
          type: LOCATION_CHANGE,
          payload: { location: { pathname: '/pinboard/72a4f2/untitled-pinboard/' } },
        };
      });

      context('pinboard id from pathname is equal to pinboard id from store', function () {
        it('should dispatch viewPinboard with correct pinboard id', function () {
          let dispatched;
          const store = {
            getState: () => ({
              pinboardPage: {
                pinboard: {
                  id: '72a4f2',
                },
              },
            }),
            dispatch: stub(),
          };
          trackingMiddleware(store)(action => dispatched = action)(action);
          dispatched.should.eql(action);
          store.dispatch.should.be.calledOnce();
          store.dispatch.should.be.calledWith(viewPinboard('72a4f2'));
        });
      });

      context('pinboard id from pathname is not equal to pinboard id from store', function () {
        it('should dispatch viewPinboard with correct pinboard id', function () {
          let dispatched;
          const store = {
            getState: () => ({
              pinboardPage: {
                pinboard: {
                  id: '72cc78',
                },
              },
            }),
            dispatch: stub(),
          };
          trackingMiddleware(store)(action => dispatched = action)(action);
          dispatched.should.eql(action);
          store.dispatch.should.not.be.called();
        });
      });
    });
  });
});
