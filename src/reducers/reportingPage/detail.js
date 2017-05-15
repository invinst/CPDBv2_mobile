import { handleActions } from 'redux-actions';
import { getRichTextValueAsArray, getStringValue, getDateValueAsString } from 'utils/CmsDataUtil';

import {
  REPORT_REQUEST_START,
  REPORT_REQUEST_SUCCESS,
  REPORT_REQUEST_FAILURE
} from 'actions/reporting-page';


export default handleActions({
  [REPORT_REQUEST_START]: (state, action) => ({
    ...state,
    loaded: false,
    id: '',
    title: [],
    excerpt: []
  }),

  [REPORT_REQUEST_SUCCESS]: (state, { payload }) => ({
    loaded: true,
    id: payload.id,
    payload: payload,
    title: getRichTextValueAsArray(payload, 'title'),
    excerpt: getRichTextValueAsArray(payload, 'excerpt'),
    publication: getStringValue(payload, 'publication'),
    publishDate: getDateValueAsString(payload, 'publish_date'),
    author: getStringValue(payload, 'author')
  }),

  [REPORT_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    loaded: false,
    id: '',
    title: [],
    excerpt: []
  })

}, {});
