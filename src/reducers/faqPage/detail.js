import { handleActions } from 'redux-actions';
import { getRichTextValueAsArray } from 'utils/CmsDataUtil';

import {
  FAQ_REQUEST_START,
  FAQ_REQUEST_SUCCESS,
  FAQ_REQUEST_FAILURE
} from 'actions/faq-page';


export default handleActions({
  [FAQ_REQUEST_START]: (state, action) => ({
    ...state,
    loaded: false,
    id: '',
    question: [],
    answer: []
  }),

  [FAQ_REQUEST_SUCCESS]: (state, { payload }) => ({
    loaded: true,
    id: payload.id,
    question: getRichTextValueAsArray(payload, 'question'),
    answer: getRichTextValueAsArray(payload, 'answer')
  }),

  [FAQ_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    loaded: false,
    id: '',
    question: [],
    answer: []
  })

}, {});
