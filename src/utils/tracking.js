import { throttle } from 'lodash';


function clickyLog(title) {
  global.clicky.log(document.location.pathname, title);
}

export const trackSwipeLandingPageCarousel = (direction, type) => {
  global.clicky.log('/', `swipe_${direction}_${type}`);
  global.ga('send', {
    hitType: 'event',
    eventCategory: 'landing_page_carousel',
    eventAction: `swipe_${direction}`,
    eventLabel: type,
  });
};

export const trackPageView = (pathname) => {
  window.ga('send', {
    hitType: 'pageview',
    page: pathname,
  });
};

export const trackSearchResultsCount = (count) => {
  clickyLog(`num_results: ${count}`);
  window.ga('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'num_results',
    eventValue: count,
  });
};

export function trackSearchQuery(query) {
  this.throttledClickyLog = this.throttledClickyLog || throttle(clickyLog, 500, { 'leading': false });
  this.throttledSearchQueryGA = this.throttledSearchQueryGA || throttle(window.ga, 500, { 'leading': false });

  this.throttledClickyLog(`change_query: ${query}`);
  this.throttledSearchQueryGA('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'change_query',
    eventLabel: query,
  });
}

export const trackOpenExplainer = (officerId) => {
  clickyLog(`open_visual_token_explainer: ${officerId}`);
  window.ga('send', {
    hitType: 'event',
    eventCategory: 'visual_token_explainer',
    eventAction: 'open',
    eventValue: officerId,
  });
};

export const trackAttachmentClick = (sourceUrl, targetUrl) => {
  clickyLog(`attachment_click: Source URL ${sourceUrl} - Target URL ${targetUrl}`);
  window.ga('send', {
    hitType: 'event',
    eventCategory: 'attachment_click',
    eventAction: 'click',
    eventLabel: `Source URL: ${sourceUrl} - Target URL: ${targetUrl}`,
  });
};
