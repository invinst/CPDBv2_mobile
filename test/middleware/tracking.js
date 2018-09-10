import { stub } from 'sinon';

import trackingMiddleware from 'middleware/tracking';
import { ROUTE_CHANGED } from 'actions/navigation';
import { SEARCH_INPUT_CHANGED, SUGGEST_ALL_REQUEST_SUCCESS, SUGGESTION_REQUEST_SUCCESS } from 'actions/suggestion';
import * as GATracking from 'utils/google_analytics_tracking';


describe('trackingMiddleware', function () {
  it('should track PageView event on ROUTE_CHANGED', function () {
    stub(GATracking, 'trackPageView');

    let dispatched;
    const dispatchAction = {
      type: ROUTE_CHANGED,
      payload: 'abc'
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    GATracking.trackPageView.should.be.calledWith('abc');

    GATracking.trackPageView.restore();
  });

  it('should track search query on CHANGE_SEARCH_QUERY', function () {
    stub(GATracking, 'trackSearchQuery');

    let dispatched;
    const dispatchAction = {
      type: SEARCH_INPUT_CHANGED,
      payload: 'abc'
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    GATracking.trackSearchQuery.should.be.calledWith('abc');

    GATracking.trackSearchQuery.restore();
  });

  it('should track search results count on SUGGEST_ALL_REQUEST_SUCCESS', function () {
    stub(GATracking, 'trackSearchResultsCount');

    let dispatched;
    const dispatchAction = {
      type: SUGGEST_ALL_REQUEST_SUCCESS,
      payload: { 'CR': [{ id: 1 }] }
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    GATracking.trackSearchResultsCount.should.be.calledWith(1);

    GATracking.trackSearchResultsCount.restore();
  });

  it('should track search results count on SUGGESTION_REQUEST_SUCCESS', function () {
    stub(GATracking, 'trackSearchResultsCount');

    let dispatched;
    const dispatchAction = {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: {
        'COMMUNITY': [{ id: 1 }, { id: 2 }],
        'CR': [{ crid: 3 }]
      }
    };

    trackingMiddleware({})(action => dispatched = action)(dispatchAction);

    dispatched.should.eql(dispatchAction);
    GATracking.trackSearchResultsCount.should.be.calledWith(3);

    GATracking.trackSearchResultsCount.restore();
  });
});
