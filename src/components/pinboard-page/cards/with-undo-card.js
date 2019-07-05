import React, { Component, PropTypes } from 'react';

import { get, noop } from 'lodash';
import cx from 'classnames';

import constants from 'constants';
import styles from './with-undo-card.sass';

const UNDO_CARD_THEMES = constants.PINBOARD_PAGE.UNDO_CARD_THEMES;
const UNDO_CARD_VISIBLE_TIME = constants.PINBOARD_PAGE.UNDO_CARD_VISIBLE_TIME;


export default function withUndoCard(
  WrappedComponent,
  getText,
  actionName,
  settings={
    theme: UNDO_CARD_THEMES.LIGHT,
    keepVisible: false,
    hasWrapper: false,
  }) {
  const DISPLAY = 'DISPLAY';
  const REMOVING = 'REMOVING';
  const REMOVED = 'REMOVED';

  class _Base extends Component {
    constructor(props) {
      super(props);

      this.state = {
        status: DISPLAY
      };

      this.removeItem = this.removeItem.bind(this);
      this.undo = this.undo.bind(this);
      this.countdown = undefined;
    }

    componentWillUnmount() {
      clearTimeout(this.countdown);
    }

    removeItem(item) {
      this.setState({
        status: REMOVING
      });

      this.countdown = setTimeout(() => {
        this.setState({
          status: REMOVED
        });

        get(this.props, actionName, noop)(item);
      }, UNDO_CARD_VISIBLE_TIME);
    }

    undo() {
      clearTimeout(this.countdown);

      this.setState({
        status: DISPLAY
      });
    }

    render() {
      const { status } = this.state;
      const { theme, keepVisible, hasWrapper } = settings;

      if (status === REMOVED && !keepVisible) {
        return null;
      }

      if (status === REMOVING) {
        const wrapperStyle = cx(
          { [styles.undoCardLight]: theme === UNDO_CARD_THEMES.LIGHT },
          { [styles.undoCardDark]: theme === UNDO_CARD_THEMES.DARK },
          { [styles.wrapper]: hasWrapper }
        );

        return (
          <div className={ wrapperStyle }>
            <span className='undo-card-text'>{ getText(this.props) }</span>
            <button className='undo-button' onClick={ this.undo }>Undo</button>
          </div>
        );
      }

      return <WrappedComponent { ...this.props } { ...{ [actionName]: this.removeItem } }/>;
    }
  }

  _Base.propTypes = {
    removeItemInPinboardPage: PropTypes.func,
  };

  _Base.defaultProps = {
    removeItemInPinboardPage: noop
  };

  return _Base;
}
