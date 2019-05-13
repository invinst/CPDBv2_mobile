import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import style from './item-unpin-button.sass';


export default class ItemUnpinButton extends Component {
  handleUnpinButtonClick() {
    const { removeItemInPinboardPage, onClick } = this.props;
    const { type, id } = this.props.item;

    onClick();

    removeItemInPinboardPage({
      type: type,
      id: id,
    });
  }

  render() {
    return (
      <span
        className={ cx(style.wrapper, 'test--item-unpin-button') }
        onClick={ this.handleUnpinButtonClick.bind(this) } />
    );
  }
}

ItemUnpinButton.propTypes = {
  item: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
  onClick: PropTypes.func,
};

ItemUnpinButton.defaultProps = {
  onClick: () => {},
  removeItemInPinboardPage: () => {},
};
