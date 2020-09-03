import {
  TOP_LAWSUITS_REQUEST_SUCCESS,
  TOP_LAWSUITS_REQUEST_FAILURE,
} from 'actions/landing-page';
import topLawsuits from 'reducers/landing-page/top-lawsuits';


describe('topLawsuits reducer', function () {
  it('should return initial state', function () {
    topLawsuits(undefined, []).should.be.empty();
  });

  it('should handle TOP_LAWSUITS_REQUEST_SUCCESS', function () {
    topLawsuits({}, {
      type: TOP_LAWSUITS_REQUEST_SUCCESS,
      payload: 'abc',
    }).should.eql('abc');
  });

  it('should handle TOP_LAWSUITS_REQUEST_FAILURE', function () {
    topLawsuits('abc', {
      type: TOP_LAWSUITS_REQUEST_FAILURE,
      payload: {},
    }).should.eql('abc');
  });
});
