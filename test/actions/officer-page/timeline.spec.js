import { OFFICER_API_ENDPOINT } from 'constants';
import { v2Url } from 'utils/url-util';
import {
  OFFICER_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE,
  OFFICER_TIMELINE_ITEMS_CHANGE_FILTER,
  getOfficerTimeline,
  changeFilter,
} from 'actions/officer-page/timeline';


describe('timeline actions', function () {
  describe('getOfficerTimeline', function () {
    it('should return right action', function () {
      getOfficerTimeline(11).should.eql({
        types: [
          OFFICER_TIMELINE_ITEMS_REQUEST_START,
          OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
          OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(OFFICER_API_ENDPOINT)}11/new-timeline-items/`,
            adapter: undefined,
            params: {},
          },
        },
        meta: {
          id: 11,
        },
      });
    });
  });

  describe('changeFilter', function () {
    it('should return the right action', function () {
      changeFilter('COMPLAINTS').should.eql({
        type: OFFICER_TIMELINE_ITEMS_CHANGE_FILTER,
        payload: 'COMPLAINTS',
      });
    });
  });
});
