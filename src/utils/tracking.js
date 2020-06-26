import { throttle, isEmpty, pick } from 'lodash';

import axiosClient from 'utils/axios-client';
import { v2Url } from 'utils/url-util';
import { TRACKING_API_ENDPOINT } from 'constants';


const analyticTrackingParams = ({ clickyData, gaData }) => {
  let trackingParams = {};
  if (!isEmpty(clickyData)) {
    trackingParams['clicky'] = pick(clickyData, ['type', 'href', 'title']);
  }
  if (!isEmpty(gaData)) {
    trackingParams['ga'] = {
      'hit_type': gaData.hitType,
      'event_category': gaData.eventCategory,
      'event_action': gaData.eventAction,
      'event_label': gaData.eventLabel,
      'event_value': gaData.eventValue,
      'page': gaData.page,
    };
  }
  return trackingParams;
};

const analyticTracking = ({ clickyData, gaData }) => {
  let serverSideTrackingData = {};
  clickyData['href'] = document.location.pathname;
  if (!global.clicky) {
    serverSideTrackingData['clickyData'] = clickyData;
  }
  if (!global.gaLoaded) {
    serverSideTrackingData['gaData'] = gaData;
  }

  if (!isEmpty(serverSideTrackingData)) {
    axiosClient.post(v2Url(TRACKING_API_ENDPOINT), analyticTrackingParams(serverSideTrackingData));
  }

  if (global.clicky && !clickyData.defaultTracking) {
    global.clicky.log(clickyData.href, clickyData.title, clickyData.type);
  }
  global.gaLoaded && global.ga('send', gaData);
};

export const trackSwipeLandingPageCarousel = (direction, type) => {
  analyticTracking({
    clickyData: {
      title: `swipe_${direction}_${type}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'landing_page_carousel',
      eventAction: `swipe_${direction}`,
      eventLabel: type,
    },
  });
};

export const trackPageView = (pathname) => {
  analyticTracking({
    clickyData: {
      type: 'pageview',
      defaultTracking: true,
    },
    gaData: {
      hitType: 'pageview',
      page: pathname,
    },
  });
};

export const trackSearchResultsCount = (count) => {
  analyticTracking({
    clickyData: {
      title: `num_results: ${count}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'search',
      eventAction: 'num_results',
      eventValue: count,
    },
  });
};

function _trackSearchQuery(query) {
  analyticTracking({
    clickyData: {
      title: `change_query: ${query}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'search',
      eventAction: 'change_query',
      eventLabel: query,
    },
  });
}

export const trackSearchQuery = throttle(_trackSearchQuery, 500, { 'leading': false });

export const trackOpenExplainer = (officerId) => {
  analyticTracking({
    clickyData: {
      title: `open_visual_token_explainer: ${officerId}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'visual_token_explainer',
      eventAction: 'open',
      eventValue: officerId,
    },
  });
};

export const trackAttachmentClick = (sourceUrl, targetUrl) => {
  analyticTracking({
    clickyData: {
      title: `attachment_click: Source URL ${sourceUrl} - Target URL ${targetUrl}`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: 'attachment_click',
      eventAction: 'click',
      eventLabel: `Source URL: ${sourceUrl} - Target URL: ${targetUrl}`,
    },
  });
};

export const trackSingleSearchResults = (contentType, query, resultsCount) => {
  analyticTracking({
    clickyData: {
      title: `single_search_query: ${query} with ${resultsCount} results`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: contentType,
      eventAction: 'single_search',
      eventLabel: query,
      eventValue: resultsCount,
    },
  });
};

const _trackSearchFocusedItem = (contentType, query, itemId, rank) => {
  analyticTracking({
    clickyData: {
      title: `Item ${itemId} with rank ${rank} is focused`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: contentType,
      eventAction: 'suggestion_click',
      eventLabel: itemId,
      eventValue: rank,
    },
  });

  analyticTracking({
    clickyData: {
      title: `Item ${itemId} with rank ${rank} is focused via "${query}" query`,
    },
    gaData: {
      hitType: 'event',
      eventCategory: contentType,
      eventAction: 'suggestion_click_with_query',
      eventLabel: `${ itemId } - ${ query }`,
      eventValue: rank,
    },
  });
};

export const trackSearchFocusedItem = throttle(_trackSearchFocusedItem, 500, { 'leading': false });
