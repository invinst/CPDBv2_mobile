import { spy, stub, useFakeTimers } from 'sinon';

import * as NavigationUtil from 'utils/navigation-util';

describe('NavigationUtil', function () {
  describe('scrollTo', function () {
    beforeEach(function () {
      this.clock = useFakeTimers();
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
      this.animatedScrollTo = spy(NavigationUtil, 'animatedScrollTo');
    });

    it('should call scrollTop with appropriate params', function () {
      NavigationUtil.scrollToTop(this.animatedScrollTo)();
      this.animatedScrollTo.called.should.be.true();
    });
  });


  describe('instantScrollToTop', function () {
    it('should scroll whole body to top', function () {
      const scrollToStub = stub(window, 'scrollTo');

      NavigationUtil.instantScrollToTop();

      scrollToStub.should.be.calledOnce();
      scrollToStub.should.be.calledWith(0, 0);
    });
  });

  describe('getCurrentScrollPosition', function () {
    it('should return body scrollTop', function () {
      stub(document.body, 'scrollTop').value(12);

      NavigationUtil.getCurrentScrollPosition().should.eql(12);
    });

    it('should return documentElement scrollTop if body scrollTop is undefined', function () {
      stub(document.body, 'scrollTop').value(undefined);
      stub(document.documentElement, 'scrollTop').value(13);

      NavigationUtil.getCurrentScrollPosition().should.eql(13);
    });
  });


  describe('instantScrollTo', function () {
    beforeEach(function () {
      this.stubScrollTo = stub(window, 'scrollTo');
    });

    it('should call window.scrollTo', function () {
      NavigationUtil.instantScrollTo(111);
      this.stubScrollTo.calledWith(0, 111).should.be.true();
    });
  });

  describe('getPageYBottomOffset', function () {
    beforeEach(function () {
      stub(window.document.body, 'offsetHeight').value(1000);
      stub(window, 'pageYOffset').value(300);
    });

    it('should return distance to bottom', function () {
      NavigationUtil.getPageYBottomOffset().should.equal(700);
    });
  });

  describe('scrollByBottomOffset', function () {
    beforeEach(function () {
      stub(window.document.body, 'offsetHeight').value(1000);
      this.stubScrollTo = stub(window, 'scrollTo');
    });

    it('should return distance to bottom', function () {
      NavigationUtil.scrollByBottomOffset(400);
      this.stubScrollTo.should.be.calledWith(0, 600);
    });
  });
});
