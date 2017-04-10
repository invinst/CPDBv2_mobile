import should from 'should';
import scrollPositionMiddleware from 'middleware/scroll-position-middleware';
import { stub } from 'sinon';
import constants from 'constants';
import * as NavigationUtil from 'utils/NavigationUtil';

describe('scrollPositionMiddleware', function () {
  beforeEach(function () {
    this.stubInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');
    this.stubInstantScrollTo = stub(NavigationUtil, 'instantScrollTo');
  });

  afterEach(function () {
    this.stubInstantScrollTo.restore();
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
    this.stubInstantScrollTo.called.should.be.false();
    this.stubInstantScrollToTop.called.should.be.false();
  });

  it('should scroll down to hide "cpdp" link if route changed to search/', function () {
    const store = {};
    const next = stub();
    const action = { type: 'ROUTE_CHANGED', payload: 'search/' };

    scrollPositionMiddleware(store)(next)(action);

    this.stubInstantScrollTo.calledWith(constants.TOP_MARGIN - 1).should.be.true();
    this.stubInstantScrollToTop.called.should.be.false();
  });

  it('should scroll to top if route changed to anything other than search/', function () {
    const store = {};
    const next = stub();
    const action = { type: 'ROUTE_CHANGED', payload: 'not-search/' };

    scrollPositionMiddleware(store)(next)(action);

    this.stubInstantScrollTo.called.should.be.false();
    this.stubInstantScrollToTop.called.should.be.true();
  });
});
