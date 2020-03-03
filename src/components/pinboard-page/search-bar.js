import React from 'react';
import { Link } from 'react-router-dom';

import { SEARCH_PATH } from 'constants/paths';
import style from './search-bar.sass';


export default function SearchBar(props) {
  return (
    <Link
      to={ SEARCH_PATH }
      className={ style.wrapper }>
      <div className='search-icon' />
      <div className='search-term'>
        Search
      </div>
    </Link>
  );
}
