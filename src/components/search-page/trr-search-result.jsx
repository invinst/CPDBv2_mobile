import React, { PropTypes } from 'react';

import SearchItem from './search-item';
import style from './trr-search-result.sass';


const TRRSearchResult = ({ items, saveToRecent, categoryFilter }) => {
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
              hasPinButton={ false }>
              <div className='item-type'>TRR</div>
              <div className='item-id'>{ item.id }</div>
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
  categoryFilter: PropTypes.string
};

TRRSearchResult.defaultProps = {
  items: []
};

export default TRRSearchResult;
