export const SEARCH_CATEGORIES = [
  {
    name: 'LAWSUIT',
    filter: 'LAWSUIT',
    id: 'lawsuits',
    path: 'LAWSUIT',
    queryPrefix: 'lawsuit',
  },
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

export const SEARCH_CATEGORY_PREFIXES = SEARCH_CATEGORIES.reduce((result, searchCategory) => {
  return { ...result, [searchCategory.id]: searchCategory.queryPrefix };
}, {});

export const SEARCH_QUERY_PREFIX_REGEX = new RegExp(`^(${Object.values(SEARCH_CATEGORY_PREFIXES).join('|')}):`);

const SEARCH_PATH = '/search/';

// API endpoints
export const OFFICER_API_ENDPOINT = '/mobile/officers/';
export const SUGGESTION_API_ENDPOINT = '/search-mobile/';
export const RECENT_SEARCH_ITEMS_API_ENDPOINT = '/search-mobile/recent-search-items/';
export const SINGLE_SEARCH_API_ENDPOINT = '/search-mobile/single/';
export const LANDING_PAGE_CMS_API_ENDPOINT = '/cms-pages/landing-page/';
export const OFFICER_PAGE_CMS_API_ENDPOINT = '/cms-pages/officer-page/';
export const COMPLAINT_PAGE_CMS_API_ENDPOINT = '/cms-pages/cr-page/';
export const TRR_PAGE_CMS_API_ENDPOINT = '/cms-pages/trr-page/';
export const PINBOARD_PAGE_CMS_API_ENDPOINT = '/cms-pages/pinboard-page/';
export const COMPLAINT_API_ENDPOINT = '/mobile/cr/';
export const LAWSUIT_API_ENDPOINT = '/lawsuit/';
export const TRR_API_ENDPOINT = '/mobile/trr/';
export const TOP_OFFICERS_BY_ALLEGATION_ENDPOINT = '/officers/top-by-allegation/';
export const OFFICERS_API_ENDPOINT = '/mobile/officers/';
export const RECENT_ACTIVITIES_ENDPOINT = '/activity-grid/';
export const NEW_DOCUMENT_ALLEGATIONS_ENDPOINT = '/cr/list-by-new-document/';
export const COMPLAINT_SUMMARIES_ENDPOINT = '/cr/complaint-summaries/';
export const TOP_LAWSUITS_ENDPOINT = '/lawsuit/top-lawsuits/';
export const PINBOARDS_API_ENDPOINT = '/mobile/pinboards/';
export const SOCIAL_GRAPH_API_ENDPOINT = '/mobile/social-graph/';
export const SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_ENDPOINT = '/mobile/social-graph/geographic-crs/';
export const SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_ENDPOINT = '/mobile/social-graph/geographic-trrs/';
export const TOAST_API_ENDPOINT = '/mobile/toast/';
export const TRACKING_API_ENDPOINT = '/tracking/';
export const APP_CONFIG_API_ENDPOINT = '/app-config/';

//Time format
export const MONTH_NAME_DAY_YEAR_FORMAT = 'MMM DD, YYYY';
export const MONTH_DATE_YEAR_FORMAT = 'MM/DD/YYYY';
export const SIMPLE_DATE_FORMAT = 'DD/MM/YYYY';
export const PINBOARD_VIEWED_DATE_TIME_FORMAT = 'DD/MM/YYYY [at] hh:mm A';

// These should match their SASS counterparts in styles/Variables.sass
export const QUERY_INPUT_HEIGHT = 48;
export const SEARCH_CATEGORY_LINKS_HEIGHT = 40;
export const NEW_DIVIDER_WEIGHT = 2;
export const INVINST_GITHUB_URL = 'https://github.com/invinst/';
export const QA_URL = 'http://how.cpdp.works/';
export const CAROUSEL_TYPES = {
  'COMPLAINT': 'COMPLAINT',
  'ACTIVITY': 'ACTIVITY',
  'ALLEGATION': 'ALLEGATION',
  'DOCUMENT': 'DOCUMENT',
  'LAWSUIT': 'LAWSUIT',
};

const PINNED_ITEM_TYPES = {
  'CR': 'CR',
  'DATE > CR': 'CR',
  'INVESTIGATOR > CR': 'CR',
  'OFFICER': 'OFFICER',
  'UNIT > OFFICERS': 'OFFICER',
  'DATE > OFFICERS': 'OFFICER',
  'TRR': 'TRR',
  'DATE > TRR': 'TRR',
};

export const SEARCH_ITEM_TYPES = {
  ...PINNED_ITEM_TYPES,
  LAWSUIT: 'LAWSUIT',
};

export const PINBOARD_PAGE = {
  UNDO_CARD_VISIBLE_TIME: 1000,
  UNDO_CARD_THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
  },
  TAB_NAMES: {
    NETWORK: 'NETWORK',
    GEOGRAPHIC: 'GEOGRAPHIC',
  },
  PINNED_ITEM_TYPES: PINNED_ITEM_TYPES,
};

export const MAP_ITEMS = {
  CR: 'CR',
  FORCE: 'FORCE',
};

export const MAP_INFO = {
  CENTER_LAT: 41.85677,
  CENTER_LNG: -87.6024055,
  ZOOM1: 9,
  ZOOM2: 13,
};

export const MAPBOX_STYLE = 'mapbox://styles/invisibleinstitute/cj8ugtswqe8dx2ss2kwhfnvte';

export const BREADCRUMB_DEFAULT_MAPPING = {
  [SEARCH_PATH]: 'Search',
};

export const ELLIPSIS_CONFIG = {
  basedOn: 'words',
  ellipsis: '...',
  maxLine: '3',
};

export const PIN_BUTTON_INTRODUCTION_INDEX = 3;

export const APP_CONFIG_KEYS = {
  PINBOARD_INTRODUCTION_DELAY: 'PINBOARD_INTRODUCTION_DELAY',
  VISUAL_TOKEN_COLORS: 'VISUAL_TOKEN_COLORS',
};

export const PERCENTILE_FIELDS = [
  'percentile_allegation',
  'percentile_allegation_internal',
  'percentile_allegation_civilian',
  'percentile_trr',
];

export const PINBOARD_ACTIONS_PANE_SPACE = 78;

export const BREADCRUMB_HEIGHT = 40;

export const NPI_URL = 'https://national.cpdp.co/';
