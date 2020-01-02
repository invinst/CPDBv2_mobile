import { createAction } from 'redux-actions';
import { CancelToken } from 'axios';
import { map, entries } from 'lodash';

import { get, post, put } from 'actions/common/async-action';
import constants from 'constants';
import { v2Url } from 'utils/url-util';
import { REQUEST_CANCEL_MESSAGE } from 'utils/axios-client';


export const PINBOARD_CREATE_REQUEST_START = 'PINBOARD_CREATE_REQUEST_START';
export const PINBOARD_CREATE_REQUEST_SUCCESS = 'PINBOARD_CREATE_REQUEST_SUCCESS';
export const PINBOARD_CREATE_REQUEST_FAILURE = 'PINBOARD_CREATE_REQUEST_FAILURE';

export const PINBOARD_UPDATE_REQUEST_START = 'PINBOARD_UPDATE_REQUEST_START';
export const PINBOARD_UPDATE_REQUEST_SUCCESS = 'PINBOARD_UPDATE_REQUEST_SUCCESS';
export const PINBOARD_UPDATE_REQUEST_FAILURE = 'PINBOARD_UPDATE_REQUEST_FAILURE';

export const PINBOARD_UPDATE_FROM_SOURCE_REQUEST_FAILURE = 'PINBOARD_UPDATE_FROM_SOURCE_REQUEST_FAILURE';
export const PINBOARD_UPDATE_FROM_SOURCE_REQUEST_START = 'PINBOARD_UPDATE_FROM_SOURCE_REQUEST_START';
export const PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS = 'PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS';

export const PINBOARD_FETCH_REQUEST_START = 'PINBOARD_FETCH_REQUEST_START';
export const PINBOARD_FETCH_REQUEST_SUCCESS = 'PINBOARD_FETCH_REQUEST_SUCCESS';
export const PINBOARD_FETCH_REQUEST_FAILURE = 'PINBOARD_FETCH_REQUEST_FAILURE';

export const PINBOARD_COMPLAINTS_FETCH_REQUEST_START = 'PINBOARD_COMPLAINTS_FETCH_REQUEST_START';
export const PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS = 'PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE = 'PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE';
export const PINBOARD_COMPLAINTS_FETCH_REQUEST_CANCELLED = 'PINBOARD_COMPLAINTS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_OFFICERS_FETCH_REQUEST_START = 'PINBOARD_OFFICERS_FETCH_REQUEST_START';
export const PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS = 'PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_OFFICERS_FETCH_REQUEST_FAILURE = 'PINBOARD_OFFICERS_FETCH_REQUEST_FAILURE';
export const PINBOARD_OFFICERS_FETCH_REQUEST_CANCELLED = 'PINBOARD_OFFICERS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_TRRS_FETCH_REQUEST_START = 'PINBOARD_TRRS_FETCH_REQUEST_START';
export const PINBOARD_TRRS_FETCH_REQUEST_SUCCESS = 'PINBOARD_TRRS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_TRRS_FETCH_REQUEST_FAILURE = 'PINBOARD_TRRS_FETCH_REQUEST_FAILURE';
export const PINBOARD_TRRS_FETCH_REQUEST_CANCELLED = 'PINBOARD_TRRS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE = 'PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE';
export const PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START = 'PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START';
export const PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS = 'PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS';
export const PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_CANCELLED = 'PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_CANCELLED';

export const PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START = 'PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START';

export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED';

export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE';
export const FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED =
  'FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START = 'PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START';
export const PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS = 'PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE = 'PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE';
export const PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED = 'PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START = 'PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START';
export const PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS = 'PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE = 'PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE';
export const PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED = 'PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START = 'PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START';
export const PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS = 'PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE = 'PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE';
export const PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_CANCELLED =
  'PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START = 'PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START';
export const PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS = 'PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE = 'PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE';
export const PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_CANCELLED =
  'PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START = 'PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START';
export const PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS = 'PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS';
export const PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE = 'PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE';
export const PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_CANCELLED =
  'PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_CANCELLED';

export const PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START = 'PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START';
export const PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS = 'PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS';
export const PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_FAILURE = 'PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_FAILURE';

export const UPDATE_PINBOARD_INFO = 'UPDATE_PINBOARD_INFO';

