import breadcrumbMapping from 'reducers/breadcrumb/breadcrumb-mapping';

import { OFFICER_REQUEST_SUCCESS } from 'actions/officer-page';
import { COMPLAINT_REQUEST_SUCCESS } from 'actions/complaint-page';
import { TRR_REQUEST_SUCCESS } from 'actions/trr-page';
import {
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
} from 'actions/pinboard';


describe('breadcrumbMapping', function () {
  it('should return initial state', function () {
    breadcrumbMapping(undefined, {}).should.eql({});
  });

  it('should store officer breadcrumb text', function () {
    breadcrumbMapping({}, {
      type: OFFICER_REQUEST_SUCCESS,
      payload: {
        'officer_id': '123',
        'full_name': 'Ronald Hernandez',
      },
    }).should.eql({ '/officer/123/ronald-hernandez/': 'Ronald Hernandez' });
  });

  it('should store complaint breadcrumb text', function () {
    breadcrumbMapping({}, {
      type: COMPLAINT_REQUEST_SUCCESS,
      payload: {
        crid: '456',
      },
    }).should.eql({ '/complaint/456/': 'CR 456' });
  });

  it('should store trr breadcrumb text', function () {
    breadcrumbMapping({}, {
      type: TRR_REQUEST_SUCCESS,
      payload: {
        id: '123',
      },
    }).should.eql({ '/trr/123/': 'TRR 123' });
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
