import React, { PropTypes } from 'react';

import SearchItem from './search-item';
import style from './trr-search-result.sass';


const TRRSearchResult = ({ items, saveToRecent, categoryFilter, addOrRemoveItemInPinboard }) => {
  const handleClick = (name, url) => saveToRecent({
    type: categoryFilter,
    title: name,
    url: url
  });

  return (
    <div className={ style.trrSearchResult }>
      {
        items.map((item) => {
          return (
            <SearchItem
              key={ item.id }
              url={ item.url }
              onClick={ () => handleClick(item.id, item.url) }
              hasPinButton={ true }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
              id={ item.id }
              isPinned={ item.isPinned }
              type={ item.type }>
              <div className='item-info'>
                <div className='item-type'>TRR</div>
                <div className='item-id'>{ item.id }</div>
              </div>
            </SearchItem>
          );
        })
      }
    </div>
  );
};

TRRSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.array,
  categoryFilter: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
};

TRRSearchResult.defaultProps = {
  items: []
};

export default TRRSearchResult;