export const ADD_OR_REMOVE_ITEM_IN_PINBOARD = 'ADD_OR_REMOVE_ITEM_IN_PINBOARD';
export const ADD_ITEM_IN_PINBOARD_PAGE = 'ADD_ITEM_IN_PINBOARD_PAGE';
export const REMOVE_ITEM_IN_PINBOARD_PAGE = 'REMOVE_ITEM_IN_PINBOARD_PAGE';
export const ORDER_PINBOARD = 'ORDER_PINBOARD';

export const ADD_ITEM_TO_PINBOARD_STATE = 'ADD_ITEM_TO_PINBOARD_STATE';
export const REMOVE_ITEM_FROM_PINBOARD_STATE = 'REMOVE_ITEM_FROM_PINBOARD_STATE';
export const ORDER_PINBOARD_STATE = 'ORDER_PINBOARD_STATE';
export const SAVE_PINBOARD = 'SAVE_PINBOARD';

export const PERFORM_FETCH_PINBOARD_RELATED_DATA = 'PERFORM_FETCH_PINBOARD_RELATED_DATA';

export const UPDATE_PINBOARD_INFO_STATE = 'UPDATE_PINBOARD_INFO_STATE';

export const addOrRemoveItemInPinboard = createAction(ADD_OR_REMOVE_ITEM_IN_PINBOARD);

export const removeItemInPinboardPage = createAction(REMOVE_ITEM_IN_PINBOARD_PAGE,
  item => ({ ...item, isPinned: true }));

export const addItemInPinboardPage = createAction(ADD_ITEM_IN_PINBOARD_PAGE,
  item => ({ ...item, isPinned: false }));

export const addItemToPinboardState = createAction(ADD_ITEM_TO_PINBOARD_STATE);
export const removeItemFromPinboardState = createAction(REMOVE_ITEM_FROM_PINBOARD_STATE);
export const orderPinboardState = createAction(ORDER_PINBOARD_STATE);
export const savePinboard = createAction(SAVE_PINBOARD);
export const updatePinboardInfo = createAction(UPDATE_PINBOARD_INFO, item => item);
export const updatePinboardInfoState = createAction(UPDATE_PINBOARD_INFO_STATE);

export const performFetchPinboardRelatedData = createAction(PERFORM_FETCH_PINBOARD_RELATED_DATA);

export const orderPinboard = createAction(ORDER_PINBOARD);

let pinboardSource;
const cancelFetchRequests = (newRequest) => (...args) => {
  if (pinboardSource)
    pinboardSource.cancel(REQUEST_CANCEL_MESSAGE);

  pinboardSource = CancelToken.source();
  return newRequest(...args);
};

export const createPinboard = cancelFetchRequests(
  ({ officerIds, crids, trrIds }) => post(
    v2Url(constants.PINBOARDS_API_ENDPOINT),
    [
      PINBOARD_CREATE_REQUEST_START,
      PINBOARD_CREATE_REQUEST_SUCCESS,
      PINBOARD_CREATE_REQUEST_FAILURE,
    ],
    pinboardSource && pinboardSource.token,
  )({ 'officer_ids': officerIds, crids: crids, 'trr_ids': trrIds })
);

export const updatePinboard = cancelFetchRequests(
  ({ id, title, description, officerIds, crids, trrIds }) => put(
    `${v2Url(constants.PINBOARDS_API_ENDPOINT)}${id}/`,
    [
      PINBOARD_UPDATE_REQUEST_START,
      PINBOARD_UPDATE_REQUEST_SUCCESS,
      PINBOARD_UPDATE_REQUEST_FAILURE,
    ],
    pinboardSource && pinboardSource.token,
  )({ title: title, description: description, 'officer_ids': officerIds, crids: crids, 'trr_ids': trrIds })
);

export const updatePinboardFromSource = cancelFetchRequests(
  (id, sourcePinboardId) => put(
    `${v2Url(constants.PINBOARDS_API_ENDPOINT)}${id}/`,
    [
      PINBOARD_UPDATE_FROM_SOURCE_REQUEST_START,
      PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
      PINBOARD_UPDATE_FROM_SOURCE_REQUEST_FAILURE,
    ],
    pinboardSource && pinboardSource.token
  )({ 'source_pinboard_id': sourcePinboardId })
);

