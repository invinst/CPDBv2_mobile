import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import style from './item-pin-button.sass';


export default class ItemPinButton extends Component {
  handlePinboardButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { addItemToPinboard, type, id, isPinned } = this.props;

    addItemToPinboard({
      type: type,
      id: id,
      isPinned: isPinned,
    });
  }

  render() {
    const { isPinned } = this.props;

    return (
      <span
        onClick={ this.handlePinboardButtonClick.bind(this) }
        className={ cx(style.wrapper, 'item-pin-btn', { 'is-pinned': isPinned }) }
      />
    );
  }
}

ItemPinButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  isPinned: PropTypes.bool,
  addItemToPinboard: PropTypes.func,
};

ItemPinButton.defaultProps = {
  isPinned: false,
};
