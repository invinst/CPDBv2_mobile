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

function _trackSearchQuery(query) {
  clickyLog(`change_query: ${query}`);
  window.ga('send', {
    hitType: 'event',
    eventCategory: 'search',
    eventAction: 'change_query',
    eventLabel: query,
  });
}

export const trackSearchQuery = throttle(_trackSearchQuery, 500, { 'leading': false });

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
