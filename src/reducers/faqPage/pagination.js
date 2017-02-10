import { handleActions } from 'redux-actions';
import { getRichTextValueAsArray } from 'utils/CmsDataUtil';

import {
  FAQ_PAGE_REQUEST_START,
  FAQ_PAGE_REQUEST_SUCCESS,
  FAQ_PAGE_REQUEST_FAILURE
} from 'actions/faq-page';


export default handleActions({

  [FAQ_PAGE_REQUEST_START]: (state, action) => ({
    ...state,
    loaded: false
  }),

  [FAQ_PAGE_REQUEST_SUCCESS]: (state, { payload }) => ({
    loaded: true,
    count: payload.count,
    next: payload.next,
    previous: payload.previous,
    faqs: [...(state.faqs || []),
      ...payload.results.map((faq) => ({
        id: faq.id,
        question: getRichTextValueAsArray(faq, 'question'),
        answer: getRichTextValueAsArray(faq, 'answer')
      }))
    ]
  }),

  [FAQ_PAGE_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    loaded: false
  })

}, {});
