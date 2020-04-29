import React, { Component } from 'react';
import { noop } from 'lodash';
import cx from 'classnames';
import PropTypes from 'prop-types';

import browserHistory from 'utils/history';
import styles from './pinboard-button.sass';
import { PINBOARD_INTRODUCTION_DELAY } from 'constants';


export default class PinboardButton extends Component {
  state = { displayIntroduction: false };

  componentDidMount() {
    if (!this.props.isPinboardButtonIntroductionVisited) {
      this.displayIntroductionTimeout = setTimeout(() => {
        this.setState({ displayIntroduction: true });
      }, PINBOARD_INTRODUCTION_DELAY);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.displayIntroductionTimeout);
  }

  onClick = (e) => {
    e && e.stopPropagation();
    this.props.visitPinboardButtonIntroduction();
    browserHistory.push('/pinboard/');
  };

  onDismissClick = () => {
    this.props.visitPinboardButtonIntroduction();
  };

  render() {
    const { displayIntroduction } = this.state;
    const { isPinboardButtonIntroductionVisited } = this.props;
    const showIntroduction = !isPinboardButtonIntroductionVisited && displayIntroduction;
    return (
      <div className={ cx(styles.pinboardButton, 'pinboard-feature' ) }>
        <div
          className={ cx('header-link', { 'show-introduction': showIntroduction } ) }
          onClick={ this.onClick }
        >
          Pinboards
        </div>
        {
          showIntroduction && <div className='pinboard-button-introduction'>
            <div className='pinboard-button-introduction-title'>Introducing Pinboards</div>
            <div className='pinboard-button-introduction-content'>
              Create and share collections of officers, complaint records,
              and tactical response reports using CPDP Pinboards
            </div>
            <div className='pinboard-button-introduction-btns'>
              <a className='try-it-btn' onClick={ this.onClick }>Try it</a>
              <a className='dismiss-btn' onClick={ this.onDismissClick }>Dismiss</a>
            </div>
          </div>
        }
      </div>
    );
  }
}

PinboardButton.propTypes = {
  isPinboardButtonIntroductionVisited: PropTypes.bool,
  visitPinboardButtonIntroduction: PropTypes.func,
};

PinboardButton.defaultTypes = {
  isPinboardButtonIntroductionVisited: false,
  visitPinboardButtonIntroduction: noop,
};
