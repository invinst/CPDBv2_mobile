import {
  SHARE_MENU_OPEN, SHARE_MENU_CLOSE
} from 'actions/navbar';
import shareMenuIsOpen from 'reducers/navbar/share-menu-is-open';


describe('shareMenuIsOpen reducer', function () {
  it('should return initial state', function () {
    shareMenuIsOpen(undefined, {}).should.be.false();
  });

  it('should handle SHARE_MENU_OPEN', function () {
    shareMenuIsOpen(false, { type: SHARE_MENU_OPEN }).should.be.true();
  });

  it('should handle SHARE_MENU_CLOSE', function () {
    shareMenuIsOpen(true, { type: SHARE_MENU_CLOSE }).should.be.false();
  });
});
