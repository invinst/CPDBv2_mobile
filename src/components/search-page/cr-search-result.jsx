import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import style from './cr-search-result.sass';


const CRSearchResult = ({ items, saveToRecent }) => {
  const handleClick = (name, url) => saveToRecent({
    type: 'CR',
    title: name,
    url: url
  });

  return (
    <div className={ style.crSearchResult }>
      {
        items.map((item) => {
          return (
            <Link
              key={ item.crid }
              to={ item.url }
              className='search-item'
              onClick={ () => handleClick(item.crid, item.url) }>
              <div className='item-type'>CR</div>
              <div className='item-id'>{ item.crid }</div>
            </Link>
          );
        })
      }
    </div>
  );
};

CRSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.array
};

CRSearchResult.defaultProps = {
  items: []
};

export default CRSearchResult;
