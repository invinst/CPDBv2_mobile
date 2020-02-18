import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import ItemPinButton from 'components/common/item-pin-button';
import style from './search-item.sass';
import * as tracking from 'utils/tracking';


export default class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, type, recentItemData, saveToRecent, query, itemRank } = this.props;
    tracking.trackSearchFocusedItem(type, query, id, itemRank);
    saveToRecent({
      type: type,
      id: id,
      data: recentItemData,
    });
  }

  render() {
    const {
      url, hasPinButton, addOrRemoveItemInPinboard,
      id, isPinned, type, className, children, extraInfo,
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
            item={ {
              type: type,
              id: id,
              isPinned: isPinned,
              ...extraInfo,
            } }
            className='item-pin-button'
          />
        }
        { children }
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
  query: PropTypes.string,
  itemRank: PropTypes.number,
  extraInfo: PropTypes.object,
};

SearchItem.defaultProps = {
  className: '',
  saveToRecent: () => {},
};
