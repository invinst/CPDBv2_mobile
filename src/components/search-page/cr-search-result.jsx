import React, { PropTypes } from 'react';

import SearchItem from './search-item';
import style from './cr-search-result.sass';


const CRSearchResult = ({ items, saveToRecent, categoryFilter, addOrRemoveItemInPinboard }) => {
  const handleClick = (name, url) => saveToRecent({
    type: categoryFilter,
    title: name,
    url: url
  });

  return (
    <div className={ style.crSearchResult }>
      {
        items.map((item) => {
          return (
            <SearchItem
              key={ item.crid }
              url={ item.url }
              onClick={ () => handleClick(item.crid, item.url) }
              hasPinButton={ true }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
              id={ item.crid }
              isPinned={ item.isPinned }
              type={ item.type }>
              <div className='item-info'>
                <div className='item-id'>CRID { item.crid } • { item.incidentDate }</div>
                <div className='item-type'>{ item.category }</div>
              </div>
            </SearchItem>
          );
        })
      }
    </div>
  );
};

CRSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.array,
  categoryFilter: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
};

CRSearchResult.defaultProps = {
  items: []
};

export default CRSearchResult;
