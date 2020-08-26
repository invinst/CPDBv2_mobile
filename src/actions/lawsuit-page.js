import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import { LAWSUIT_API_ENDPOINT } from 'constants';


export const LAWSUIT_FETCH_START = 'LAWSUIT_FETCH_START';
export const LAWSUIT_FETCH_SUCCESS = 'LAWSUIT_FETCH_SUCCESS';
export const LAWSUIT_FETCH_FAILURE = 'LAWSUIT_FETCH_FAILURE';

export const fetchLawsuit = (caseNo) => get(
  `${v2Url(LAWSUIT_API_ENDPOINT)}${caseNo}/`,
  [
    LAWSUIT_FETCH_START,
    LAWSUIT_FETCH_SUCCESS,
    LAWSUIT_FETCH_FAILURE,
  ]
)();
