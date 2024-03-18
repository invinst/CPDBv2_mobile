import { OFFICER_REQUEST_SUCCESS } from 'actions/officer-page';
import { COMPLAINT_REQUEST_SUCCESS } from 'actions/complaint-page';
import { TRR_REQUEST_SUCCESS } from 'actions/trr-page';
import {
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
} from 'actions/pinboard';
import breadcrumbMapping from 'reducers/breadcrumb/breadcrumb-mapping';
import { LAWSUIT_FETCH_SUCCESS } from 'actions/lawsuit-page';


describe('breadcrumbMapping reducer', function () {
  it('should return initial state', function () {
    breadcrumbMapping(undefined, {}).should.be.empty();
  });

  it('should handle TRR_REQUEST_SUCCESS', function () {
    breadcrumbMapping({}, {
      type: TRR_REQUEST_SUCCESS,
      payload: { id: 123 },
    }).should.deepEqual({
      '/trr/123/': 'TRR 123',
    });
  });

  it('should handle OFFICER_REQUEST_SUCCESS', function () {
    breadcrumbMapping({}, {
      type: OFFICER_REQUEST_SUCCESS,
      payload: { 'officer_id': 123, 'full_name': 'Kevin Osborn' },
    }).should.deepEqual({
      '/officer/123/kevin-osborn/': 'Kevin Osborn',
    });
  });

  it('should handle COMPLAINT_REQUEST_SUCCESS', function () {
    breadcrumbMapping({}, {
      type: COMPLAINT_REQUEST_SUCCESS,
      payload: { crid: 123 },
    }).should.deepEqual({
      '/complaint/123/': 'CR 123',
    });
  });

  it('should handle LAWSUIT_FETCH_SUCCESS', function () {
    breadcrumbMapping({}, {
      type: LAWSUIT_FETCH_SUCCESS,
      payload: { 'case_no': 123 },
    }).should.deepEqual({
      '/lawsuit/123/': 'Case 123',
    });
  });

  it('should store pinboard breadcrumb text when successfully creating pinboard ', function () {
    breadcrumbMapping({}, {
      type: PINBOARD_CREATE_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: 'Simple Title',
      },
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard - Simple Title' });
  });

  it('should store pinboard breadcrumb text when successfully fetch pinboard page', function () {
    breadcrumbMapping({}, {
      type: PINBOARD_FETCH_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: 'My pinboard',
      },
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard - My pinboard' });
  });

  it('should store pinboard breadcrumb text when successfully fetch pinboard page but without title', function () {
    breadcrumbMapping({}, {
      type: PINBOARD_FETCH_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: '',
      },
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard' });
  });

  it('should store pinboard breadcrumb text when successfully update pinboard page', function () {
    breadcrumbMapping({}, {
      type: PINBOARD_UPDATE_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: 'My pinboard',
      },
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard - My pinboard' });
  });

  it('should store pinboard breadcrumb text when successfully update pinboard page but without title', function () {
    breadcrumbMapping({}, {
      type: PINBOARD_UPDATE_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: '',
      },
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard' });
  });

  it('should store pinboard breadcrumb text when successfully retrieve latest pinboard', function () {
    breadcrumbMapping({}, {
      type: PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: 'My pinboard',
      },
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard - My pinboard' });
  });

  it('should store pinboard breadcrumb text when successfully retrieve latest pinboard but without title', function () {
    breadcrumbMapping({}, {
      type: PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
      payload: {
        id: 'b3380b9b',
        title: '',
      },
    }).should.eql({ '/pinboard/b3380b9b/': 'Pinboard' });
  });
});
