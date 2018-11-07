import { OFFICER_REQUEST_SUCCESS } from 'actions/officer-page';
import { COMPLAINT_REQUEST_SUCCESS } from 'actions/complaint-page';
import { TRR_REQUEST_SUCCESS } from 'actions/trr-page';
import breadcrumbMapping from 'reducers/breadcrumb-mapping';


describe('breadcrumbMapping reducer', function () {
  it('should return initial state', function () {
    breadcrumbMapping(undefined, {}).should.be.empty();
  });

  it('should handle TRR_REQUEST_SUCCESS', function () {
    breadcrumbMapping({}, {
      type: TRR_REQUEST_SUCCESS,
      payload: { id: 123 }
    }).should.deepEqual({
      'trr/123/': 'TRR 123'
    });
  });

  it('should handle OFFICER_REQUEST_SUCCESS', function () {
    breadcrumbMapping({}, {
      type: OFFICER_REQUEST_SUCCESS,
      payload: { 'officer_id': 123, 'full_name': 'Kevin Osborn' }
    }).should.deepEqual({
      'officer/123/kevin-osborn/': 'Kevin Osborn'
    });
  });

  it('should handle COMPLAINT_REQUEST_SUCCESS', function () {
    breadcrumbMapping({}, {
      type: COMPLAINT_REQUEST_SUCCESS,
      payload: { crid: 123 }
    }).should.deepEqual({
      'complaint/123/': 'CR 123'
    });
  });
});
