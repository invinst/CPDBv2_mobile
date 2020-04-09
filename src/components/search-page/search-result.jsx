import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import OfficerItem from './officer-item';
import CrItem from './cr-item';
import TrrItem from './trr-item';


const ItemTypeMaps = {
  officers: OfficerItem,
  dateOfficers: OfficerItem,
  dateCRs: CrItem,
  crs: CrItem,
  investigatorCRs: CrItem,
  dateTRRs: TrrItem,
  trrs: TrrItem,
};

const SearchResult = (
  {
    itemType,
    items,
    saveToRecent,
    addOrRemoveItemInPinboard,
    getSuggestionWithContentType,
    query,
    nextParams,
    hasMore,
  }
) => {
  const Item = ItemTypeMaps[itemType];
  return (
    <InfiniteScroll
      loadMore={ () => getSuggestionWithContentType(query, { ...nextParams }) }
      initialLoad={ true }
      hasMore={ hasMore }
      useWindow={ true }
    >
      {
        items.map(item => (
          <Item
            key={ `${itemType}-${item.id}` }
            item={ item }
            query={ query }
            showIntroduction={ item.showIntroduction }
            saveToRecent={ saveToRecent }
            addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
          />
        ))
      }
    </InfiniteScroll>
  );
};

SearchResult.propTypes = {
  itemType: PropTypes.string,
  saveToRecent: PropTypes.func,
  items: PropTypes.array,
  addOrRemoveItemInPinboard: PropTypes.func,
  getSuggestionWithContentType: PropTypes.func,
  nextParams: PropTypes.object,
  hasMore: PropTypes.bool,
  query: PropTypes.string,
};

SearchResult.defaultProps = {
  saveToRecent: () => {},
};

export default SearchResult;
