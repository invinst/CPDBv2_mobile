import { throttle } from 'lodash';


export const trackSwipeLanddingPageCarousel = (direction, type) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'landing_page_carousel',
    eventAction: `swipe_${direction}`,
    eventLabel: type
  });
};

export const trackPageView = (pathname) => {
  window.ga('send', {
    hitType: 'pageview',
    page: pathname
  });
};

export const trackSearchResultsCount = (count) => {
  window.ga('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'num_results',
    eventValue: count
  });
};

export function trackSearchQuery(query) {
  this.throttledSearchQueryGA = this.throttledSearchQueryGA || throttle(window.ga, 500, { 'leading': false });
  this.throttledSearchQueryGA('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'change_query',
    eventLabel: query
  });
}

export const trackOpenExplainer = (officerId) => {
  window.ga('send', {
    hitType: 'event',
    eventCategory: 'visual_token_explainer',
    eventAction: 'open',
    eventValue: officerId
  });
};
