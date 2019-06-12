import React from 'react';
import should from 'should'; // eslint-disable-line no-unused-vars
import { mount } from 'enzyme';
import { spy, stub, useFakeTimers } from 'sinon';

import * as NavigationUtil from 'utils/navigation-util';

describe('NavigationUtil', function () {
  describe('goUp', function () {
    it('should do nothing if already at root path', function () {
      const router = { push: spy() };
      NavigationUtil.goUp(router, '/');
      router.push.called.should.be.false();
    });

    it('should go back one level if link is not one of NONEXISTENT_ROUTES', function () {
      const router = { push: spy() };
      NavigationUtil.goUp(router, '/existent/1/');

      router.push.calledWith('/existent/').should.be.true();
    });

    it('should go to root if currently at /existent/', function () {
      const router = { push: spy() };
      NavigationUtil.goUp(router, '/existent/');

      router.push.calledWith('/').should.be.true();
    });

    it('should go to straight root if current path is /officer/<id>/', function () {
      const router = { push: spy() };
      NavigationUtil.goUp(router, '/officer/11/');

      router.push.calledWith('/').should.be.true();
    });
  });


  describe('scrollTo', function () {
    beforeEach(function () {
      this.clock = useFakeTimers();
    });

    afterEach(function () {
      this.clock.restore();
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

    afterEach(function () {
      this.animatedScrollTo.restore();
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

      scrollToStub.restore();
    });
  });

  describe('getCurrentScrollPosition', function () {
    it('should return body scrollTop', function () {
      const scrollTopStub = stub(document.body, 'scrollTop').value(12);

      NavigationUtil.getCurrentScrollPosition().should.eql(12);

      scrollTopStub.restore();
    });

    it('should return documentElement scrollTop if body scrollTop is undefined', function () {
      const bodyScrollTopStub = stub(document.body, 'scrollTop').value(undefined);
      const documentElementScrollTopStub = stub(document.documentElement, 'scrollTop').value(13);

      NavigationUtil.getCurrentScrollPosition().should.eql(13);

      bodyScrollTopStub.restore();
      documentElementScrollTopStub.restore();
    });
  });


  describe('instantScrollTo', function () {
    beforeEach(function () {
      this.stubScrollTo = stub(window, 'scrollTo');
    });

    afterEach(function () {
      this.stubScrollTo.restore();
    });

    it('should call window.scrollTo', function () {
      NavigationUtil.instantScrollTo(111);
      this.stubScrollTo.calledWith(0, 111).should.be.true();
    });
  });
});
