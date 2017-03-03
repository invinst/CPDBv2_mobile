import should from 'should'; // eslint-disable-line no-unused-vars
import { spy, useFakeTimers } from 'sinon';
import * as NavigationUtil from 'utils/NavigationUtil';

describe('NavigationUtil', () => {
  describe('goUp', () => {
    it('should do nothing if already at root path', () => {
      const router = { push: spy() };
      NavigationUtil.goUp(router, '/');
      router.push.called.should.be.false();
    });

    it('should go to /reporting if currently at /reporting/<id>', () => {
      const router = { push: spy() };
      NavigationUtil.goUp(router, '/reporting/1');

      router.push.calledWith('/reporting').should.be.true();
    });

    it('should go to root if currently at /reporting', () => {
      const router = { push: spy() };
      NavigationUtil.goUp(router, '/reporting');

      router.push.calledWith('').should.be.true();
    });

    describe('scrollTo', () => {
      beforeEach(function () {
        this.clock = useFakeTimers();
      });

      afterEach(function () {
        this.clock.restore();
      });

      it('should do nothing if duration <= 0', function () {
        const element = { scrollTop: 99 };
        NavigationUtil.scrollTo(element, 3, 0);
        element.scrollTop.should.be.eql(99);
      });

      it('should immediately scroll to top if next scroll step is too short', function () {
        const element = { scrollTop: 1 };
        NavigationUtil.scrollTo(element, 0, 1000);
        element.scrollTop.should.be.eql(0);
      });

      it('should scroll correctly each tick', function () {
        const element = { scrollTop: 500 };
        NavigationUtil.scrollTo(element, 0, 500);
        element.scrollTop.should.be.eql(500);
        this.clock.tick(10);
        element.scrollTop.should.be.eql(490);
        this.clock.tick(490);
        element.scrollTop.should.be.eql(0);
      });
    });

    describe('scrollToTop', () => {
      it('should call scrollTop with appropriate params', function () {
        spy(NavigationUtil, 'scrollTo');
        NavigationUtil.scrollToTop(NavigationUtil.scrollTo);
        NavigationUtil.scrollTo.called.should.be.true();
        NavigationUtil.scrollTo.restore();
      });
    });
  });
});
