import React, { Component } from 'react';
import { Link } from 'react-router';

import constants from 'constants';
import style from './search-bar.sass';


export default class SearchBar extends Component {
  render() {
    return (
      <Link
        to={ constants.SEARCH_PATH }
        className={ style.wrapper }>
        <div className='search-icon' />
        <div className='search-term'>
          Search
        </div>
      </Link>
    );
  }
}
