import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import ItemPinButton from 'components/common/item-pin-button';
import style from './search-item.sass';
import * as tracking from 'utils/tracking';
import { isPinButtonIntroductionVisited, setPinButtonIntroductionVisited } from 'utils/pinboard';
import { PINBOARD_INTRODUCTION_DELAY } from 'constants';


export default class SearchItem extends Component {
  state = {
    displayIntroduction: false,
  };

  componentDidMount() {
    if (this.shouldShowIntroduction()) {
      this.displayIntroductionTimeout = setTimeout (() => {
        this.setState({ displayIntroduction: true });
        this.displayIntroductionTimeout = null;
      }, PINBOARD_INTRODUCTION_DELAY);
    }
  }

  componentWillUnmount() {
    this.displayIntroductionTimeout && clearTimeout(this.displayIntroductionTimeout);
  }

  handleClick = (e) => {
    const { id, type, recentItemData, saveToRecent, query, itemRank } = this.props;
    const { displayIntroduction } = this.state;

    if (this.shouldShowIntroduction() && displayIntroduction) {
      const { target } = e;
      if (!target.closest('.pin-button-introduction')) {
        e.preventDefault();
        setPinButtonIntroductionVisited();
        this.forceUpdate();
      }
    }

    tracking.trackSearchFocusedItem(type, query, id, itemRank);
    saveToRecent({
      type: type,
      id: id,
      data: recentItemData,
    });
  };

  shouldShowIntroduction() {
    const { showIntroduction } = this.props;
    return showIntroduction && !isPinButtonIntroductionVisited();
  }

  render() {
    const {
      url, hasPinButton, addOrRemoveItemInPinboard,
      id, isPinned, type, className, children, extraInfo,
    } = this.props;
    const { displayIntroduction } = this.state;
    const showIntroduction = this.shouldShowIntroduction() && displayIntroduction;

    return (
      <Link
        to={ url }
        className={ cx(style.wrapper, className) }
        onClick={ this.handleClick }>
        {
          hasPinButton &&
          <ItemPinButton
            addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
            showIntroduction={ showIntroduction }
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
        { showIntroduction &&
          <div className='pin-button-introduction'>Tap this button to add to your pinboard</div> }
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
  showIntroduction: PropTypes.bool,
};

SearchItem.defaultProps = {
  className: '',
  saveToRecent: () => {},
};
