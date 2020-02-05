import sinon from 'sinon';

import * as NavigationUtil from 'utils/navigation-util';

describe('NavigationUtil', function () {
  describe('goUp', function () {
    it('should do nothing if already at root path', function () {
      const router = { push: sinon.spy() };
      NavigationUtil.goUp(router, '/');
      router.push.called.should.be.false();
    });

    it('should go back one level if link is not one of NONEXISTENT_ROUTES', function () {
      const router = { push: sinon.spy() };
      NavigationUtil.goUp(router, '/existent/1/');

      router.push.calledWith('/existent/').should.be.true();
    });

    it('should go to root if currently at /existent/', function () {
      const router = { push: sinon.spy() };
      NavigationUtil.goUp(router, '/existent/');

      router.push.calledWith('/').should.be.true();
    });

    it('should go to straight root if current path is /officer/<id>/', function () {
      const router = { push: sinon.spy() };
      NavigationUtil.goUp(router, '/officer/11/');

      router.push.calledWith('/').should.be.true();
    });
  });


  describe('scrollTo', function () {
    beforeEach(function () {
      this.clock = sinon.useFakeTimers();
    });

    it('should do nothing if duration <= 0', function () {
      const element = { scrollTop: 99 };
      NavigationUtil.animatedScrollTo(element, 3, 0);
      element.scrollTop.should.be.eql(99);
    });

    it('should immediately scroll to top if next scroll step is too short', function () {
      const element = { scrollTop: 1 };
      NavigationUtil.animatedScrollTo(element, 0, 1000);
      element.scrollTop.should.be.eql(0);
    });

    it('should scroll correctly each tick', function () {
      const element = { scrollTop: 500 };
      NavigationUtil.animatedScrollTo(element, 0, 500);
      element.scrollTop.should.be.eql(500);
      this.clock.tick(10);
      element.scrollTop.should.be.eql(490);
      this.clock.tick(490);
      element.scrollTop.should.be.eql(0);
    });
  });


  describe('scrollToTop', function () {
    beforeEach(function () {
      this.animatedScrollTo = sinon.spy(NavigationUtil, 'animatedScrollTo');
    });

    it('should call scrollTop with appropriate params', function () {
      NavigationUtil.scrollToTop(this.animatedScrollTo)();
      this.animatedScrollTo.called.should.be.true();
    });
  });


  describe('instantScrollToTop', function () {
    it('should scroll whole body to top', function () {
      const scrollToStub = sinon.stub(window, 'scrollTo');

      NavigationUtil.instantScrollToTop();

      scrollToStub.should.be.calledOnce();
      scrollToStub.should.be.calledWith(0, 0);
    });
  });

  describe('getCurrentScrollPosition', function () {
    it('should return body scrollTop', function () {
      sinon.stub(document.body, 'scrollTop').value(12);

      NavigationUtil.getCurrentScrollPosition().should.eql(12);
    });

    it('should return documentElement scrollTop if body scrollTop is undefined', function () {
      sinon.stub(document.body, 'scrollTop').value(undefined);
      sinon.stub(document.documentElement, 'scrollTop').value(13);

      NavigationUtil.getCurrentScrollPosition().should.eql(13);
    });
  });


  describe('instantScrollTo', function () {
    beforeEach(function () {
      this.stubScrollTo = sinon.stub(window, 'scrollTo');
    });

    it('should call window.scrollTo', function () {
      NavigationUtil.instantScrollTo(111);
      this.stubScrollTo.calledWith(0, 111).should.be.true();
    });
  });

  describe('getPageYBottomOffset', function () {
    beforeEach(function () {
      sinon.stub(window.document.body, 'offsetHeight').value(1000);
      sinon.stub(window, 'pageYOffset').value(300);
    });

    it('should return distance to bottom', function () {
      NavigationUtil.getPageYBottomOffset().should.equal(700);
    });
  });

  describe('scrollByBottomOffset', function () {
    beforeEach(function () {
      sinon.stub(window.document.body, 'offsetHeight').value(1000);
      this.stubScrollTo = sinon.stub(window, 'scrollTo');
    });

    it('should return distance to bottom', function () {
      NavigationUtil.scrollByBottomOffset(400);
      this.stubScrollTo.should.be.calledWith(0, 600);
    });
  });
});
