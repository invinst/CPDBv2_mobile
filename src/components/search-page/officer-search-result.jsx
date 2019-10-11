import React, { PropTypes } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import OfficerItem from './officer-item';


const OfficerSearchResult = (
  {
    items,
    saveToRecent,
    addOrRemoveItemInPinboard,
    getSuggestionWithContentType,
    query,
    nextParams,
    hasMore,
  }
) => {
  return (
    <InfiniteScroll
      loadMore={ () => getSuggestionWithContentType(query, { ...nextParams }) }
      initialLoad={ true }
      hasMore={ hasMore }
      useWindow={ true }
    >
      {
        items.map(officer => (
          <OfficerItem
            key={ officer.id }
            item={ officer }
            saveToRecent={ saveToRecent }
            addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
          />
        ))
      }
    </InfiniteScroll>
  );
};

OfficerSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.array,
  addOrRemoveItemInPinboard: PropTypes.func,
  getSuggestionWithContentType: PropTypes.func,
  nextParams: PropTypes.object,
  hasMore: PropTypes.bool,
  query: PropTypes.string,
};

OfficerSearchResult.defaultProps = {
  saveToRecent: () => {},
};

export default OfficerSearchResult;
