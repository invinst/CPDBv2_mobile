import { handleActions } from 'redux-actions';

import { getRichTextValueAsArray } from 'utils/CmsDataUtil';
import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


export default handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    aboutHeader: getRichTextValueAsArray(action.payload, 'about_header') || '',
    aboutContent: getRichTextValueAsArray(action.payload, 'about_content') || ''
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => ({})
}, {});
