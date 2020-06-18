import { stub } from 'sinon';

import analyticTrackingMiddleware from 'middleware/analytic-tracking-middleware';
import { ROUTE_CHANGED } from 'actions/navigation';
import {
  SEARCH_QUERY_CHANGED,
  SUGGEST_ALL_REQUEST_SUCCESS,
  SUGGESTION_REQUEST_SUCCESS,
  SUGGESTION_SINGLE_REQUEST_SUCCESS,
} from 'actions/suggestion';
import * as tracking from 'utils/tracking';


describe('trackingMiddleware', function () {
  it('should track PageView event on ROUTE_CHANGED', function () {
    stub(tracking, 'trackPageView');

    let dispatched;
    const dispatchAction = {
      type: ROUTE_CHANGED,
      payload: {
        to: 'abc',
      },
    };

    analyticTrackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackPageView.should.be.calledWith('abc');
  });

  it('should track search query on SEARCH_QUERY_CHANGED', function () {
    stub(tracking, 'trackSearchQuery');

    let dispatched;
    const dispatchAction = {
      type: SEARCH_QUERY_CHANGED,
      payload: 'abc',
    };

    analyticTrackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackSearchQuery.should.be.calledWith('abc');
  });

  it('should track search results count on SUGGEST_ALL_REQUEST_SUCCESS', function () {
    stub(tracking, 'trackSearchResultsCount');

    let dispatched;
    const dispatchAction = {
      type: SUGGEST_ALL_REQUEST_SUCCESS,
      payload: { 'CR': [{ id: 1 }] },
    };

    analyticTrackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackSearchResultsCount.should.be.calledWith(1);
  });

  it('should track search results count on SUGGESTION_REQUEST_SUCCESS', function () {
    stub(tracking, 'trackSearchResultsCount');

    let dispatched;
    const dispatchAction = {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: {
        'COMMUNITY': [{ id: 1 }, { id: 2 }],
        'CR': [{ crid: 3 }],
      },
    };

    analyticTrackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackSearchResultsCount.should.be.calledWith(3);
  });

  it('should trackSingleSearchResults on SUGGESTION_SINGLE_REQUEST_SUCCESS', function () {
    stub(tracking, 'trackSingleSearchResults');

    let dispatched;
    const dispatchAction = {
      type: SUGGESTION_SINGLE_REQUEST_SUCCESS,
      payload: {
        count: 203,
        results: [{ id: 1 }, { id: 2 }],
      },
      request: { params: { contentType: 'OFFICER', term: '123' } },
    };

    analyticTrackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    tracking.trackSingleSearchResults.should.be.calledWith('OFFICER', '123', 2);
  });
});
