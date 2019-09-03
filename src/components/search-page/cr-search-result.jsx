import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import style from './cr-search-result.sass';


const CRSearchResult = ({ items, saveToRecent, categoryFilter }) => {
  const handleClick = (name, url) => saveToRecent({
    type: categoryFilter,
    title: name,
    url: url,
  });

  return (
    <div className={ style.crSearchResult }>
      {
        items.map((item) => {
          return (
            <Link
              key={ item.crid }
              to={ item.url }
              className='cr-search-item'
              onClick={ () => handleClick(item.crid, item.url) }>
              <div className='item-id'>CRID { item.crid } • { item.incidentDate }</div>
              <div className='item-type'>{ item.category }</div>
            </Link>
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
};

CRSearchResult.defaultProps = {
  items: [],
};

export default CRSearchResult;
