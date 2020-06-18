// Paths
export const SEARCH_PATH = '/search/';
export const OFFICER_PATH = '/officer/';
export const COMPLAINT_PATH = '/complaint/';
export const TRR_PATH = '/trr/';
export const PINBOARD_PATH = '/pinboard/';

// Router paths
export const SEARCH_ROUTER_PATH = SEARCH_PATH;
export const OFFICER_ROUTER_PATH = `${OFFICER_PATH}:id/:firstParam?/:secondParam?`;
export const COMPLAINT_ROUTER_PATH = `${COMPLAINT_PATH}:complaintId/`;
export const TRR_ROUTER_PATH = `${TRR_PATH}:trrId/`;
export const PINBOARD_ROUTER_PATH = `${PINBOARD_PATH}:pinboardId?/:pinboardTitle?/`;
export const PINBOARD_REDIRECT_ROUTER_PATH = `${PINBOARD_PATH}:pinboardId/`;
export const PINBOARD_SOCIAL_GRAPH_REDIRECT_ROUTER_PATH = '/social-graph/pinboard/:pinboardId/';
export const PINBOARD_GEOGRAPHIC_REDIRECT_ROUTER_PATH = '/geographic/pinboard/:pinboardId/';
export const EMBED_TOP_OFFICER_ROUTER_PATH = '/embed/top-officers-page';
export const EMBED_OFFICERS_ROUTER_PATH = '/embed/officers/';

export const PINBOARD_REQUEST_PATTERN = /.*\/pinboards\/([a-fA-F0-9]+)\/.*/;

export const PINBOARD_PAGE_PATTERN = /.*\/pinboard\/([a-fA-F0-9]+)\/.*/;
export const OFFICER_PAGE_PATTERN = /^\/officer\/\d+\/.*/;
export const CR_PAGE_PATTERN = /^\/complaint\/\d+\/.*/;
