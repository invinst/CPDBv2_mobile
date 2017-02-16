import { get } from 'actions/common/async-action';
import { v2v2Url } from 'utils/UrlUtil';
import constants from 'constants';

export const FAQ_PAGE_REQUEST_START = 'FAQ_PAGE_REQUEST_START';
export const FAQ_PAGE_REQUEST_SUCCESS = 'FAQ_PAGE_REQUEST_SUCCESS';
export const FAQ_PAGE_REQUEST_FAILURE = 'FAQ_PAGE_REQUEST_FAILURE';

export const requestFAQPage = get(
  v2v2Url(constants.FAQ_API_ENDPOINT),
  [FAQ_PAGE_REQUEST_START, FAQ_PAGE_REQUEST_SUCCESS, FAQ_PAGE_REQUEST_FAILURE]
);

export const FAQ_REQUEST_START = 'FAQ_REQUEST_START';
export const FAQ_REQUEST_SUCCESS = 'FAQ_REQUEST_SUCCESS';
export const FAQ_REQUEST_FAILURE = 'FAQ_REQUEST_FAILURE';

export const requestFAQ = (id) => (get(v2v2Url(`${constants.FAQ_API_ENDPOINT}${id }/`), [
  FAQ_REQUEST_START, FAQ_REQUEST_SUCCESS, FAQ_REQUEST_FAILURE]
)());
