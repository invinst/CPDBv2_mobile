import { COMPLAINT_PAGE_TOGGLE_OPEN, COMPLAINT_PAGE_TOGGLE_CLOSE } from 'actions/complaint';
import { SEARCH_RESET } from 'actions/suggestion';
import toggle from 'reducers/complaintPage/toggle';


describe('toggle reducer', function () {
  it('should return initial state', function () {
    toggle(undefined, {}).should.be.false();
  });

  it('should handle COMPLAINT_PAGE_TOGGLE_OPEN', function () {
    toggle(false, {
      type: COMPLAINT_PAGE_TOGGLE_OPEN
    }).should.be.true();
  });

  it('should handle COMPLAINT_PAGE_TOGGLE_CLOSE', function () {
    toggle(true, {
      type: COMPLAINT_PAGE_TOGGLE_CLOSE
    }).should.be.false();
  });

  it('should handle SEARCH_RESET', function () {
    toggle(true, {
      type: SEARCH_RESET
    }).should.be.false();
  });
});
