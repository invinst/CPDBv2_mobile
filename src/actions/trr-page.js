import { get, post } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import constants from 'constants';

export const TRR_REQUEST_START = 'TRR_REQUEST_START';
export const TRR_REQUEST_SUCCESS = 'TRR_REQUEST_SUCCESS';
export const TRR_REQUEST_FAILURE = 'TRR_REQUEST_FAILURE';

export const TRR_REQUEST_DOC_REQUEST_START = 'TRR_REQUEST_DOC_REQUEST_START';
export const TRR_REQUEST_DOC_REQUEST_SUCCESS = 'TRR_REQUEST_DOC_REQUEST_SUCCESS';
export const TRR_REQUEST_DOC_REQUEST_FAILURE = 'TRR_REQUEST_DOC_REQUEST_FAILURE';

export const TRR_PAGE_CMS_REQUEST_START = 'TRR_PAGE_CMS_REQUEST_START';
export const TRR_PAGE_CMS_REQUEST_SUCCESS = 'TRR_PAGE_CMS_REQUEST_SUCCESS';
export const TRR_PAGE_CMS_REQUEST_FAILURE = 'TRR_PAGE_CMS_REQUEST_FAILURE';

export const requestTRR = (id) => get(
  v2Url(constants.TRR_API_ENDPOINT),
  [
    TRR_REQUEST_START,
    TRR_REQUEST_SUCCESS,
    TRR_REQUEST_FAILURE
  ]
)(undefined, undefined, `${id}/`, { id });

export const requestDocument = ({ id, email }) => post(
  `${v2Url(constants.TRR_API_ENDPOINT)}${id}/request-document/`,
  [TRR_REQUEST_DOC_REQUEST_START, TRR_REQUEST_DOC_REQUEST_SUCCESS, TRR_REQUEST_DOC_REQUEST_FAILURE]
)({ email: email });


export const requestCMS = get(v2Url(constants.TRR_PAGE_CMS_API_ENDPOINT), [
  TRR_PAGE_CMS_REQUEST_START, TRR_PAGE_CMS_REQUEST_SUCCESS, TRR_PAGE_CMS_REQUEST_FAILURE
]);
