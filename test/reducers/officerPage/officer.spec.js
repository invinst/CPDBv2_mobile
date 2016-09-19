import { OFFICER_PAGE_REQUEST_SUCCESS, OFFICER_PAGE_REQUEST_FAILURE } from 'actions/officer';
import officer from 'reducers/officerPage/officer';


describe('officer reducer', function () {
  it('should return initial state', function () {
    officer(undefined, {}).should.eql({});
  });

  it('should handle OFFICER_PAGE_REQUEST_SUCCESS', function () {
    const officerResult = { a: 1 };

    officer({}, {
      type: OFFICER_PAGE_REQUEST_SUCCESS,
      payload: officerResult
    }).should.eql(officerResult);
  });

  it('should handle OFFICER_PAGE_REQUEST_FAILURE', function () {
    officer({}, {
      type: OFFICER_PAGE_REQUEST_FAILURE
    }).should.eql({});
  });
});
