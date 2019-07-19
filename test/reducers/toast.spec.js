import { SHOW_TOAST } from 'actions/toast';
import toast from 'reducers/toast';


describe('toast reducer', function () {
  it('should return initial state', function () {
    toast(undefined, {}).should.be.empty();
  });

  it('should handle SHOW_TOAST', function () {
    toast({}, {
      type: SHOW_TOAST,
      payload: {
        id: '1234',
        type: 'OFFICER',
        isPinned: false,
      },
    }).should.be.deepEqual({
      id: '1234',
      type: 'OFFICER',
      isPinned: false,
    });
  });
});
