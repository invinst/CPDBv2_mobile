import {
  RECENT_ACTIVITIES_REQUEST_SUCCESS,
  RECENT_ACTIVITIES_REQUEST_FAILURE,
} from 'actions/landing-page';
import recentActivities from 'reducers/landing-page/recent-activities';


describe('recentActivities reducer', function () {
  it('should return initial state', function () {
    recentActivities(undefined, []).should.be.empty();
  });

  it('should handle RECENT_ACTIVITIES_REQUEST_SUCCESS', function () {
    recentActivities({}, {
      type: RECENT_ACTIVITIES_REQUEST_SUCCESS,
      payload: 'abc',
    }).should.eql('abc');
  });

  it('should handle RECENT_ACTIVITIES_REQUEST_FAILURE', function () {
    recentActivities('abc', {
      type: RECENT_ACTIVITIES_REQUEST_FAILURE,
      payload: {},
    }).should.eql('abc');
  });
});
