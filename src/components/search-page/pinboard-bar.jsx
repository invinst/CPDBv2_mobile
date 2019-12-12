import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';
import { isEmpty, noop } from 'lodash';


import style from './pinboard-bar.sass';


export default class PinboardBar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { pinboard, onEmptyPinboardButtonClick } = this.props;

    if (isEmpty(pinboard.id)) {
      if (pinboard.hasPendingChanges) {
        browserHistory.push('/pinboard/');
      } else {
        onEmptyPinboardButtonClick();
      }
    } else {
      browserHistory.push(pinboard.url);
    }
  }

  render() {
    const { pinboard } = this.props;

    if (!pinboard.isPinboardRestored) {
      return null;
    }

    const text = pinboard.itemsCount === 0 ? 'Your pinboard is empty' : `Pinboard (${pinboard.itemsCount})`;

    return (
      <span className={ cx('test--pinboard-bar', style.pinboardBar) } onClick={ this.handleClick }>
        { text }
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
