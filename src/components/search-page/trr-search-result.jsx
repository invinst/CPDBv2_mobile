import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
            <Link
              key={ item.id }
              to={ item.url }
              className='search-item'
              onClick={ () => handleClick(item.id, item.url) }>
              <div className='item-type'>TRR</div>
              <div className='item-id'>{ item.id }</div>
            </Link>
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
