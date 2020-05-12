import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isEmpty, noop } from 'lodash';

import browserHistory from 'utils/history';
import { PINBOARD_PATH } from 'constants/paths';
import style from './pinboard-bar.sass';


export default class PinboardBar extends Component {
  handleClick = () => {
    const { pinboard, onEmptyPinboardButtonClick } = this.props;

    if (isEmpty(pinboard.id)) {
      if (pinboard.hasPendingChanges) {
        browserHistory.push(PINBOARD_PATH);
      } else {
        onEmptyPinboardButtonClick();
      }
    } else {
      browserHistory.push(pinboard.url);
    }
  };

  render() {
    const { pinboard } = this.props;
    const isEmptyPinboard = pinboard.itemsCount === 0;
    // Display 1 in case current pinboard is empty to slide up and slide down pinboard bar
    const pinboardBarText = `Pinboard (${isEmptyPinboard ? 1 : pinboard.itemsCount})`;

    if (!pinboard.isPinboardRestored) {
      return null;
    }

    return (
      <span
        className={ cx('pinboard-feature', 'test--pinboard-bar', style.pinboardBar, { 'slide-in': !isEmptyPinboard }) }
        onClick={ this.handleClick }
      >
        { pinboardBarText }
        <span className='pinboard-bar-indicator' />
      </span>
    );
  }
}

PinboardBar.propTypes = {
  pinboard: PropTypes.object,
  onEmptyPinboardButtonClick: PropTypes.func,
};

PinboardBar.defaultProps = {
  pinboard: {
    itemsCount: 0,
    url: 0,
    isPinboardRestored: true,
    hasPendingChanges: false,
  },
  onEmptyPinboardButtonClick: noop,
};
