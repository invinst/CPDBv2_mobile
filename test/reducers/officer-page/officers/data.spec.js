import { OFFICER_REQUEST_SUCCESS, OFFICER_REQUEST_FAILURE } from 'actions/officer-page';
import officerData from 'reducers/officer-page/officers/data';


describe('officer data reducer', function () {
  it('should return initial state', function () {
    officerData(undefined, {}).should.eql({});
  });

  it('should handle OFFICER_REQUEST_SUCCESS', function () {
    const officerResult = { 'officer_id': 1, 'full_name': 'John' };

    officerData({ 1: { 'full_name': 'An officer' } }, {
      type: OFFICER_REQUEST_SUCCESS,
      payload: officerResult
    }).should.eql({
      1: officerResult
    });

    officerData({ 2: { 'full_name': 'An officer' } }, {
      type: OFFICER_REQUEST_SUCCESS,
      payload: officerResult
    }).should.eql({
      2: { 'full_name': 'An officer' },
      1: officerResult
    });
  });

  it('should handle OFFICER_REQUEST_FAILURE', function () {
    officerData({ 1: { 'full_name': 'An officer' } }, {
      type: OFFICER_REQUEST_FAILURE
    }).should.eql({ 1: { 'full_name': 'An officer' } });
  });
});
