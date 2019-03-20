import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import style from './pinboard-bar.sass';


export default class PinboardBar extends Component {
  render() {
    const { pinboard } = this.props;
    if (pinboard.itemsCount === 0) {
      return (
        <span className={ cx('test--pinboard-bar', style.pinboardBar) }>
          Your pinboard is empty
          <span className='pinboard-bar-indicator' />
        </span>
      );
    }
    return (
      <Link
        className={ cx('test--pinboard-bar', style.pinboardBar) }
        to={ pinboard.url }>
        { `Pinboard (${pinboard.itemsCount})` }
        <span className='pinboard-bar-indicator' />
      </Link>
    );
  }
}

PinboardBar.propTypes = {
  pinboard: PropTypes.object,
};

PinboardBar.defaultProps = {
  pinboard: {},
};
