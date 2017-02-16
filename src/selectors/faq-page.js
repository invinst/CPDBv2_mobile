import { createSelector } from 'reselect';

import { extractQuery } from 'utils/QueryStringUtil';


const getNextUrl = state => state.faqPage.pagination.next;
const getIsRequesting = state => state.faqPage.isRequesting;

export const hasMoreSelector = createSelector(
  getNextUrl,
  getIsRequesting,
  (nextUrl, isRequesting) => {
    return !!nextUrl && !isRequesting;
  }
);

export const nextParamsSelector = createSelector(
  getNextUrl,
  nextUrl => extractQuery(nextUrl)
);
