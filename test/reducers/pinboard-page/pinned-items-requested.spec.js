import should from 'should';
import { LOCATION_CHANGE } from 'connected-react-router';

import pinnedItemsRequested from 'reducers/pinboard-page/pinned-items-requested';
import {
  PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
  PINBOARD_OFFICERS_FETCH_REQUEST_START,
  PINBOARD_TRRS_FETCH_REQUEST_START,
} from 'actions/pinboard';


describe('pinnedItemsRequested', function () {
  it('should have initial state', function () {
    should(pinnedItemsRequested(undefined, {})).be.false();
  });

  it('should handle PINBOARD_COMPLAINTS_FETCH_REQUEST_START', function () {
    pinnedItemsRequested(
      false,
      { type: PINBOARD_COMPLAINTS_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_OFFICERS_FETCH_REQUEST_START', function () {
    pinnedItemsRequested(
      false,
      { type: PINBOARD_OFFICERS_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_TRRS_FETCH_REQUEST_START', function () {
    pinnedItemsRequested(
      false,
      { type: PINBOARD_TRRS_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle LOCATION_CHANGE', function () {
    pinnedItemsRequested(
      true,
      {
        type: LOCATION_CHANGE,
        payload: { action: 'PUSH' },
      }
    ).should.be.false();
  });

  it('should handle LOCATION_CHANGE with REPLACE action when state is true', function () {
    pinnedItemsRequested(
      true,
      {
        type: LOCATION_CHANGE,
        payload: { action: 'REPLACE' },
      }
    ).should.be.true();
  });

  it('should handle LOCATION_CHANGE with REPLACE action when state is false', function () {
    pinnedItemsRequested(
      false,
      {
        type: LOCATION_CHANGE,
        payload: { action: 'REPLACE' },
      }
    ).should.be.false();
  });
});
