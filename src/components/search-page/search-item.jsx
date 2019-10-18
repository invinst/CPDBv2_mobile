import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import ItemPinButton from './item-pin-button';
import style from './search-item.sass';


export default class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, type, recentItemData, saveToRecent } = this.props;
    saveToRecent({
      type: type,
      id: id,
      data: recentItemData,
    });
  }

  render() {
    const {
      url, hasPinButton, addOrRemoveItemInPinboard,
      id, isPinned, type, className,
    } = this.props;

    return (
      <Link
        to={ url }
        className={ cx(style.wrapper, { [className]: className !== '' }) }
        onClick={ this.handleClick }>

        {
          hasPinButton &&
          <ItemPinButton
            addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
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
  hasPinButton: PropTypes.bool,
  addOrRemoveItemInPinboard: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isPinned: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.node,
  saveToRecent: PropTypes.func,
  recentItemData: PropTypes.object,
};

SearchItem.defaultProps = {
  className: '',
  saveToRecent: () => {},
};
