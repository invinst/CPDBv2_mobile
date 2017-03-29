import should from 'should';
import scrollPositionMiddleware from 'middleware/scroll-position-middleware';
import { stub } from 'sinon';
import constants from 'constants';
import * as NavigationUtil from 'utils/NavigationUtil';

describe('scrollPositionMiddleware', () => {
  it('should do nothing if action is not ROUTE_CHANGED', () => {
    const stubInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');
    const stubInstantScrollTo = stub(NavigationUtil, 'instantScrollTo');

    const store = { foo: 'bar' };
    const next = stub();
    next.returns(store);
    const action = { type: 'NOT_ROUTE_CHANGED' };

    const result = scrollPositionMiddleware(store)(next)(action);

    next.calledWith(action).should.be.true();
    result.should.be.eql(store);
    stubInstantScrollTo.called.should.be.false();
    stubInstantScrollToTop.called.should.be.false();

    stubInstantScrollTo.restore();
    stubInstantScrollToTop.restore();
  });

  it('should scroll down to hide "cpdp" link if route changed to search/', () => {
    const stubInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');
    const stubInstantScrollTo = stub(NavigationUtil, 'instantScrollTo');

    const store = {};
    const next = stub();
    const action = { type: 'ROUTE_CHANGED', payload: 'search/' };

    scrollPositionMiddleware(store)(next)(action);

    stubInstantScrollTo.calledWith(constants.TOP_MARGIN).should.be.true();
    stubInstantScrollToTop.called.should.be.false();

    stubInstantScrollTo.restore();
    stubInstantScrollToTop.restore();
  });

  it('should scroll to top if route changed to anything other than search/', () => {
    const stubInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');
    const stubInstantScrollTo = stub(NavigationUtil, 'instantScrollTo');

    const store = {};
    const next = stub();
    const action = { type: 'ROUTE_CHANGED', payload: 'not-search/' };

    scrollPositionMiddleware(store)(next)(action);

    stubInstantScrollTo.called.should.be.false();
    stubInstantScrollToTop.called.should.be.true();

    stubInstantScrollTo.restore();
    stubInstantScrollToTop.restore();
  });
});
