import { createSelector } from 'reselect';

import extractQuery from 'utils/extract-query';
import { relevantDocumentTransform } from './transform';
import { pinboardICRIDsSelector } from 'selectors/pinboard-page/pinboard';

const getRelevantDocumentsPagination = state => state.pinboardPage.relevantDocuments;

export const getRequesting = state => state.pinboardPage.relevantDocuments.requesting;

export const relevantDocumentsSelector = createSelector(
  getRelevantDocumentsPagination,
  pinboardICRIDsSelector,
  ({ items }, crids) => items.map(item => relevantDocumentTransform(item, crids))
);

const relevantDocumentsCountSelector = createSelector(
  getRelevantDocumentsPagination,
  ({ count }) => count
);


export const relevantDocumentsNextParamsSelector = createSelector(
  getRelevantDocumentsPagination,
  ({ pagination }) => {
    return extractQuery(pagination.next);
  }
);

export const relevantDocumentsHasMoreSelector = createSelector(
  relevantDocumentsCountSelector,
  relevantDocumentsSelector,
  (count, documents) => documents.length < count
);
