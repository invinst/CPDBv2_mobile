import { handleActions } from 'redux-actions';
import { getRichTextValueAsArray, getStringValue, getDateValueAsString } from 'utils/CmsDataUtil';

import {
  REPORTING_PAGE_REQUEST_START,
  REPORTING_PAGE_REQUEST_SUCCESS,
  REPORTING_PAGE_REQUEST_FAILURE
} from 'actions/reporting-page';


export default handleActions({

  [REPORTING_PAGE_REQUEST_START]: (state, action) => ({
    ...state,
    loaded: false
  }),

  [REPORTING_PAGE_REQUEST_SUCCESS]: (state, { payload }) => ({
    loaded: true,
    count: payload.count,
    next: payload.next,
    previous: payload.previous,
    reports: [...(state.reports || []),
      ...payload.results.map((report) => ({
        id: report.id,
        title: getRichTextValueAsArray(report, 'title'),
        publication: getStringValue(report, 'publication'),
        publishDate: getDateValueAsString(report, 'publish_date')
      }))
    ]
  }),

  [REPORTING_PAGE_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    loaded: false
  })

}, {});