export const fetchPinboard = cancelFetchRequests(
  id => get(
    `${v2Url(constants.PINBOARDS_API_ENDPOINT)}${id}/`,
    [
      PINBOARD_FETCH_REQUEST_START,
      PINBOARD_FETCH_REQUEST_SUCCESS,
      PINBOARD_FETCH_REQUEST_FAILURE,
    ],
    pinboardSource && pinboardSource.token,
  )()
);

export const fetchPinboardComplaints = id => get(
  `${v2Url(constants.PINBOARDS_API_ENDPOINT)}${id}/complaints/`,
  [
    PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
    PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
    PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE,
    PINBOARD_COMPLAINTS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token,
)();

export const fetchPinboardOfficers = id => get(
  `${v2Url(constants.PINBOARDS_API_ENDPOINT)}${id}/officers/`,
  [
    PINBOARD_OFFICERS_FETCH_REQUEST_START,
    PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
    PINBOARD_OFFICERS_FETCH_REQUEST_FAILURE,
    PINBOARD_OFFICERS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token,
)();

export const fetchPinboardTRRs = id => get(
  `${v2Url(constants.PINBOARDS_API_ENDPOINT)}${id}/trrs/`,
  [
    PINBOARD_TRRS_FETCH_REQUEST_START,
    PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
    PINBOARD_TRRS_FETCH_REQUEST_FAILURE,
    PINBOARD_TRRS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token,
)();

export const fetchPinboardSocialGraph = id => get(
  `${v2Url(constants.SOCIAL_GRAPH_API_ENDPOINT)}network/?pinboard_id=${id}`,
  [
    PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START,
    PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
    PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
    PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token,
)();

export const fetchPinboardGeographic = createAction(PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START);

export const fetchFirstPagePinboardGeographicCrs = (params) => get(
  v2Url(constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_ENDPOINT),
  [
    FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START,
    FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
    FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE,
    FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)(params);

export const fetchFirstPagePinboardGeographicTrrs = (params) => get(
  v2Url(constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_ENDPOINT),
  [
    FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START,
    FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
    FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE,
    FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)(params);

export const fetchOtherPagesPinboardGeographicCrs = (params) => get(
  v2Url(constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_ENDPOINT),
  [
    PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START,
    PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
    PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE,
    PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)(params);

export const fetchOtherPagesPinboardGeographicTrrs = (params) => get(
  v2Url(constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_ENDPOINT),
  [
    PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START,
    PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
    PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE,
    PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED,
  ],
  pinboardSource && pinboardSource.token
)(params);

const getWithPaginate = (pinboardRelevantAPI, types) => (id, params) => {
  const queryString = map(entries(params), ([key, val]) => `${key}=${val}`).join('&');
  const url = `${v2Url(constants.PINBOARDS_API_ENDPOINT)}${id}/${pinboardRelevantAPI}/?${queryString}`;

  return get(url, types, pinboardSource && pinboardSource.token)();
};

export const fetchPinboardRelevantDocuments = getWithPaginate(
  'relevant-documents',
  [
    PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
    PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
    PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
    PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_CANCELLED,
  ]
);
export const fetchPinboardRelevantCoaccusals = getWithPaginate(
  'relevant-coaccusals',
  [
    PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
    PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
    PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
    PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_CANCELLED,
  ]
);
export const fetchPinboardRelevantComplaints = getWithPaginate(
  'relevant-complaints',
  [
    PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
    PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
    PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
    PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_CANCELLED,
  ]
);

export const fetchLatestRetrievedPinboard = get(
  `${v2Url(constants.PINBOARDS_API_ENDPOINT)}latest-retrieved-pinboard/`,
  [
    PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START,
    PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
    PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_FAILURE,
  ]
);

export const PINBOARD_PAGE_CMS_REQUEST_START = 'PINBOARD_PAGE_CMS_REQUEST_START';
export const PINBOARD_PAGE_CMS_REQUEST_SUCCESS = 'PINBOARD_PAGE_CMS_REQUEST_SUCCESS';
export const PINBOARD_PAGE_CMS_REQUEST_FAILURE = 'PINBOARD_PAGE_CMS_REQUEST_FAILURE';

export const requestCMS = get(v2Url(constants.PINBOARD_PAGE_CMS_API_ENDPOINT), [
  PINBOARD_PAGE_CMS_REQUEST_START, PINBOARD_PAGE_CMS_REQUEST_SUCCESS, PINBOARD_PAGE_CMS_REQUEST_FAILURE,
]);
