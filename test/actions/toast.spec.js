import { SHOW_TOAST, showToast } from 'actions/toast';


describe('showToast action', function () {
  it('should return correct action', function () {
    showToast({
      id: '1234',
      type: 'OFFICER',
      isPinned: false,
    }).should.deepEqual({
      type: SHOW_TOAST,
      payload: {
        id: '1234',
        type: 'OFFICER',
        isPinned: false,
      },
    });
  });
});
