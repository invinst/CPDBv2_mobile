import { spy, stub, useFakeTimers } from 'sinon';

import * as tracking from 'utils/tracking';


describe('tracking utils', function () {
  beforeEach(function () {
    spy(window, 'ga');
    stub(window.clicky, 'log');
  });

  afterEach(function () {
    window.ga.restore();
    window.clicky.log.restore();
  });

  describe('trackSwipeLandingPageCarousel', function () {
    it('should send event analytic', function () {
      tracking.trackSwipeLandingPageCarousel('left', 'type');

      window.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'landing_page_carousel',
        eventAction: 'swipe_left',
        eventLabel: 'type',
      });
      window.clicky.log.should.be.calledWith('/', 'swipe_left_type');
    });
  });

  describe('trackPageView', function () {
    it('should send event analytic', function () {
      tracking.trackPageView('pathname');

      window.ga.should.be.calledWith('send', {
        hitType: 'pageview',
        page: 'pathname',
      });
    });
  });

  describe('trackSearchResultsCount', function () {
    it('should send event analytic', function () {
      tracking.trackSearchResultsCount(12);

      window.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'search',
        eventAction: 'num_results',
        eventValue: 12,
      });
      window.clicky.log.should.be.calledWith(document.location.pathname, 'num_results: 12');
    });
  });

  describe('trackSearchQuery', function () {
    it('should send event analytic at most once in 500ms', function () {
      const clock = useFakeTimers();

      tracking.trackSearchQuery('que');
      tracking.trackSearchQuery('quer');
      clock.tick(550);

      window.ga.should.be.calledOnce();
      window.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'search',
        eventAction: 'change_query',
        eventLabel: 'quer',
      });
      window.clicky.log.should.be.calledOnce();
      window.clicky.log.should.be.calledWith(document.location.pathname, 'change_query: quer');

      clock.tick(1000);
      tracking.trackSearchQuery('query');
      clock.tick(550);

      window.ga.should.be.calledTwice();
      window.clicky.log.should.be.calledTwice();

      clock.restore();
    });
  });

  describe('trackOpenExplainer', function () {
    it('should send event analytic', function () {
      tracking.trackOpenExplainer(123);

      window.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'visual_token_explainer',
        eventAction: 'open',
        eventValue: 123,
      });
      window.clicky.log.should.be.calledWith(document.location.pathname, 'open_visual_token_explainer: 123');
    });
  });

  describe('trackAttachmentClick', function () {
    it('should send event analytic', function () {
      tracking.trackAttachmentClick('/', '/complaint/123456/');

      window.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'attachment_click',
        eventAction: 'click',
        eventLabel: 'Source URL: / - Target URL: /complaint/123456/',
      });
      window.clicky.log.should.be.calledWith(
        document.location.pathname,
        'attachment_click: Source URL / - Target URL /complaint/123456/'
      );
    });
  });
});
