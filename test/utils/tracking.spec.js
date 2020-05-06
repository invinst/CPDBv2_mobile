import { spy, stub, useFakeTimers } from 'sinon';

import * as tracking from 'utils/tracking';
import axiosClient from 'utils/axios-client';
import constants from 'constants';
import { v2Url } from 'utils/url-util';


const TRACKING_API_URL = v2Url(constants.TRACKING_API_ENDPOINT);

describe('tracking utils', function () {
  describe('ga and clicky script is loaded', function () {
    beforeEach(function () {
      window.gaLoaded = true;
      spy(window, 'ga');
      stub(window.clicky, 'log');
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
        window.clicky.log.should.be.calledWith(document.location.pathname, 'swipe_left_type');
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

    describe('trackSingleSearchResults', function () {
      it('should send event analytic', function () {
        tracking.trackSingleSearchResults('contentType', 'query', 123);

        global.ga.should.be.calledWith('send', {
          hitType: 'event',
          eventCategory: 'contentType',
          eventAction: 'single_search',
          eventLabel: 'query',
          eventValue: 123,
        });
        global.clicky.log.should.be.calledWith(
          document.location.pathname, 'single_search_query: query with 123 results'
        );
      });
    });

    describe('trackSearchFocusedItem', function () {
      it('should send event analytic at most once in 500ms', function () {
        const clock = useFakeTimers();

        tracking.trackSearchFocusedItem('contentType', 'query', 'itemId1', 1);
        tracking.trackSearchFocusedItem('contentType', 'query', 'itemId2', 2);
        clock.tick(550);

        global.ga.should.be.calledTwice();
        global.clicky.log.should.be.calledTwice();
        global.ga.should.be.calledWith('send', {
          hitType: 'event',
          eventCategory: 'contentType',
          eventAction: 'suggestion_click',
          eventLabel: 'itemId2',
          eventValue: 2,
        });
        global.ga.should.be.calledWith('send', {
          hitType: 'event',
          eventCategory: 'contentType',
          eventAction: 'suggestion_click_with_query',
          eventLabel: 'itemId2 - query',
          eventValue: 2,
        });
        global.clicky.log.should.be.calledWith(document.location.pathname, 'Item itemId2 with rank 2 is focused');
        global.clicky.log.should.be.calledWith(
          document.location.pathname,
          'Item itemId2 with rank 2 is focused via "query" query'
        );

        clock.tick(1000);
        tracking.trackSearchFocusedItem('contentType', 'query', 'itemId3');
        clock.tick(550);

        global.ga.callCount.should.equal(4);
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

  describe('ga and clicky script is unable to load', function () {
    beforeEach(function () {
      global.gaLoaded = false;
      stub(global, 'ga').value(null);
      stub(global, 'clicky').value(null);
      stub(axiosClient, 'post').returns(new Promise(resolve => resolve()));
    });

    it('should post tracking data to server', function () {
      tracking.trackSingleSearchResults('contentType', 'query', 123);
      const expectedTrackingParams = {
        clicky: {
          title: 'single_search_query: query with 123 results',
          href: document.location.pathname,
        },
        ga: {
          'hit_type': 'event',
          'event_category': 'contentType',
          'event_action': 'single_search',
          'event_label': 'query',
          'event_value': 123,
          'page': undefined,
        },
      };
      axiosClient.post.should.be.calledWith(TRACKING_API_URL, expectedTrackingParams);
    });

    describe('trackPageView', function () {
      it('should post tracking data to server', function () {
        tracking.trackPageView('/officer/123/');

        const expectedTrackingParams = {
          clicky: {
            type: 'pageview',
            href: document.location.pathname,
          },
          ga: {
            'hit_type': 'pageview',
            'event_category': undefined,
            'event_action': undefined,
            'event_label': undefined,
            'event_value': undefined,
            'page': '/officer/123/',
          },
        };
        axiosClient.post.should.be.calledWith(TRACKING_API_URL, expectedTrackingParams);
      });
    });
  });

  describe('clicky script is unable to load', function () {
    beforeEach(function () {
      stub(global, 'clicky').value(null);
      global.gaLoaded = true;
      spy(global, 'ga');
      stub(axiosClient, 'post').usingPromise(Promise).resolves({});
    });

    describe('trackSwipeLandingPageCarousel', function () {
      it('should send correct analytic data', function () {
        tracking.trackSwipeLandingPageCarousel('left', 'type');

        global.ga.should.be.calledWith('send', {
          hitType: 'event',
          eventCategory: 'landing_page_carousel',
          eventAction: 'swipe_left',
          eventLabel: 'type',
        });
        const expectedClickyTrackingParams = {
          href: document.location.pathname,
          title: 'swipe_left_type',
        };
        axiosClient.post.should.be.calledWith(TRACKING_API_URL, { clicky: expectedClickyTrackingParams });
      });
    });
  });
});
