import should from 'should'; // eslint-disable-line no-unused-vars
import { spy } from 'sinon';
import { goUp } from 'utils/NavigationUtil';

describe('NavigationUtil', () => {
  describe('goUp', () => {
    it('should do nothing if already at root path', () => {
      const router = { push: spy() };
      goUp(router, '/');
      router.push.called.should.be.false();
    });

    it('should go to /reporting if currently at /reporting/<id>', () => {
      const router = { push: spy() };
      goUp(router, '/reporting/1');

      router.push.calledWith('/reporting').should.be.true();
    });

    it('should go to root if currently at /reporting', () => {
      const router = { push: spy() };
      goUp(router, '/reporting');

      router.push.calledWith('').should.be.true();
    });
  });
});
