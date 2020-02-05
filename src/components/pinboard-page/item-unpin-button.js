import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import style from './item-unpin-button.sass';


export default function ItemUnpinButton(props) {
  return (
    <span
      className={ cx(style.wrapper, 'test--item-unpin-button') }
      onClick={ props.onClick } />
  );
}

ItemUnpinButton.propTypes = {
  onClick: PropTypes.func,
};

ItemUnpinButton.defaultProps = {
  onClick: () => {},
};
