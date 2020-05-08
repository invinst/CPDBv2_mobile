let c = 0;

const SEARCH_CATEGORIES = [
  {
    name: 'DATE → COMPLAINT RECORDS',
    filter: 'DATE > CR',
    id: 'dateCRs',
    path: 'DATE > CR',
    queryPrefix: 'date-cr',
  },
  {
    name: 'DATE → TACTICAL RESPONSE REPORTS',
    filter: 'DATE > TRR',
    id: 'dateTRRs',
    path: 'DATE > TRR',
    queryPrefix: 'date-trr',
  },
  {
    name: 'DATE → OFFICERS',
    filter: 'DATE > OFFICERS',
    id: 'dateOfficers',
    path: 'DATE > OFFICERS',
    queryPrefix: 'date-officer',
  },
  {
    name: 'OFFICERS',
    filter: 'Officers',
    id: 'officers',
    path: 'OFFICER',
    queryPrefix: 'officer',
  },
  {
    name: 'COMPLAINT RECORDS (CRs)',
    filter: 'CR',
    id: 'crs',
    path: 'CR',
    queryPrefix: 'cr',
  },
  {
    name: 'TACTICAL RESPONSE REPORTS',
    filter: 'TRR',
    id: 'trrs',
    path: 'TRR',
    queryPrefix: 'trr',
  },
  {
    name: 'UNITS',
    filter: 'Units',
    id: 'units',
    path: 'UNIT',
  },
  {
    name: 'INVESTIGATOR → CR',
    filter: 'INVESTIGATOR > CR',
    id: 'investigatorCRs',
    path: 'INVESTIGATOR > CR',
    queryPrefix: 'investigator-cr',
  },
];

const SEARCH_CATEGORY_PREFIXES = SEARCH_CATEGORIES.reduce((result, searchCategory) => {
  return { ...result, [searchCategory.id]: searchCategory.queryPrefix };
}, {});

const SEARCH_QUERY_PREFIX_REGEX = new RegExp(`^(${Object.values(SEARCH_CATEGORY_PREFIXES).join('|')}):`);

const SEARCH_PATH = '/search/';

export default {
  // App events
  SEARCH_INPUT_CHANGED: c++,
  SEARCH_FOCUS: c++,
  SEARCH_BLUR: c++,
  SEARCH_CLEAR: c++,

  // API endpoints
  OFFICER_API_ENDPOINT: '/mobile/officers/',
  SUGGESTION_API_ENDPOINT: '/search-mobile/',
  RECENT_SEARCH_ITEMS_API_ENDPOINT: '/search-mobile/recent-search-items/',
  SINGLE_SEARCH_API_ENDPOINT: '/search-mobile/single/',
  LANDING_PAGE_CMS_API_ENDPOINT: '/cms-pages/landing-page/',
  OFFICER_PAGE_CMS_API_ENDPOINT: '/cms-pages/officer-page/',
  COMPLAINT_PAGE_CMS_API_ENDPOINT: '/cms-pages/cr-page/',
  TRR_PAGE_CMS_API_ENDPOINT: '/cms-pages/trr-page/',
  PINBOARD_PAGE_CMS_API_ENDPOINT: '/cms-pages/pinboard-page/',
  COMPLAINT_API_ENDPOINT: '/mobile/cr/',
  TRR_API_ENDPOINT: '/mobile/trr/',
  TOP_OFFICERS_BY_ALLEGATION_ENDPOINT: '/officers/top-by-allegation/',
  OFFICERS_API_ENDPOINT: '/mobile/officers/',
  RECENT_ACTIVITIES_ENDPOINT: '/activity-grid/',
  NEW_DOCUMENT_ALLEGATIONS_ENDPOINT: '/cr/list-by-new-document/',
  COMPLAINT_SUMMARIES_ENDPOINT: '/cr/complaint-summaries/',
  PINBOARDS_API_ENDPOINT: '/mobile/pinboards/',
  SOCIAL_GRAPH_API_ENDPOINT: '/mobile/social-graph/',
  SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_ENDPOINT: '/mobile/social-graph/geographic-crs/',
  SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_ENDPOINT: '/mobile/social-graph/geographic-trrs/',
  TOAST_API_ENDPOINT: '/mobile/toast/',
  TRACKING_API_ENDPOINT: '/tracking/',
  APP_CONFIG_API_ENDPOINT: '/app-config/',

  //Time format
  SIMPLE_DATE_FORMAT: 'MMM DD, YYYY',
  SEARCH_INCIDENT_DATE_FORMAT: 'MM/DD/YYYY',

  SEARCH_CATEGORIES: SEARCH_CATEGORIES,
  SEARCH_CATEGORY_PREFIXES: SEARCH_CATEGORY_PREFIXES,
  SEARCH_QUERY_PREFIX_REGEX: SEARCH_QUERY_PREFIX_REGEX,

  // These should match their SASS counterparts in styles/Variables.sass
  QUERY_INPUT_HEIGHT: 48,
  SEARCH_CATEGORY_LINKS_HEIGHT: 40,
  NEW_DIVIDER_WEIGHT: 2,
  INVINST_GITHUB_URL: 'https://github.com/invinst/',
  QA_URL: 'http://how.cpdp.works/',
  CAROUSEL_TYPES: {
    'COMPLAINT': 'COMPLAINT',
    'ACTIVITY': 'ACTIVITY',
    'ALLEGATION': 'ALLEGATION',
    'DOCUMENT': 'DOCUMENT',
  },

  // Pinboard page constants
  PINBOARD_PAGE: {
    UNDO_CARD_VISIBLE_TIME: 1000,
    UNDO_CARD_THEMES: {
      LIGHT: 'light',
      DARK: 'dark',
    },
    TAB_NAMES: {
      NETWORK: 'NETWORK',
      GEOGRAPHIC: 'GEOGRAPHIC',
    },
    PINNED_ITEM_TYPES: {
      'CR': 'CR',
      'DATE > CR': 'CR',
      'INVESTIGATOR > CR': 'CR',
      'OFFICER': 'OFFICER',
      'UNIT > OFFICERS': 'OFFICER',
      'DATE > OFFICERS': 'OFFICER',
      'TRR': 'TRR',
      'DATE > TRR': 'TRR',
    },
  },

  // Map constants
  MAP_ITEMS: {
    CR: 'CR',
    FORCE: 'FORCE',
  },
  MAP_INFO: {
    CENTER_LAT: 41.85677,
    CENTER_LNG: -87.6024055,
    ZOOM1: 9,
    ZOOM2: 13,
  },
  MAPBOX_STYLE: 'mapbox://styles/invisibleinstitute/cj8ugtswqe8dx2ss2kwhfnvte',

  BREADCRUMB_DEFAULT_MAPPING: {
    [SEARCH_PATH]: 'Search',
  },
  ELLIPSIS_CONFIG: {
    basedOn: 'words',
    ellipsis: '...',
    maxLine: '3',
  },
};

export const PIN_BUTTON_INTRODUCTION_INDEX = 3;

export const APP_CONFIG_KEYS = {
  PINBOARD_INTRODUCTION_DELAY: 'PINBOARD_INTRODUCTION_DELAY',
};
