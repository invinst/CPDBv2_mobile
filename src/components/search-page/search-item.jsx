import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import ItemPinButton from './item-pin-button';
import style from './search-item.sass';


export default class SearchItem extends Component {
  render() {
    const {
      url, onClick, hasPinButton, addItemToPinboard,
      id, isPinned, type, className,
    } = this.props;

    return (
      <Link
        to={ url }
        className={ cx(style.wrapper, { [className]: className !== '' }) }
        onClick={ onClick }>

        {
          hasPinButton &&
          <ItemPinButton
            addItemToPinboard={ addItemToPinboard }
            id={ id }
            isPinned={ isPinned }
            type={ type }
          />
        }

        { this.props.children }

        <span className='item-indicator' />
      </Link>
    );
  }
}

SearchItem.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func,
  hasPinButton: PropTypes.bool,
  addItemToPinboard: PropTypes.func,
  id: PropTypes.string,
  isPinned: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.node,
};

SearchItem.defaultProps = {
  className: '',
};
