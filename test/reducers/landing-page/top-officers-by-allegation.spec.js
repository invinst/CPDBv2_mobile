import {
  TOP_OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS,
  TOP_OFFICERS_BY_ALLEGATION_REQUEST_FAILURE
} from 'actions/landing-page';
import topOfficersByAllegation from 'reducers/landing-page/top-officers-by-allegation';


describe('topOfficersByAllegation reducer', function () {
  it('should return initial state', function () {
    topOfficersByAllegation(undefined, []).should.be.empty();
  });

  it('should handle TOP_OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS', function () {
    topOfficersByAllegation({}, {
      type: TOP_OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS,
      payload: 'abc'
    }).should.eql('abc');
  });

  it('should handle TOP_OFFICERS_BY_ALLEGATION_REQUEST_FAILURE', function () {
    topOfficersByAllegation('abc', {
      type: TOP_OFFICERS_BY_ALLEGATION_REQUEST_FAILURE,
      payload: {}
    }).should.eql('abc');
  });
});
