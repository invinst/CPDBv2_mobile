import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { every, isEmpty } from 'lodash';

import withPinnable from 'components/common/with-pinnable';
import styles from 'components/common/item-pin-button.sass';
import { isPinButtonIntroductionVisited, setPinButtonIntroductionVisited } from 'utils/pinboard';
import { PINBOARD_INTRODUCTION_DELAY } from 'constants';


class ItemPinButton extends Component {
  state = {
    displayIntroduction: false,
  };

  componentDidMount() {
    if (this.shouldShowIntroduction()) {
      this.displayIntroductionTimeout = setTimeout (() => {
        this.addEventClickOutside();
        this.setState({ displayIntroduction: true });
        this.displayIntroductionTimeout = null;
      }, PINBOARD_INTRODUCTION_DELAY);
    }
  }

  componentWillUnmount() {
    if (this.shouldShowIntroduction()) {
      this.removeEventClickOutside();
    }
    this.displayIntroductionTimeout && clearTimeout(this.displayIntroductionTimeout);
  }

  handleClickOutside = ({ target }) => {
    if (target.closest('.category-details-container') && !target.closest('.pin-button-introduction')) {
      setPinButtonIntroductionVisited();
      this.forceUpdate();
      this.removeEventClickOutside();
    }
  };

  shouldShowIntroduction() {
    const { showIntroduction } = this.props;

    return showIntroduction && !isPinButtonIntroductionVisited();
  }

  addEventClickOutside() {
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  removeEventClickOutside() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }


  render() {
    const { className, item, items } = this.props;
    const { displayIntroduction } = this.state;
    const isPinned = every(isEmpty(items) ? [item] : items, item => item.isPinned);
    const shouldShowIntroduction = this.shouldShowIntroduction() && displayIntroduction;

    return (
      <div className={ cx(
        'pinboard-feature',
        styles.itemPinButton,
        { 'is-pinned': isPinned, 'show-introduction': shouldShowIntroduction },
        className
      ) }>
        {
          shouldShowIntroduction &&
            <div className='pin-button-introduction'>Tap this button to add to your pinboard</div>
        }
      </div>
    );
  }

}

ItemPinButton.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPinned: PropTypes.bool,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPinned: PropTypes.bool,
  })),
  addOrRemoveItemInPinboard: PropTypes.func,
  className: PropTypes.string,
  showHint: PropTypes.bool,
  showIntroduction: PropTypes.bool,
};

ItemPinButton.defaultProps = {
  showHint: true,
  items: [],
};

export default withPinnable(ItemPinButton);
