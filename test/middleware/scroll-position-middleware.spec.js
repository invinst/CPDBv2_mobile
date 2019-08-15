import { stub } from 'sinon';

import scrollPositionMiddleware from 'middleware/scroll-position-middleware';
import * as NavigationUtil from 'utils/navigation-util';


describe('scrollPositionMiddleware', function () {
  beforeEach(function () {
    this.stubInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');
  });

  afterEach(function () {
    this.stubInstantScrollToTop.restore();
  });

  it('should do nothing if action is not ROUTE_CHANGED', function () {

    const store = { foo: 'bar' };
    const next = stub();
    next.returns(store);
    const action = { type: 'NOT_ROUTE_CHANGED' };

    const result = scrollPositionMiddleware(store)(next)(action);

    next.calledWith(action).should.be.true();
    result.should.be.eql(store);
    this.stubInstantScrollToTop.called.should.be.false();
  });

  it('should scroll to top if route changed', function () {
    const store = {};
    const next = stub();
    const action = { type: 'ROUTE_CHANGED', payload: { from: '/', to: 'search/' } };

    scrollPositionMiddleware(store)(next)(action);

    this.stubInstantScrollToTop.called.should.be.true();
  });

  it('should not scroll to top if changed officer tab', function () {
    const store = {};
    const next = stub();
    const action = {
      type: 'ROUTE_CHANGED',
      payload: {
        from: 'officer/123/jerome-finnigan/',
        to: 'officer/123/jerome-finnigan/coaccusals/'
      }
    };

    scrollPositionMiddleware(store)(next)(action);

    this.stubInstantScrollToTop.called.should.be.false();
  });
});
