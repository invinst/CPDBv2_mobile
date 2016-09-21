import { post } from 'actions/common/async-action';
import { v2Url } from 'utils/UrlUtil';
import constants from 'constants';


export const MAIL_CHIMP_URL = constants.VFTG_API_ENDPOINT;

export const SUBSCRIBE_EMAIL_REQUEST = 'SUBSCRIBE_EMAIL_REQUEST';
export const SUBSCRIBE_EMAIL_SUCCESS = 'SUBSCRIBE_EMAIL_SUCCESS';
export const SUBSCRIBE_EMAIL_FAILURE = 'SUBSCRIBE_EMAIL_FAILURE';

export const subscribeEmail = (email) => (post(v2Url(MAIL_CHIMP_URL), [
  SUBSCRIBE_EMAIL_REQUEST, SUBSCRIBE_EMAIL_SUCCESS, SUBSCRIBE_EMAIL_FAILURE
])({ email }));
