import React, { Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import constants from 'constants';
import style from './search-bar.sass';


export default class SearchBar extends Component {
  render() {
    return (
      <Link
        to={ constants.SEARCH_PATH }
        className={ cx(style.wrapper, 'test--search-bar') }>
        <div className='search-icon' />
        <div className='search-term'>
          Search
        </div>
      </Link>
    );
  }
}
