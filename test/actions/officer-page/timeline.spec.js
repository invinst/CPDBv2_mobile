import constants from 'constants';
import { v2Url } from 'utils/url-util';
import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE,
  getOfficerTimeline,
} from 'actions/officer-page/timeline';


describe('timeline actions', function () {
  describe('getOfficerTimeline', function () {
    it('should return right action', function () {
      getOfficerTimeline(11).should.eql({
        types: [
          OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START,
          OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
          OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: `${v2Url(constants.OFFICER_API_ENDPOINT)}11/new-timeline-items/`,
            adapter: undefined,
            params: {}
          }
        },
        meta: {
          id: 11
        }
      });
    });
  });
});
