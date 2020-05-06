import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { SEARCH_PATH } from 'constants/paths';
import PinboardsContainer from 'containers/pinboard-page/pinboards-container';
import style from './search-bar.sass';


class SearchBar extends Component {
  handleHideShowPinboardsList = () => {
    const { isShownPinboardsList, hideShowPinboardsList } = this.props;
    hideShowPinboardsList(!isShownPinboardsList);
  };

  render() {
    const { isShownPinboardsList } = this.props;
    return (
      <div className={ style.wrapper }>
        <Link
          to={ SEARCH_PATH }
          className='search-box'>
          <div className='search-icon' />
          <div className='search-term'>
            Search
          </div>
        </Link>
        <div
          className={ cx('pinboards-list-btn', { 'display-pinboards-list': isShownPinboardsList }) }
          onClick={ this.handleHideShowPinboardsList }
        />
        { isShownPinboardsList && <PinboardsContainer /> }
        <div className='clearfix'/>
      </div>
    );
  }
}

SearchBar.propTypes = {
  hideShowPinboardsList: PropTypes.func,
  isShownPinboardsList: PropTypes.bool,
};

export default SearchBar;
