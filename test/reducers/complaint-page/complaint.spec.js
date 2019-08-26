import complaint from 'reducers/complaint-page/complaints';
import { COMPLAINT_REQUEST_SUCCESS, COMPLAINT_REQUEST_FAILURE } from 'actions/complaint-page';


describe('complaint reducer', function () {
  it('should have initial state', function () {
    complaint(undefined, {}).should.eql({});
  });

  it('should handle COMPLAINT_REQUEST_SUCCESS', function () {
    complaint({ 'complaint': 'success' }, {
      type: COMPLAINT_REQUEST_SUCCESS,
      meta: {
        id: 1,
      },
      payload: [1, 2, 3],
    }).should.eql({ 'complaint': 'success', 1: [1, 2, 3] });
  });

  it('should handle COMPLAINT_REQUEST_FAILURE', function () {
    complaint({ 'complaint': 'failure' }, {
      type: COMPLAINT_REQUEST_FAILURE,
      payload: [1, 2, 3],

    }).should.eql({ 'complaint': 'failure' });
  });
});
