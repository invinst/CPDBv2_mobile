import { throttle } from 'lodash';


export const trackSwipeLanddingPageCarousel = (direction, type) => {
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
  window.ga('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'num_results',
    eventValue: count,
  });
};

export function trackSearchQuery(query) {
  this.throttledSearchQueryGA = this.throttledSearchQueryGA || throttle(window.ga, 500, { 'leading': false });
  this.throttledSearchQueryGA('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'change_query',
    eventLabel: query,
  });
}

export const trackOpenExplainer = (officerId) => {
  window.ga('send', {
    hitType: 'event',
    eventCategory: 'visual_token_explainer',
    eventAction: 'open',
    eventValue: officerId,
  });
};

export const trackAttachmentClick = (sourceUrl, targetUrl) => {
  window.ga('send', {
    hitType: 'event',
    eventCategory: 'attachment_click',
    eventAction: 'click',
    eventLabel: `Source URL: ${sourceUrl} - Target URL: ${targetUrl}`,
  });
};

export const trackSingleSearchResults = (contentType, query, resultsCount) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: contentType,
    eventAction: 'single_search',
    eventLabel: query,
    eventValue: resultsCount,
  });
};

const _trackSearchFocusedItem = (contentType, query, itemId, rank) => {
  global.ga('send', {
    hitType: 'event',
    eventCategory: contentType,
    eventAction: 'view_search_preview',
    eventLabel: itemId,
    eventValue: rank,
  });

  global.ga('send', {
    hitType: 'event',
    eventCategory: contentType,
    eventAction: 'view_search_preview_with_query',
    eventLabel: `${ itemId } - ${ query }`,
    eventValue: rank,
  });
};

export const trackSearchFocusedItem = throttle(_trackSearchFocusedItem, 500, { 'leading': false });
